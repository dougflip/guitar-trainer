import "./DataListItem.css";

import { ReactNode } from "react";
import { Text } from "@mantine/core";

export type DataListItemProps = {
  symbol: ReactNode;
  title: ReactNode;
  description: ReactNode;
};

export function DataListItem({
  symbol,
  title,
  description,
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
    </div>
  );
}
