import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Modal,
  Table,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { deleteTrainingSession, fetchTrainingSessions } from "@/core/api";
import { useEffect, useState } from "react";

import { TrainingSession } from "@/core/training-session";
import { useDisclosure } from "@mantine/hooks";

export function TrainingSessions() {
  const nav = useNavigate();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    setSessions(fetchTrainingSessions());
  }, []);

  function handleItemDelete(id: string) {
    setSessions(deleteTrainingSession(id));
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm Delete">
        <Modal.Body>
          <Text>Are you sure you want to delete this training session?</Text>
        </Modal.Body>
        <Flex justify="end" gap="xs">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleItemDelete(deleteId)}>
            Delete
          </Button>
        </Flex>
      </Modal>
      <Flex justify="end">
        <Button component={Link} to="/training-sessions/create">
          + Add
        </Button>
      </Flex>
      <Table striped withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Number of exercises</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sessions.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Center c="gray">No training sessions found</Center>
              </Table.Td>
            </Table.Tr>
          )}
          {sessions.map((session) => (
            <Table.Tr key={session.id}>
              <Table.Td>
                <Link
                  to="/training-sessions/$id/play"
                  params={{ id: session.id }}
                >
                  {session.title}
                </Link>
              </Table.Td>
              <Table.Td>{session.exercises.length}</Table.Td>
              <Table.Td>
                <Flex justify="end" gap="sm">
                  <ActionIcon
                    onClick={() => {
                      nav({
                        to: "/training-sessions/$id",
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
  );
}
