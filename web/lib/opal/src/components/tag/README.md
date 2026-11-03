# Tag

**Import:** `import { Tag, type TagProps } from "@opal/components";`

A small coloured label for status, category or metadata: an icon and a title in a tinted pill, drawn by a `Content` (`secondary` preset, `body` variant, so the title is `secondary-body`). With `onClick` it is a button named by its `tooltip`, and with `aria-pressed` a filter toggle that rings itself in its colour while pressed.

For a gray, removable or chip-field pill, use [`Chip`](../chip/README.md). For a hover tooltip on a static tag, wrap it in `Tooltip`. `Tag` takes no DOM attributes, but its ref and the props a wrapping `Tooltip` or popover trigger injects still reach its root. On a clickable tag the ref is the pill inside the button. Clickable tags come in sizes `sm`, `20` and `24`, whose focus ring follows the corners.

| Variant   | Background        | Icon             | Label            | Use                                     |
| --------- | ----------------- | ---------------- | ---------------- | --------------------------------------- |
| `default` | the color's `-01` | the color's text | the color's text | Category and metadata labels            |
| `status`  | the color's `-01` | the color's text | `text-04`        | Status pills (Indexing, Paused, Failed) |
| `count`   | none              | the color's text | `text-04`        | Warning and failure counts in rows      |

## Props

| Prop           | Type                               | Default        | Description                      |
| -------------- | ---------------------------------- | -------------- | -------------------------------- |
| `title`        | `string \| RichStr`                | **(required)** | Tag label text                   |
| `icon`         | `IconFunctionComponent`            | —              | Optional icon before the title   |
| `color`        | `TagColor`                         | `"gray"`       | Color variant                    |
| `variant`      | `"default" \| "status" \| "count"` | `"default"`    | How the color is applied         |
| `size`         | `"sm" \| "md" \| "20" \| "24"`     | `"sm"`         | Size, see the table below        |
| `onClick`      | `() => void`                       | —              | Makes the tag a button           |
| `tooltip`      | `string`                           | —              | With `onClick`: tooltip and name |
| `aria-pressed` | `boolean`                          | —              | With `onClick`: a filter toggle  |

### `TagSize`

| Size | Height | Padding | Radius | Figma   |
| ---- | ------ | ------- | ------ | ------- |
| `sm` | 16px   | 4px     | 4px    | Small   |
| `md` | 22px   | 6px     | 6px    | Regular |
| `20` | 20px   | 2px     | 4px    |         |
| `24` | 24px   | 4px     | 8px    |         |

### `TagColor`

`"green" | "blue" | "purple" | "amber" | "orange" | "red" | "gray" | "white"`

| Color    | Background           | Text                                  |
| -------- | -------------------- | ------------------------------------- |
| `green`  | `theme-green-01`     | `theme-green-05`                      |
| `blue`   | `theme-blue-01`      | `theme-blue-05`                       |
| `purple` | `theme-purple-01`    | `theme-purple-05`                     |
| `amber`  | `theme-amber-01`     | `theme-amber-05`                      |
| `orange` | `status-warning-01`  | `status-warning-05`                   |
| `red`    | `status-error-01`    | `status-error-05`                     |
| `gray`   | `background-tint-02` | `text-03`                             |
| `white`  | `background-tint-00` | `text-04`, for a pill on a tinted row |

## Usage

```tsx
import { Tag, Tooltip } from "@opal/components";
import { SvgAlertTriangle, SvgRefreshCw } from "@opal/icons";

<Tag title="Beta" color="blue" />

<Tag icon={SvgRefreshCw} title="Indexing" color="blue" variant="status" size="md" />

<Tooltip tooltip="3 warnings" side="top">
  <Tag icon={SvgAlertTriangle} title="3" color="orange" variant="count" />
</Tooltip>

<Tag icon={SvgAlertTriangle} title="3" color="orange" variant="count" tooltip="View Errors" onClick={openErrors} />

<Tag icon={SvgXOctagon} title="4" color="red" variant="status" size="24" tooltip="4 failed" aria-pressed={failedOnly} onClick={toggleFailed} />
```
