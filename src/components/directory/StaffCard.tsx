import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, User } from "lucide-react";
import { Staff } from "@/types";

interface StaffCardProps {
  staff: Staff;
  onContact?: (staff: Staff) => void;
}

export const StaffCard = ({ staff, onContact }: StaffCardProps) => {
  const getStatusColor = () => {
    switch (staff.status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = () => {
    switch (staff.role) {
      case "RN":
        return "bg-blue-100 text-blue-800";
      case "RPN":
        return "bg-indigo-100 text-indigo-800";
      case "PSW":
        return "bg-green-100 text-green-800";
      case "Babysitter":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={staff.profilePhoto} alt={staff.name} />
              <AvatarFallback className="bg-slate-100">
                {getInitials(staff.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-slate-800 truncate">
                {staff.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={getRoleColor()}>
                  {staff.role}
                </Badge>
                <Badge variant="secondary" className={getStatusColor()}>
                  {staff.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Phone className="h-4 w-4" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Mail className="h-4 w-4" />
              <span className="truncate">{staff.email}</span>
            </div>
          </div>

          {/* Specializations */}
          {staff.specializations && staff.specializations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">
                Specializations
              </h4>
              <div className="flex flex-wrap gap-1">
                {staff.specializations.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {staff.specializations.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{staff.specializations.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onContact?.(staff)}
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <User className="h-4 w-4 mr-1" />
              Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
