import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MapPin, Calendar, Heart, Baby, User } from "lucide-react";
import { Client } from "@/types";

interface ClientCardProps {
  client: Client;
  onContact?: (client: Client) => void;
  onSchedule?: (client: Client) => void;
}

export const ClientCard = ({
  client,
  onContact,
  onSchedule,
}: ClientCardProps) => {
  const getServiceIcon = () => {
    if (client.serviceType === "visiting-angels") {
      return <Heart className="h-4 w-4 text-blue-600" />;
    } else {
      return <Baby className="h-4 w-4 text-pink-600" />;
    }
  };

  const getServiceTypeLabel = () => {
    switch (client.serviceType) {
      case "visiting-angels":
        return "Visiting Angels";
      case "babysitting-angels":
        return "Babysitting Angels";
      default:
        return "Visiting Angels";
    }
  };

  const getServiceTypeColor = () => {
    switch (client.serviceType) {
      case "visiting-angels":
        return "bg-blue-100 text-blue-800";
      case "babysitting-angels":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatLastVisit = (date?: Date) => {
    if (!date) return "No visits yet";

    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-slate-100">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-slate-800 truncate">
                {client.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={getServiceTypeColor()}>
                  <div className="flex items-center space-x-1">
                    {getServiceIcon()}
                    <span>{getServiceTypeLabel()}</span>
                  </div>
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Phone className="h-4 w-4" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span className="line-clamp-2">{client.address}</span>
            </div>
          </div>

          {/* Last Visit */}
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>Last visit: {formatLastVisit(client.lastVisit)}</span>
          </div>

          {/* Emergency Contact */}
          {client.emergencyContact && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-slate-700">
                Emergency Contact
              </h4>
              <div className="text-sm text-slate-600">
                <div>
                  {client.emergencyContact.name} (
                  {client.emergencyContact.relationship})
                </div>
                <div>{client.emergencyContact.phone}</div>
              </div>
            </div>
          )}

          {/* Notes */}
          {client.notes && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-slate-700">Notes</h4>
              <p className="text-sm text-slate-600 line-clamp-2">
                {client.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onContact?.(client)}
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSchedule?.(client)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-1" />
              Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
