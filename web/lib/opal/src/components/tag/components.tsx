"use client";

import "@opal/components/tag/styles.css";
import type { IconFunctionComponent, RichStr } from "@opal/types";
import { TAG_COLORS, type TagColor } from "@opal/components/tag/colors";
import { Tooltip } from "@opal/components/tooltip/components";
import { Interactive } from "@opal/core";
import { Content } from "@opal/layouts";
import { cn } from "@opal/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * `"sm"` 16px and `"md"` 22px are Figma Tag Small and Regular. `"20"` and
 * `"24"` (Figma Tag/Status Regular and Large) are named by height because
 * Figma uses "Regular" for two heights.
 */
type TagSize = "sm" | "md" | "20" | "24";

/**
 * - `"default"`: tinted background, icon and label in the color's text.
 * - `"status"`: tinted background, icon in the color's text, `text-04` label.
 * - `"count"`: no background, icon in the color's text, `text-04` label.
 */
type TagVariant = "default" | "status" | "count";

// Takes no DOM attributes. The ref and anything a wrapping Tooltip or
// popover trigger injects at runtime still reach the root, so either can
// wrap a static Tag.
type TagBaseProps = {
  ref?: React.Ref<HTMLDivElement>;

  /** Optional icon component. */
  icon?: IconFunctionComponent;

  /** Tag label text. */
  title: string | RichStr;

  /** Color variant. Default: `"gray"`. */
  color?: TagColor;

  /** How the color is applied. Default: `"default"`. */
  variant?: TagVariant;

  /** Size variant. Default: `"sm"`. */
  size?: TagSize;
};

type TagProps = TagBaseProps & {
  onClick?: never;
  tooltip?: never;
  "aria-pressed"?: never;
};

/** A tag that acts on click, such as a filter pill or a count that opens its details. */
type TagButtonProps = TagBaseProps & {
  onClick: () => void;
  /** The hover tooltip and the button's name, since the title may be only a count. */
  tooltip: string;
  /** Set for a filter toggle, which shows selected while pressed. */
  "aria-pressed"?: boolean;
};

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------

/**
 * A small coloured label: an icon and a title in a tinted pill. With
 * `onClick` it is a button, or with `aria-pressed` a filter toggle. For a
 * gray, removable or field chip, use `Chip`.
 */
function Tag({
  ref,
  icon,
  title,
  color = "gray",
  variant = "default",
  size = "sm",
  onClick,
  tooltip,
  "aria-pressed": pressed,
  ...rest
}: TagProps | TagButtonProps) {
  const config = TAG_COLORS[color];

  // SAFETY: CSSProperties has no index for custom properties; the object
  // holds only the one custom property the stylesheet reads.
  const iconColorStyle = {
    "--opal-tag-icon-color": config.fg,
  } as React.CSSProperties;

  const tag = (
    <div
      ref={ref}
      {...(onClick === undefined ? rest : undefined)}
      className={cn(
        "opal-auxiliary-tag",
        variant !== "count" && config.bg,
        variant === "default" ? config.text : "text-text-04"
      )}
      style={iconColorStyle}
      data-size={size}
      data-pressed={pressed || undefined}
    >
      <Content
        // The body variant sets the title in secondary-body.
        sizePreset="secondary"
        variant="body"
        width="fit"
        color="interactive"
        icon={icon}
        title={title}
      />
    </div>
  );
  if (onClick === undefined) return tag;

  // The focus ring follows the pill's corners.
  const container = (
    <Interactive.Container
      type="button"
      size="fit"
      rounding={size === "24" ? 2 : 1}
    >
      {tag}
    </Interactive.Container>
  );
  return (
    <Tooltip tooltip={tooltip} side="top">
      {pressed === undefined ? (
        <Interactive.Stateless
          {...rest}
          prominence="tertiary"
          aria-label={tooltip}
          onClick={onClick}
        >
          {container}
        </Interactive.Stateless>
      ) : (
        <Interactive.Stateful
          {...rest}
          variant="select-light"
          state={pressed ? "selected" : "empty"}
          aria-label={tooltip}
          aria-pressed={pressed}
          onClick={onClick}
        >
          {container}
        </Interactive.Stateful>
      )}
    </Tooltip>
  );
}

export {
  Tag,
  type TagButtonProps,
  type TagProps,
  type TagSize,
  type TagVariant,
};
export { TAG_COLORS, type TagColor } from "@opal/components/tag/colors";
