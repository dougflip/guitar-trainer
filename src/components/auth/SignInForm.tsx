import {
  Alert,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { GoogleButton } from "@/components/auth/GoogleButton";
import { IconExclamationCircle } from "@tabler/icons-react";
import { ReactNode } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().nonempty().email({ message: "Please enter a valid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type SignInFormProps = {
  onSubmit: (data: z.infer<typeof schema>) => void;
  onGoogleSignIn: () => void;
  errorMessage?: ReactNode;
  submitting?: boolean;
};

export function SignInForm({
  onSubmit,
  onGoogleSignIn,
  errorMessage,
  submitting,
}: SignInFormProps) {
  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: zodResolver(schema),
  });

  return (
    <Container size={420} my={40}>
      {errorMessage && (
        <Alert
          color="red"
          title="Sign In Error"
          icon={<IconExclamationCircle />}
        >
          {errorMessage}
        </Alert>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text size="lg" fw={500}>
          Welcome to Guitar Trainer, sign in with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={onGoogleSignIn}>
            Google
          </GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="name@domain.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" loading={submitting}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
