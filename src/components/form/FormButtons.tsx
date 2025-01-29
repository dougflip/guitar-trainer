import { Button, Flex } from "@mantine/core";

import { ReactNode } from "react";

type FormButtonsProps = {
  submitText?: string;
  children?: ReactNode;
  onCancel: () => void;
};

export function FormButtons({
  submitText = "Save",
  children,
  onCancel,
}: FormButtonsProps) {
  return (
    <Flex mt="lg" columnGap={5}>
      <Button type="button" onClick={onCancel} variant="outline">
        Cancel
      </Button>
      {children}
      <Button type="submit">{submitText}</Button>
    </Flex>
  );
}
