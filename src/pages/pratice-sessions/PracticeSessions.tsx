import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Modal,
  SegmentedControl,
  Table,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import {
  getTimeForPracticeSession,
  secondsToApproximateMinutes,
} from "@/core/utils";
import { practiceSessionQueries, usePracticeSessionDelete } from "@/queries";

import { PracticeSessionOwner } from "@/core/practice-session";
import { RemoteData } from "@/components/remote-data/RemoteData";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Page level component which displays a list of saved practice sessions.
 */
export function PracticeSessions() {
  const nav = useNavigate();
  const { auth } = useRouteContext({ from: "__root__" });
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = useState<number>(-1);
  const [sessionFilter, setSessionFilter] =
    useState<PracticeSessionOwner>("all");

  const remoteSessions = useQuery(
    practiceSessionQueries.list({
      currentUserId: auth.kind === "authenticated" ? auth.user.id : "",
      owner: sessionFilter,
    }),
  );
  const deletePracticeSession = usePracticeSessionDelete();

  function handleDeletePracticeSession() {
    deletePracticeSession.mutate(deleteId);
    close();
  }

  return (
    <RemoteData
      {...remoteSessions}
      loadingMessage="Fetching practice sessions"
      render={(sessions, { isFetchingProps }) => (
        <>
          <Modal opened={opened} onClose={close} title="Confirm Delete">
            <Modal.Body>
              <Text>
                Are you sure you want to delete this practice session?
              </Text>
            </Modal.Body>
            <Flex justify="end" gap="xs">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDeletePracticeSession}>
                Delete
              </Button>
            </Flex>
          </Modal>
          <Flex justify="space-between" mb="md">
            <SegmentedControl
              value={sessionFilter}
              data={[
                { label: "All", value: "all" },
                { label: "Mine Only", value: "mine" },
              ]}
              onChange={(x) => setSessionFilter(x as PracticeSessionOwner)}
              color="blue"
            />
            <Button component={Link} to="/practice-sessions/create">
              + Add
            </Button>
          </Flex>
          <Table {...isFetchingProps} striped withRowBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Number of exercises</Table.Th>
                <Table.Th>Duration</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sessions.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    <Center c="gray">No practice sessions found</Center>
                  </Table.Td>
                </Table.Tr>
              )}
              {sessions.map((session) => (
                <Table.Tr key={session.id}>
                  <Table.Td>
                    <Link
                      to="/practice-sessions/$id/play"
                      params={{ id: session.id }}
                    >
                      {session.title}
                    </Link>
                  </Table.Td>
                  <Table.Td>{session.exercises.length}</Table.Td>
                  <Table.Td>
                    ~
                    {secondsToApproximateMinutes(
                      getTimeForPracticeSession(session),
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Flex justify="end" gap="sm">
                      <ActionIcon
                        onClick={() => {
                          nav({
                            to: "/practice-sessions/$id",
                            params: { id: session.id },
                          });
                        }}
                        variant="outline"
                      >
                        <IconEdit />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => {
                          setDeleteId(session.id);
                          open();
                        }}
                        variant="outline"
                        color="red"
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    />
  );
}
