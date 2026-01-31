import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Switch,
  Checkbox,
  Textarea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Toaster,
  toast,
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@kenshinx/ui";
import {
  AlertCircle,
  Terminal,
  Info,
  CheckCircle2,
  User,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  HelpCircle,
} from "lucide-react";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(() => {
    // Check for saved preference or system preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background p-8 transition-colors">
      {/* Toaster for toast notifications */}
      <Toaster />
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              @kenshinx/ui Playground
            </h1>
            <p className="text-muted-foreground">
              Testing all core components from the library.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="theme-toggle" className="text-sm">
              {isDark ? "Dark" : "Light"}
            </Label>
            <Switch
              id="theme-toggle"
              checked={isDark}
              onCheckedChange={setIsDark}
            />
          </div>
        </div>

        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
            <CardDescription>
              All button variants and sizes available in @kenshinx/ui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Input & Label */}
        <Card>
          <CardHeader>
            <CardTitle>Input & Label Components</CardTitle>
            <CardDescription>Form input with accessible labels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter password" />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Can't type here" />
            </div>
          </CardContent>
        </Card>

        {/* Switch Component */}
        <Card>
          <CardHeader>
            <CardTitle>Switch Component</CardTitle>
            <CardDescription>
              Toggle switch for boolean settings, built on Radix UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="disabled-switch" disabled />
              <Label htmlFor="disabled-switch">Disabled Switch</Label>
            </div>
          </CardContent>
        </Card>

        {/* Checkbox Component */}
        <Card>
          <CardHeader>
            <CardTitle>Checkbox Component</CardTitle>
            <CardDescription>
              Checkbox for toggling options, built on Radix UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" defaultChecked />
              <Label htmlFor="marketing">Receive marketing emails</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checkbox" disabled />
              <Label htmlFor="disabled-checkbox">Disabled checkbox</Label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms2" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms2">Accept terms and conditions</Label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Textarea Component */}
        <Card>
          <CardHeader>
            <CardTitle>Textarea Component</CardTitle>
            <CardDescription>
              Multi-line text input for longer content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea placeholder="Type your message here..." id="message" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                placeholder="Tell us about yourself"
                id="bio"
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Your bio will be displayed on your profile.
              </p>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="disabled-textarea">Disabled</Label>
              <Textarea
                id="disabled-textarea"
                disabled
                placeholder="This textarea is disabled"
              />
            </div>
          </CardContent>
        </Card>

        {/* Select Component */}
        <Card>
          <CardHeader>
            <CardTitle>Select Component</CardTitle>
            <CardDescription>
              Dropdown select menu built on Radix UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="fruit">Favorite Fruit</Label>
              <Select>
                <SelectTrigger id="fruit">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                  <SelectItem value="mango">Mango</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">Eastern (EST)</SelectItem>
                    <SelectItem value="cst">Central (CST)</SelectItem>
                    <SelectItem value="pst">Pacific (PST)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Europe</SelectLabel>
                    <SelectItem value="gmt">GMT</SelectItem>
                    <SelectItem value="cet">Central European (CET)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="disabled-select">Disabled Select</Label>
              <Select disabled>
                <SelectTrigger id="disabled-select">
                  <SelectValue placeholder="Can't select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option">Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog Component</CardTitle>
            <CardDescription>
              Modal dialog with overlay, accessible and animated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Card Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>
              A versatile card with header, content, and footer sections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cards can contain any content and are great for grouping related
              information. They include proper borders, shadows, and rounded
              corners using the theme's radius token.
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost">Learn More</Button>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>

        {/* Toast Component */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Component</CardTitle>
            <CardDescription>
              Beautiful toast notifications built on Sonner.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => toast("Event has been created")}>
                Default
              </Button>
              <Button onClick={() => toast.success("Success!")}>Success</Button>
              <Button
                variant="destructive"
                onClick={() => toast.error("Something went wrong")}
              >
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning("Please review")}
              >
                Warning
              </Button>
              <Button
                variant="secondary"
                onClick={() => toast.info("New update available")}
              >
                Info
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  toast("Event created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                  })
                }
              >
                With Description
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast("Event created", {
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })
                }
              >
                With Action
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Component */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Component</CardTitle>
            <CardDescription>
              Displays a callout for user attention with various styles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational message to guide the user.
              </AlertDescription>
            </Alert>
            <Alert className="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Badge Component */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Component</CardTitle>
            <CardDescription>
              Status indicators, notification counts, and labels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500">
                Active
              </Badge>
              <Badge variant="secondary">Idle</Badge>
              <Badge variant="destructive">Offline</Badge>
            </div>
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
              <span className="text-sm text-muted-foreground">
                Notification badge on icon
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Menu Component */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu Component</CardTitle>
            <CardDescription>
              A dropdown menu for displaying actions and options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Component */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
            <CardDescription>
              Organize content into separate tabbed sections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-4 space-y-2">
                <h4 className="font-medium">Account Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Make changes to your account here.
                </p>
              </TabsContent>
              <TabsContent value="password" className="mt-4 space-y-2">
                <h4 className="font-medium">Password Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Change your password here.
                </p>
              </TabsContent>
              <TabsContent value="settings" className="mt-4 space-y-2">
                <h4 className="font-medium">General Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure your general preferences.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tooltip Component */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
            <CardDescription>
              Display additional information on hover.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TooltipProvider>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Need assistance? Click for help.</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>More information</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Popover Component */}
        <Card>
          <CardHeader>
            <CardTitle>Popover Component</CardTitle>
            <CardDescription>
              Display rich content in a floating panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="popover-width">Width</Label>
                        <Input
                          id="popover-width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="popover-height">Height</Label>
                        <Input
                          id="popover-height"
                          defaultValue="auto"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Sheet Component */}
        <Card>
          <CardHeader>
            <CardTitle>Sheet Component</CardTitle>
            <CardDescription>
              Slide-out panels for side navigation and forms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Right</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="sheet-name"
                        defaultValue="John Doe"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="sheet-email"
                        defaultValue="john@example.com"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Menu className="mr-2 h-4 w-4" />
                    Menu (Left)
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Browse through the menu.</SheetDescription>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start">
                      Home
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Projects
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Settings
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        {/* Avatar Component */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar Component</CardTitle>
            <CardDescription>
              Profile images with fallback initials for representing users.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AB
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">Different sizes:</p>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex -space-x-4">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="text-xs">+5</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Component */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Component</CardTitle>
            <CardDescription>
              Loading placeholders to improve perceived performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Text skeleton:</p>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Avatar skeleton:</p>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Card skeleton:</p>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Component */}
        <Card>
          <CardHeader>
            <CardTitle>Table Component</CardTitle>
            <CardDescription>
              Responsive table for displaying tabular data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>
                    <Badge>Paid</Badge>
                  </TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell>
                    <Badge variant="destructive">Unpaid</Badge>
                  </TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        {/* Theme Override Demo */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Theme Customization</CardTitle>
            <CardDescription>
              Override CSS variables in your app to customize the theme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm">
              <code>{`:root {
  --primary: 220 90% 56%;
  --radius: 0.75rem;
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
