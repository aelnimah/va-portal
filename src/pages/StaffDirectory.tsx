import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { StaffCard } from "@/components/directory/StaffCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserPlus } from "lucide-react";
import { Staff, StaffRole } from "@/types";

// Mock data - in a real app, this would come from an API
const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    role: "PSW",
    phone: "(555) 987-6543",
    email: "sarah.wilson@visitingangels.com",
    status: "Active",
    specializations: ["Personal Care", "Dementia Care", "Mobility Assistance"],
  },
  {
    id: "2",
    name: "Emily Chen",
    role: "Babysitter",
    phone: "(555) 876-5432",
    email: "emily.chen@babysittingangels.com",
    status: "Active",
    specializations: [
      "Infant Care",
      "Educational Activities",
      "Light Meal Prep",
    ],
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "RN",
    phone: "(555) 765-4321",
    email: "michael.brown@visitingangels.com",
    status: "Active",
    specializations: [
      "Medication Management",
      "Wound Care",
      "Health Monitoring",
    ],
  },
  {
    id: "4",
    name: "Jessica Taylor",
    role: "RPN",
    phone: "(555) 654-3210",
    email: "jessica.taylor@visitingangels.com",
    status: "Active",
    specializations: ["Chronic Disease Management", "Post-Operative Care"],
  },
  {
    id: "5",
    name: "David Martinez",
    role: "PSW",
    phone: "(555) 543-2109",
    email: "david.martinez@visitingangels.com",
    status: "On Leave",
    specializations: ["Physical Therapy Support", "Companionship"],
  },
  {
    id: "6",
    name: "Ashley Johnson",
    role: "Babysitter",
    phone: "(555) 432-1098",
    email: "ashley.johnson@babysittingangels.com",
    status: "Active",
    specializations: ["Toddler Care", "Arts & Crafts", "Homework Help"],
  },
];

const StaffDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<StaffRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "On Leave"
  >("All");

  const roles: (StaffRole | "All")[] = [
    "All",
    "PSW",
    "RN",
    "RPN",
    "Babysitter",
  ];
  const statuses: ("All" | "Active" | "Inactive" | "On Leave")[] = [
    "All",
    "Active",
    "Inactive",
    "On Leave",
  ];

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm);

    const matchesRole = roleFilter === "All" || staff.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || staff.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleContact = (staff: Staff) => {
    // Implementation for contacting staff member
    console.log("Contacting:", staff.name);
  };

  const getStaffStats = () => {
    const total = mockStaff.length;
    const active = mockStaff.filter((s) => s.status === "Active").length;
    const onLeave = mockStaff.filter((s) => s.status === "On Leave").length;

    return { total, active, onLeave };
  };

  const stats = getStaffStats();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Staff Directory
            </h1>
            <p className="text-slate-600">Manage your healthcare team</p>
          </div>
          <Button className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Staff Member</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-slate-800">
              {stats.total}
            </div>
            <div className="text-sm text-slate-600">Total Staff</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-slate-600">Active Staff</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.onLeave}
            </div>
            <div className="text-sm text-slate-600">On Leave</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Filters:
              </span>
            </div>

            {/* Role Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Role:</span>
              <div className="flex space-x-1">
                {roles.map((role) => (
                  <Button
                    key={role}
                    variant={roleFilter === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRoleFilter(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Status:</span>
              <div className="flex space-x-1">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">
              Showing {filteredStaff.length} of {mockStaff.length} staff members
            </span>
            {(searchTerm || roleFilter !== "All" || statusFilter !== "All") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("All");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Staff Grid */}
        {filteredStaff.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              No staff members found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria or add a new staff member.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                onContact={handleContact}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StaffDirectory;
