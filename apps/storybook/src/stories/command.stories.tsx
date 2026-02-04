import type { Meta, StoryObj } from "@storybook/react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button
} from "@kenshinx/ui"
import { cn } from "../../../../packages/ui/src/lib/utils" // Direct import because @kenshinx/ui might not export util perfectly for stories source
import { Check, ChevronsUpDown, Calendar, Smile, Calculator, User, CreditCard, Settings } from "lucide-react"
import * as React from "react"

const meta: Meta<typeof Command> = {
    title: "Components/Command",
    component: Command,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
    render: () => (
        <Command className="rounded-lg border shadow-md w-[400px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                        <Smile className="mr-2 h-4 w-4" />
                        <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Calculator</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    ),
}

export const Combobox: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false)
        const [value, setValue] = React.useState("")

        const frameworks = [
            {
                value: "next.js",
                label: "Next.js",
            },
            {
                value: "sveltekit",
                label: "SvelteKit",
            },
            {
                value: "nuxt.js",
                label: "Nuxt.js",
            },
            {
                value: "remix",
                label: "Remix",
            },
            {
                value: "astro",
                label: "Astro",
            },
        ]

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue: string) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    },
}
