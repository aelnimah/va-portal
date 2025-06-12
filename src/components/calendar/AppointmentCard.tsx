import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Heart, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

export const AppointmentCard = ({
  appointment,
  onClick,
}: AppointmentCardProps) => {
  const getServiceColor = () => {
    switch (appointment.serviceType) {
      case "visiting-angels":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      case "babysitting-angels":
        return "bg-pink-50 border-pink-200 hover:bg-pink-100";
      default:
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
    }
  };

  const getServiceIcon = () => {
    if (appointment.serviceType === "visiting-angels") {
      return <Heart className="h-4 w-4 text-blue-600" />;
    } else {
      return <Baby className="h-4 w-4 text-pink-600" />;
    }
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        getServiceColor(),
      )}
      onClick={() => onClick(appointment)}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getServiceIcon()}
              <h3 className="font-semibold text-sm text-slate-800">
                {appointment.client.name}
              </h3>
            </div>
            <Badge variant="secondary" className={getStatusColor()}>
              {appointment.status}
            </Badge>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-1 text-sm text-slate-600">
            <Clock className="h-3 w-3" />
            <span>
              {appointment.startTime} - {appointment.endTime}
            </span>
          </div>

          {/* Staff */}
          <div className="flex items-center space-x-1 text-sm text-slate-600">
            <User className="h-3 w-3" />
            <span>
              {appointment.staff.name} ({appointment.staff.role})
            </span>
          </div>

          {/* Services */}
          {appointment.services.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {appointment.services.slice(0, 2).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {appointment.services.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{appointment.services.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
