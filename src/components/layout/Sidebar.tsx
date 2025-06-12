import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  UserCheck,
  FileText,
  MessageSquare,
  Settings,
  Heart,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceType } from "@/types";
import { useState } from "react";

// Mock user data - in a real app, this would come from authentication context
const currentUser = {
  id: "current-user",
  name: "Dr. Sarah Wilson",
  position: "Operations Manager",
  email: "sarah.wilson@visitingangels.com",
  avatar: undefined,
};

export const Sidebar = () => {
  const [activeService, setActiveService] =
    useState<ServiceType>("visiting-angels");
  const location = useLocation();

  const navigationItems = [
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/staff", label: "Staff Directory", icon: Users },
    { path: "/clients", label: "Client Directory", icon: UserCheck },
    { path: "/notes", label: "Notes", icon: FileText },
  ];

  const utilityItems = [
    { path: "/messages", label: "Messages", icon: MessageSquare },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 shadow-sm h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-50">
            <Heart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Visiting Angels Inc.
            </h1>
            <p className="text-xs text-slate-600">Healthcare Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-slate-600 truncate">
              {currentUser.position}
            </p>
          </div>
        </div>
      </div>

      {/* Service Toggle */}
      <div className="p-4 border-b border-slate-200">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
            Service Type
          </p>
          <div className="space-y-1">
            <Button
              variant={
                activeService === "visiting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("visiting-angels")}
              className={cn(
                "w-full justify-start",
                activeService === "visiting-angels" && "bg-blue-600 text-white",
              )}
            >
              <Heart className="h-4 w-4 mr-2" />
              <span>Visiting Angels</span>
            </Button>
            <Button
              variant={
                activeService === "babysitting-angels" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setActiveService("babysitting-angels")}
              className={cn(
                "w-full justify-start",
                activeService === "babysitting-angels" &&
                  "bg-pink-600 text-white",
              )}
            >
              <Baby className="h-4 w-4 mr-2" />
              <span>Babysitting Angels</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide mb-3">
            Navigation
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-slate-800 text-white",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Utility Section */}
      <div className="p-4 border-t border-slate-200">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide mb-3">
            Utilities
          </p>
          {utilityItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-slate-800 text-white",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                  {item.path === "/messages" && (
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-red-100 text-red-800"
                    >
                      3
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
