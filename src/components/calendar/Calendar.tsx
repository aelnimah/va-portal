import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Grid3X3,
  List,
} from "lucide-react";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentModal } from "../modals/AppointmentModal";
import { Appointment, CalendarView } from "@/types";

// Mock data - in a real app, this would come from an API
const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientId: "1",
    client: {
      id: "1",
      name: "Margaret Johnson",
      phone: "(555) 123-4567",
      address: "123 Oak Street, Toronto, ON",
      serviceType: "visiting-angels",
    },
    staffId: "1",
    staff: {
      id: "1",
      name: "Sarah Wilson",
      role: "PSW",
      phone: "(555) 987-6543",
      email: "sarah.wilson@visitingangels.com",
      status: "Active",
    },
    date: new Date(),
    startTime: "09:00 AM",
    endTime: "12:00 PM",
    serviceType: "visiting-angels",
    status: "confirmed",
    services: ["Personal Care", "Meal Preparation", "Light Housekeeping"],
  },
  {
    id: "2",
    clientId: "2",
    client: {
      id: "2",
      name: "Thompson Family",
      phone: "(555) 234-5678",
      address: "456 Maple Ave, Toronto, ON",
      serviceType: "babysitting-angels",
    },
    staffId: "2",
    staff: {
      id: "2",
      name: "Emily Chen",
      role: "Babysitter",
      phone: "(555) 876-5432",
      email: "emily.chen@babysittingangels.com",
      status: "Active",
    },
    date: new Date(),
    startTime: "02:00 PM",
    endTime: "06:00 PM",
    serviceType: "babysitting-angels",
    status: "scheduled",
    services: ["Childcare", "Light Meal Prep", "Educational Activities"],
  },
  {
    id: "3",
    clientId: "3",
    client: {
      id: "3",
      name: "Robert Davis",
      phone: "(555) 345-6789",
      address: "789 Pine Street, Toronto, ON",
      serviceType: "visiting-angels",
    },
    staffId: "3",
    staff: {
      id: "3",
      name: "Michael Brown",
      role: "RN",
      phone: "(555) 765-4321",
      email: "michael.brown@visitingangels.com",
      status: "Active",
    },
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    serviceType: "visiting-angels",
    status: "confirmed",
    services: ["Medication Management", "Health Monitoring", "Companionship"],
  },
];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<CalendarView["type"]>("week");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewType === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatCurrentPeriod = () => {
    if (viewType === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter(
      (appointment) => appointment.date.toDateString() === date.toDateString(),
    );
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const getTotalAppointments = () => {
    if (viewType === "week") {
      const weekDays = getWeekDays();
      return mockAppointments.filter((appointment) =>
        weekDays.some(
          (day) => day.toDateString() === appointment.date.toDateString(),
        ),
      ).length;
    } else {
      return mockAppointments.filter(
        (appointment) =>
          appointment.date.getMonth() === currentDate.getMonth() &&
          appointment.date.getFullYear() === currentDate.getFullYear(),
      ).length;
    }
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div key={index} className="space-y-2">
              <div className="text-center">
                <div className="text-sm font-medium text-slate-600">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div
                  className={`text-lg font-semibold ${isToday ? "text-blue-600" : "text-slate-800"}`}
                >
                  {day.getDate()}
                </div>
              </div>
              <div className="space-y-2 min-h-[300px]">
                {dayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={handleAppointmentClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    // Simplified month view - in a real app, this would be more sophisticated
    const monthAppointments = mockAppointments.filter(
      (appointment) =>
        appointment.date.getMonth() === currentDate.getMonth() &&
        appointment.date.getFullYear() === currentDate.getFullYear(),
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onClick={handleAppointmentClick}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-slate-600" />
                <CardTitle className="text-xl">
                  {formatCurrentPeriod()}
                </CardTitle>
              </div>
              <Badge variant="secondary">
                {getTotalAppointments()} appointments
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                <Button
                  variant={viewType === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("week")}
                  className="flex items-center space-x-1"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span>Week</span>
                </Button>
                <Button
                  variant={viewType === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("month")}
                  className="flex items-center space-x-1"
                >
                  <List className="h-4 w-4" />
                  <span>Month</span>
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === "week" ? renderWeekView() : renderMonthView()}
        </CardContent>
      </Card>

      {/* Appointment Modal */}
      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
