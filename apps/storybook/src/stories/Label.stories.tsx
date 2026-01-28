import type { Meta, StoryObj } from "@storybook/react";
import { Label, Input } from "@kenshin/ui";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An accessible label component built on Radix UI Label primitive.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label text",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="name">Your name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="required">
        Required field <span className="text-destructive">*</span>
      </Label>
      <Input id="required" required />
    </div>
  ),
};
