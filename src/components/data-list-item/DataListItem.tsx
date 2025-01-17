import "./DataListItem.css";

import { ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { ReactNode } from "react";

export type DataListItemProps = {
  symbol: ReactNode;
  title: ReactNode;
  description: ReactNode;
  onEdit: () => void;
  onRemove: () => void;
};

export function DataListItem({
  symbol,
  title,
  description,
  onEdit,
  onRemove,
}: DataListItemProps) {
  return (
    <div className="data-list-item">
      <Text className="data-list-item-symbol">{symbol}</Text>
      <div>
        <Text>{title}</Text>
        <Text c="dimmed" size="sm">
          {description}
        </Text>
      </div>
      <div className="data-list-item-actions">
        <ActionIcon onClick={onEdit} variant="outline">
          <IconEdit />
        </ActionIcon>
        <ActionIcon onClick={onRemove} variant="outline" color="red">
          <IconTrash />
        </ActionIcon>
      </div>
    </div>
  );
}
