import "./DataListItem.css";

import { Button, Text } from "@mantine/core";

import { ReactNode } from "react";

export type DataListItemProps = {
  symbol: ReactNode;
  title: ReactNode;
  description: ReactNode;
  onRemove: () => void;
};

export function DataListItem({
  symbol,
  title,
  description,
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
        <Button onClick={onRemove} variant="outline">
          Remove
        </Button>
      </div>
    </div>
  );
}
