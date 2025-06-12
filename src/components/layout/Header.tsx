import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Baby,
  Calendar,
  Users,
  UserCheck,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceType } from "@/types";

export const Header = () => {
  const [activeService, setActiveService] =
    useState<ServiceType>("visiting-angels");
  const location = useLocation();

  const navigationItems = [
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/staff", label: "Staff Directory", icon: Users },
    { path: "/clients", label: "Client Directory", icon: UserCheck },
    { path: "/notes", label: "Notes", icon: FileText },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-50">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Visiting Angels Inc.
                </h1>
                <p className="text-sm text-slate-600">
                  Healthcare Management Portal
                </p>
              </div>
            </div>
          </div>

          {/* Service Toggle Buttons */}
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <Button
              variant={
                activeService === "visiting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("visiting-angels")}
              className={cn(
                "flex items-center space-x-2",
                activeService === "visiting-angels" && "bg-blue-600 text-white",
              )}
            >
              <Heart className="h-4 w-4" />
              <span>Visiting Angels</span>
            </Button>
            <Button
              variant={
                activeService === "babysitting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("babysitting-angels")}
              className={cn(
                "flex items-center space-x-2",
                activeService === "babysitting-angels" &&
                  "bg-pink-600 text-white",
              )}
            >
              <Baby className="h-4 w-4" />
              <span>Babysitting Angels</span>
            </Button>
            <Button
              variant={activeService === "both" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveService("both")}
              className={cn(
                "flex items-center space-x-2",
                activeService === "both" && "bg-purple-600 text-white",
              )}
            >
              <span>Both</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive && "bg-slate-800 text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
