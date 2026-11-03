import { render, screen, setupUser } from "@tests/setup/test-utils";
import { Tag, type TagSize } from "@opal/components";

describe("Tag", () => {
  it.each(["sm", "md", "20", "24"] as TagSize[])(
    "renders size %s on the root",
    (size) => {
      render(
        <Tag title="Indexing" color="blue" variant="status" size={size} />
      );

      const root = screen.getByText("Indexing").closest(".opal-auxiliary-tag");
      expect(root).toHaveAttribute("data-size", size);
    }
  );

  it("is a button named by its tooltip when it takes a click", async () => {
    const onClick = jest.fn();
    render(
      <Tag
        title="3"
        color="orange"
        variant="count"
        tooltip="View Errors"
        onClick={onClick}
      />
    );

    const button = screen.getByRole("button", { name: "View Errors" });
    expect(button).toHaveTextContent("3");
    expect(button).not.toHaveAttribute("aria-pressed");
    await setupUser().click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([true, false])(
    "toggles as a filter with aria-pressed=%s",
    (pressed) => {
      render(
        <Tag
          title="4"
          color="red"
          variant="status"
          size="24"
          tooltip="4 failed"
          aria-pressed={pressed}
          onClick={jest.fn()}
        />
      );

      const button = screen.getByRole("button", { name: "4 failed" });
      expect(button).toHaveAttribute("aria-pressed", String(pressed));
      const root = button.querySelector(".opal-auxiliary-tag");
      expect(root).toHaveAttribute("data-size", "24");
      expect(root?.hasAttribute("data-pressed")).toBe(pressed);
    }
  );
});
