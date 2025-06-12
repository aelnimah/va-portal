// This component is now deprecated as we use the Sidebar component instead
// Keeping it for reference or potential mobile header usage

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceType } from "@/types";

export const Header = () => {
  const [activeService, setActiveService] =
    useState<ServiceType>("visiting-angels");

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm md:hidden">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-blue-50">
              <Heart className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-lg font-bold text-slate-800">
              Visiting Angels
            </h1>
          </div>

          {/* Service Toggle - Mobile */}
          <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
            <Button
              variant={
                activeService === "visiting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("visiting-angels")}
              className={cn(
                activeService === "visiting-angels" && "bg-blue-600 text-white",
              )}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant={
                activeService === "babysitting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("babysitting-angels")}
              className={cn(
                activeService === "babysitting-angels" &&
                  "bg-pink-600 text-white",
              )}
            >
              <Baby className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
