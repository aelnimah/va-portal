import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  AlertCircle,
  Info,
  AlertTriangle,
  Clock,
  User,
  Filter,
} from "lucide-react";
import { Note, NotePriority } from "@/types";

// Mock data - in a real app, this would come from an API
const mockNotes: Note[] = [
  {
    id: "1",
    content:
      "Client Margaret Johnson needs assistance with medication management. Please ensure all medications are properly labeled and organized.",
    priority: "High",
    author: "Dr. Sarah Wilson",
    authorId: "1",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    clientId: "1",
  },
  {
    id: "2",
    content:
      "Successfully completed morning routine with Thompson family. Children were cooperative and enjoyed educational activities.",
    priority: "Low",
    author: "Emily Chen",
    authorId: "2",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    clientId: "2",
  },
  {
    id: "3",
    content:
      "Robert Davis showed improvement in mobility exercises. Recommend continuing current physiotherapy routine.",
    priority: "Medium",
    author: "Michael Brown",
    authorId: "3",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    clientId: "3",
  },
  {
    id: "4",
    content:
      "Staff meeting scheduled for Friday to discuss new safety protocols. All team members should attend.",
    priority: "High",
    author: "Admin Office",
    authorId: "admin",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
];

export const NotesPanel = () => {
  const [newNote, setNewNote] = useState("");
  const [newNotePriority, setNewNotePriority] =
    useState<NotePriority>("Medium");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  const getPriorityIcon = (priority: NotePriority) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "Medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Low":
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: NotePriority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
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

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return timestamp.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      priority: newNotePriority,
      author: "Current User", // In a real app, this would be the logged-in user
      authorId: "current-user",
      timestamp: new Date(),
    };

    setNotes([note, ...notes]);
    setNewNote("");
    setNewNotePriority("Medium");
  };

  const filteredNotes = notes.filter((note) => {
    if (priorityFilter === "all") return true;
    return note.priority === priorityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Add Note Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Priority:</span>
              <Select
                value={newNotePriority}
                onValueChange={(value) =>
                  setNewNotePriority(value as NotePriority)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Add Note</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Notes</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High Only</SelectItem>
                  <SelectItem value="Medium">Medium Only</SelectItem>
                  <SelectItem value="Low">Low Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Info className="h-8 w-8 mx-auto mb-2" />
                <p>No notes found for the selected filter.</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-slate-100">
                        {getInitials(note.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-slate-800">
                            {note.author}
                          </span>
                          <Badge
                            variant="secondary"
                            className={getPriorityColor(note.priority)}
                          >
                            <div className="flex items-center space-x-1">
                              {getPriorityIcon(note.priority)}
                              <span>{note.priority}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(note.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {note.content}
                      </p>
                      {(note.clientId ||
                        note.staffId ||
                        note.appointmentId) && (
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <User className="h-3 w-3" />
                          <span>
                            Related to:{" "}
                            {note.clientId
                              ? "Client"
                              : note.staffId
                                ? "Staff"
                                : "Appointment"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
