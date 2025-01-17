import { Button, Flex } from "@mantine/core";

type FormButtonsProps = {
  onCancel: () => void;
};

export function FormButtons({ onCancel }: FormButtonsProps) {
  return (
    <Flex mt="lg" columnGap={5}>
      <Button type="button" onClick={onCancel} variant="outline">
        Cancel
      </Button>
      <Button type="submit">Submit</Button>
    </Flex>
  );
}
