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
} from "@kenshinx/ui";

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
