import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ClientCard } from "@/components/directory/ClientCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserPlus, Heart, Baby } from "lucide-react";
import { Client, ServiceType } from "@/types";

// Mock data - in a real app, this would come from an API
const mockClients: Client[] = [
  {
    id: "1",
    name: "Margaret Johnson",
    phone: "(555) 123-4567",
    email: "margaret.johnson@email.com",
    address: "123 Oak Street, Toronto, ON M5A 1B2",
    lastVisit: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    serviceType: "visiting-angels",
    notes:
      "Requires assistance with medication management and light housekeeping.",
    emergencyContact: {
      name: "Robert Johnson",
      phone: "(555) 123-4568",
      relationship: "Son",
    },
  },
  {
    id: "2",
    name: "Thompson Family",
    phone: "(555) 234-5678",
    email: "thompson.family@email.com",
    address: "456 Maple Avenue, Toronto, ON M6B 2C3",
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    serviceType: "babysitting-angels",
    notes: "Two children: Emma (5) and Lucas (8). Emma has a peanut allergy.",
    emergencyContact: {
      name: "Sarah Thompson",
      phone: "(555) 234-5679",
      relationship: "Mother",
    },
  },
  {
    id: "3",
    name: "Robert Davis",
    phone: "(555) 345-6789",
    email: "robert.davis@email.com",
    address: "789 Pine Street, Toronto, ON M7C 3D4",
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    serviceType: "visiting-angels",
    notes: "Post-operative care following hip replacement surgery.",
    emergencyContact: {
      name: "Linda Davis",
      phone: "(555) 345-6790",
      relationship: "Wife",
    },
  },
  {
    id: "4",
    name: "Wilson Family",
    phone: "(555) 456-7890",
    email: "wilson.family@email.com",
    address: "321 Cedar Road, Toronto, ON M8D 4E5",
    serviceType: "babysitting-angels",
    notes: "Newborn care for 3-month-old twins.",
  },
  {
    id: "5",
    name: "Eleanor Martinez",
    phone: "(555) 567-8901",
    email: "eleanor.martinez@email.com",
    address: "654 Birch Lane, Toronto, ON M9E 5F6",
    lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    serviceType: "visiting-angels",
    notes:
      "Grandmother who sometimes needs assistance with daily activities when grandchildren visit.",
    emergencyContact: {
      name: "Maria Martinez",
      phone: "(555) 567-8902",
      relationship: "Daughter",
    },
  },
  {
    id: "6",
    name: "George Anderson",
    phone: "(555) 678-9012",
    email: "george.anderson@email.com",
    address: "987 Elm Street, Toronto, ON M1F 6G7",
    lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    serviceType: "visiting-angels",
    notes: "Dementia care and companionship services.",
    emergencyContact: {
      name: "Michael Anderson",
      phone: "(555) 678-9013",
      relationship: "Son",
    },
  },
];

const ClientDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">(
    "all",
  );

  const serviceTypes: (ServiceType | "all")[] = [
    "all",
    "visiting-angels",
    "babysitting-angels",
  ];

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      serviceFilter === "all" || client.serviceType === serviceFilter;

    return matchesSearch && matchesService;
  });

  const handleContact = (client: Client) => {
    // Implementation for contacting client
    console.log("Contacting:", client.name);
  };

  const handleSchedule = (client: Client) => {
    // Implementation for scheduling appointment
    console.log("Scheduling appointment for:", client.name);
  };

  const getClientStats = () => {
    const total = mockClients.length;
    const visitingAngels = mockClients.filter(
      (c) => c.serviceType === "visiting-angels",
    ).length;
    const babysittingAngels = mockClients.filter(
      (c) => c.serviceType === "babysitting-angels",
    ).length;

    return { total, visitingAngels, babysittingAngels };
  };

  const getServiceTypeLabel = (type: ServiceType | "all") => {
    switch (type) {
      case "visiting-angels":
        return "Visiting Angels";
      case "babysitting-angels":
        return "Babysitting Angels";
      default:
        return "All Services";
    }
  };

  const getServiceTypeIcon = (type: ServiceType | "all") => {
    switch (type) {
      case "visiting-angels":
        return <Heart className="h-4 w-4" />;
      case "babysitting-angels":
        return <Baby className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const stats = getClientStats();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Client Directory
            </h1>
            <p className="text-slate-600">
              Manage your clients and their information
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Client</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-slate-800">
              {stats.total}
            </div>
            <div className="text-sm text-slate-600">Total Clients</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">
              {stats.visitingAngels}
            </div>
            <div className="text-sm text-slate-600">Visiting Angels</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-pink-600">
              {stats.babysittingAngels}
            </div>
            <div className="text-sm text-slate-600">Babysitting Angels</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, phone, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Service Type:
              </span>
            </div>

            <div className="flex space-x-1">
              {serviceTypes.map((type) => (
                <Button
                  key={type}
                  variant={serviceFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setServiceFilter(type)}
                  className="flex items-center space-x-1"
                >
                  {getServiceTypeIcon(type)}
                  <span>{getServiceTypeLabel(type)}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">
              Showing {filteredClients.length} of {mockClients.length} clients
            </span>
            {(searchTerm || serviceFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setServiceFilter("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Client Grid */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              No clients found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria or add a new client.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onContact={handleContact}
                onSchedule={handleSchedule}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientDirectory;
