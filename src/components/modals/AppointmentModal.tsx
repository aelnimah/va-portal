import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  User,
  Phone,
  MapPin,
  Heart,
  Baby,
  Send,
  Check,
  FileText,
} from "lucide-react";
import { Appointment } from "@/types";

interface AppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal = ({
  appointment,
  isOpen,
  onClose,
}: AppointmentModalProps) => {
  const [notes, setNotes] = useState(appointment?.notes || "");

  if (!appointment) return null;

  const getServiceIcon = () => {
    if (appointment.serviceType === "visiting-angels") {
      return <Heart className="h-5 w-5 text-blue-600" />;
    } else if (appointment.serviceType === "babysitting-angels") {
      return <Baby className="h-5 w-5 text-pink-600" />;
    } else {
      return <Heart className="h-5 w-5 text-purple-600" />;
    }
  };

  const getServiceTypeLabel = () => {
    switch (appointment.serviceType) {
      case "visiting-angels":
        return "Visiting Angels";
      case "babysitting-angels":
        return "Babysitting Angels";
      default:
        return "Combined Services";
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSendInvite = () => {
    // Implementation for sending invite to staff
    console.log("Sending invite to:", appointment.staff.name);
  };

  const handleConfirmAppointment = () => {
    // Implementation for confirming appointment
    console.log("Confirming appointment:", appointment.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getServiceIcon()}
            <span>Appointment Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Service Type */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={getStatusColor()}>
              {appointment.status}
            </Badge>
            <Badge variant="outline">{getServiceTypeLabel()}</Badge>
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Schedule</h3>
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="h-4 w-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="text-slate-600 ml-6">
              {appointment.startTime} - {appointment.endTime}
            </div>
          </div>

          <Separator />

          {/* Client Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Client Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-500" />
                <span className="font-medium">{appointment.client.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>{appointment.client.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>{appointment.client.address}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Staff Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Assigned Staff</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-500" />
                <span className="font-medium">{appointment.staff.name}</span>
                <Badge variant="outline">{appointment.staff.role}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>{appointment.staff.phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="flex flex-wrap gap-2">
              {appointment.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div className="space-y-3">
            <Label
              htmlFor="notes"
              className="text-lg font-semibold flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this appointment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleSendInvite}
            className="flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send Invite to Staff</span>
          </Button>
          <Button
            onClick={handleConfirmAppointment}
            className="flex items-center space-x-2"
          >
            <Check className="h-4 w-4" />
            <span>Confirm Appointment</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
