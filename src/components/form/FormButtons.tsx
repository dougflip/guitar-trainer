import { Button, Flex } from "@mantine/core";

import { ReactNode } from "react";

type FormButtonsProps = {
  submitText?: string;
  children?: ReactNode;
  onCancel: () => void;
  submitting?: boolean;
  disabled?: boolean;
};

export function FormButtons({
  submitText = "Save",
  children,
  onCancel,
  submitting,
  disabled = submitting,
}: FormButtonsProps) {
  return (
    <Flex mt="lg" columnGap={5}>
      <Button
        type="button"
        onClick={onCancel}
        variant="outline"
        disabled={disabled}
      >
        Cancel
      </Button>
      {children}
      <Button type="submit" loading={submitting} disabled={disabled}>
        {submitText}
      </Button>
    </Flex>
  );
}
