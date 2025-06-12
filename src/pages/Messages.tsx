import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  Clock,
  MessageSquare,
  Users,
  Plus,
  Paperclip,
} from "lucide-react";

// Mock data for messages
const mockConversations = [
  {
    id: "1",
    name: "Healthcare Team",
    lastMessage: "New patient intake scheduled for tomorrow",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unread: 2,
    participants: ["Dr. Sarah Wilson", "Emily Chen", "Michael Brown"],
    type: "group",
  },
  {
    id: "2",
    name: "Emily Chen",
    lastMessage: "Thompson family appointment confirmed",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unread: 0,
    type: "direct",
  },
  {
    id: "3",
    name: "Operations Team",
    lastMessage: "Staff meeting moved to 3 PM",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    unread: 1,
    participants: ["Dr. Sarah Wilson", "Admin Office", "Jessica Taylor"],
    type: "group",
  },
];

const mockMessages = [
  {
    id: "1",
    sender: "Emily Chen",
    content:
      "Hi team! Just wanted to confirm the Thompson family appointment for tomorrow at 2 PM.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    isOwn: false,
  },
  {
    id: "2",
    sender: "Dr. Sarah Wilson",
    content:
      "Confirmed! I've also added their special requirements to the client notes.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isOwn: true,
  },
  {
    id: "3",
    sender: "Michael Brown",
    content: "Perfect. I'll make sure to review the care plan beforehand.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isOwn: false,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0],
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, this would send the message via API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout>
      <div className="h-[calc(100vh-3rem)] flex space-x-4">
        {/* Conversations List */}
        <div className="w-80 flex flex-col">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button size="sm" className="flex items-center space-x-1">
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-slate-100">
                            {conversation.type === "group" ? (
                              <Users className="h-5 w-5 text-slate-600" />
                            ) : (
                              getInitials(conversation.name)
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.unread > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm text-slate-800 truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-slate-500">
                            {formatTime(conversation.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.type === "group" &&
                          conversation.participants && (
                            <p className="text-xs text-slate-500 mt-1">
                              {conversation.participants.length} participants
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-100">
                    {selectedConversation.type === "group" ? (
                      <Users className="h-5 w-5 text-slate-600" />
                    ) : (
                      getInitials(selectedConversation.name)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {selectedConversation.name}
                  </h2>
                  {selectedConversation.type === "group" &&
                    selectedConversation.participants && (
                      <p className="text-sm text-slate-600">
                        {selectedConversation.participants.join(", ")}
                      </p>
                    )}
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : ""}`}
                    >
                      <div
                        className={`rounded-lg p-3 ${
                          message.isOwn
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="font-medium text-sm mb-1">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[80px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
