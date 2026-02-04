import type { Meta, StoryObj } from "@storybook/react"
import { Combobox } from "@kenshinx/ui"
import { Calendar } from "lucide-react"
import * as React from "react"

const meta: Meta<typeof Combobox> = {
    title: "Components/Combobox",
    component: Combobox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        options: [
            { value: "next.js", label: "Next.js" },
            { value: "sveltekit", label: "SvelteKit" },
            { value: "nuxt.js", label: "Nuxt.js" },
            { value: "remix", label: "Remix" },
            { value: "astro", label: "Astro" },
        ],
        placeholder: "Select framework...",
        emptyText: "No framework found.",
    },
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
    render: (args: React.ComponentProps<typeof Combobox>) => {
        const [value, setValue] = React.useState("")
        return (
            <div className="w-[200px]">
                <Combobox
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
        )
    },
}

export const Preselected: Story = {
    render: (args: React.ComponentProps<typeof Combobox>) => {
        const [value, setValue] = React.useState("next.js")
        return (
            <div className="w-[200px]">
                <Combobox
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
        )
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args: React.ComponentProps<typeof Combobox>) => {
        const [value, setValue] = React.useState("")
        return (
            <div className="w-[200px]">
                <Combobox
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
        )
    },
}

export const WithIcon: Story = {
    render: (args: React.ComponentProps<typeof Combobox>) => {
        const [value, setValue] = React.useState("")
        return (
            <div className="w-[200px]">
                <Combobox
                    {...args}
                    value={value}
                    onValueChange={setValue}
                    icon={<Calendar />}
                />
            </div>
        )
    },
}
