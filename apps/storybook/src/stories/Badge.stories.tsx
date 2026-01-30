import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@kenshinx/ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The variant style of the badge",
    },
    children: {
      control: "text",
      description: "The content of the badge",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Displays a badge or a component that looks like a badge. Useful for status indicators, notification counts, and labels.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#" onClick={(e) => e.preventDefault()}>
        Clickable Badge
      </a>
    </Badge>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Pending
      </Badge>
      <Badge variant="secondary" className="gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Completed
      </Badge>
      <Badge variant="destructive" className="gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Failed
      </Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500 hover:bg-green-500/80">Active</Badge>
        <span className="text-sm text-muted-foreground">User is currently online</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Idle</Badge>
        <span className="text-sm text-muted-foreground">User has been inactive</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="destructive">Offline</Badge>
        <span className="text-sm text-muted-foreground">User is disconnected</span>
      </div>
    </div>
  ),
};

export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <Badge className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center p-0 text-[10px]">
          3
        </Badge>
      </div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center p-0 text-[10px]"
        >
          99+
        </Badge>
      </div>
    </div>
  ),
};
