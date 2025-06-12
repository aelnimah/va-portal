export type ServiceType = "visiting-angels" | "babysitting-angels";

export type StaffRole = "PSW" | "RN" | "RPN" | "Babysitter";

export type NotePriority = "High" | "Medium" | "Low";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  phone: string;
  email: string;
  status: "Active" | "Inactive" | "On Leave";
  profilePhoto?: string;
  specializations?: string[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  lastVisit?: Date;
  serviceType: ServiceType;
  notes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Appointment {
  id: string;
  clientId: string;
  client: Client;
  staffId: string;
  staff: Staff;
  date: Date;
  startTime: string;
  endTime: string;
  serviceType: ServiceType;
  status: AppointmentStatus;
  notes?: string;
  services: string[];
}

export interface Note {
  id: string;
  content: string;
  priority: NotePriority;
  author: string;
  authorId: string;
  timestamp: Date;
  clientId?: string;
  staffId?: string;
  appointmentId?: string;
}

export interface CalendarView {
  type: "week" | "month";
  currentDate: Date;
}
