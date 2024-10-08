import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="charos-theme">
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
