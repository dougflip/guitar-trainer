import { Button, Flex } from "@mantine/core";

type FormButtonsProps = {
  submitText?: string;
  onCancel: () => void;
};

export function FormButtons({
  submitText = "Submit",
  onCancel,
}: FormButtonsProps) {
  return (
    <Flex mt="lg" columnGap={5}>
      <Button type="button" onClick={onCancel} variant="outline">
        Cancel
      </Button>
      <Button type="submit">{submitText}</Button>
    </Flex>
  );
}
