"use client";

import { useTranslations } from "next-intl";
import { Tag, type TagSize } from "@opal/components";
import type { StatusTag } from "@/views/admin/connectors/ConnectorDetailPage/statusTag";

interface StatusTagPillProps {
  tag: StatusTag;
  size?: TagSize;
}

/** A pair's or run's status pill: the state's icon and tint with a text-04 label. */
export default function StatusTagPill({ tag, size }: StatusTagPillProps) {
  const tBadges = useTranslations("admin.status.badges");
  return (
    <Tag
      icon={tag.icon}
      title={tBadges(tag.labelKey)}
      color={tag.color}
      variant="status"
      size={size}
    />
  );
}
