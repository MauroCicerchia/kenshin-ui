import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@kenshinx/ui"
import * as React from "react"

const meta: Meta<typeof Calendar> = {
    title: "Components/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
    render: () => {
        const [date, setDate] = React.useState<Date | undefined>(new Date())

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
            />
        )
    },
}
