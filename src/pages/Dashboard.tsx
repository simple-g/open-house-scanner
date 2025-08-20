import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QrCode, Download, Filter, Users, Mail, TrendingUp, Eye, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from API
  const events = [
    {
      id: "1",
      propertyAddress: "123 Maple Street, Toronto",
      date: "2024-03-23",
      signIns: 12,
      status: "active"
    },
    {
      id: "2", 
      propertyAddress: "456 Oak Avenue, Mississauga",
      date: "2024-03-20",
      signIns: 8,
      status: "completed"
    }
  ];

  const leads = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "(555) 123-4567",
      visitorType: "buyer",
      timeline: "1-3-months",
      status: "hot",
      signInTime: "2024-03-23 14:30",
      eventId: "1"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@email.com", 
      phone: "(555) 234-5678",
      visitorType: "investor",
      timeline: "immediately",
      status: "hot",
      signInTime: "2024-03-23 15:15",
      eventId: "1"
    },
    {
      id: "3",
      name: "Lisa Williams",
      email: "lisa@email.com",
      phone: "(555) 345-6789", 
      visitorType: "buyer",
      timeline: "6-12-months",
      status: "warm",
      signInTime: "2024-03-23 16:00",
      eventId: "1"
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Visitor Type", "Timeline", "Status", "Sign-in Time"],
      ...filteredLeads.map(lead => [
        lead.name, lead.email, lead.phone, lead.visitorType, 
        lead.timeline, lead.status, lead.signInTime
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "open-house-leads.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">OpenHouse QR</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/create-event">
                <Button variant="professional">
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Lead Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your open house events and track visitor engagement
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold text-foreground">{events.length}</p>
                </div>
                <QrCode className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sign-ins</p>
                  <p className="text-2xl font-bold text-foreground">{leads.length}</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hot Leads</p>
                  <p className="text-2xl font-bold text-foreground">
                    {leads.filter(l => l.status === "hot").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">67%</p>
                </div>
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="mb-8 shadow-professional">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Your latest open house events and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{event.propertyAddress}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{event.signIns}</p>
                      <p className="text-xs text-muted-foreground">Sign-ins</p>
                    </div>
                    <Badge variant={event.status === "active" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leads Management */}
        <Card className="shadow-professional">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>
                  Track and manage your open house visitors
                </CardDescription>
              </div>
              <Button onClick={exportToCSV} variant="accent">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="hot">Hot Leads</SelectItem>
                  <SelectItem value="warm">Warm Leads</SelectItem>
                  <SelectItem value="cold">Cold Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Leads Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sign-in Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{lead.email}</div>
                          <div className="text-muted-foreground">{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {lead.visitorType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{lead.timeline}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={lead.status === "hot" ? "default" : 
                                  lead.status === "warm" ? "secondary" : "outline"}
                          className="capitalize"
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(lead.signInTime).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No leads found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;