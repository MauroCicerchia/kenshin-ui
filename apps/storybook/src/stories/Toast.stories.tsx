import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast, Button } from "@kenshinx/ui";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An opinionated toast component for React built on Sonner. Provides beautiful, accessible toast notifications with various styles.",
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <Button
      onClick={() => toast("Event has been created")}
    >
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      onClick={() => toast.success("Event has been created successfully")}
    >
      Show Success Toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() => toast.error("Something went wrong")}
    >
      Show Error Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.warning("Please review your changes")}
    >
      Show Warning Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() => toast.info("New update available")}
    >
      Show Info Toast
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const WithCancel: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          cancel: {
            label: "Cancel",
            onClick: () => console.log("Cancel clicked"),
          },
        })
      }
    >
      Show Toast with Cancel
    </Button>
  ),
};

export const Promise: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = () =>
          new Promise<{ name: string }>((resolve) =>
            setTimeout(() => resolve({ name: "Sonner" }), 2000)
          );

        toast.promise(promise, {
          loading: "Loading...",
          success: (data) => `${data.name} toast has been added`,
          error: "Error",
        });
      }}
    >
      Show Promise Toast
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Default notification")}>Default</Button>
      <Button onClick={() => toast.success("Success notification")}>
        Success
      </Button>
      <Button onClick={() => toast.error("Error notification")}>Error</Button>
      <Button onClick={() => toast.warning("Warning notification")}>
        Warning
      </Button>
      <Button onClick={() => toast.info("Info notification")}>Info</Button>
    </div>
  ),
};
