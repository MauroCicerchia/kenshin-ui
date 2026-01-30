"use client";

import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

type Theme = "light" | "dark" | "system";

const Toaster = ({ theme: themeProp, ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    // Detect theme from document class if no theme prop provided
    if (!themeProp && typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");

      // Watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? "dark" : "light");
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, [themeProp]);

  return (
    <Sonner
      theme={themeProp || theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          error:
            "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          warning:
            "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          info: "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
        },
      }}
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
export { toast } from "sonner";
