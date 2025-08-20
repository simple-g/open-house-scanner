import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, CheckCircle, Share2, Copy, Mail, Users, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import QRPoster from "@/components/QRPoster";

const EventSuccess = () => {
  const { eventId } = useParams();
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock event data - would come from API
  const eventData = {
    id: eventId,
    agentName: "Sarah Johnson",
    agentEmail: "sarah@premiumrealty.com",
    brokerage: "Premium Realty Inc.",
    propertyAddress: "123 Maple Street, Toronto, ON M1A 1A1",
    eventDate: "Saturday, March 23, 2024",
    eventTime: "2:00 PM - 4:00 PM",
    brandingColor: "#1e40af",
    calendlyLink: "https://calendly.com/sarah-johnson",
    status: "active"
  };

  const signInUrl = `${window.location.origin}/e/${eventId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(signInUrl)}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/create-event">
                <Button variant="professional">New Event</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Open House Event is Ready!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your QR sign-in page has been created and is live. Print your poster and start collecting leads!
            </p>
            <Badge variant="default" className="text-base px-4 py-2">
              Event Status: Active
            </Badge>
          </div>

          {/* Event Summary */}
          <Card className="mb-8 shadow-professional">
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
              <CardDescription>Your open house event details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Property Address</p>
                    <p className="text-foreground">{eventData.propertyAddress}</p>
                  </div>
                  <div>  
                    <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                    <p className="text-foreground">{eventData.eventDate} • {eventData.eventTime}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Agent</p>
                    <p className="text-foreground">{eventData.agentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Brokerage</p>
                    <p className="text-foreground">{eventData.brokerage}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="poster" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="poster" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Poster
              </TabsTrigger>
              <TabsTrigger value="share" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Manage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="poster">
              <Card className="shadow-professional">
                <CardHeader>
                  <CardTitle>Print-Ready QR Poster</CardTitle>
                  <CardDescription>
                    Download or print your professional QR poster for the open house
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QRPoster 
                    eventData={eventData}
                    qrCodeUrl={qrCodeUrl}
                    signInUrl={signInUrl}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="share">
              <Card className="shadow-professional">
                <CardHeader>
                  <CardTitle>Share Your Sign-in Page</CardTitle>
                  <CardDescription>
                    Share the direct link to your sign-in page via email or social media
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sign-in Page URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={signInUrl}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        onClick={() => copyToClipboard(signInUrl)}
                        variant="outline"
                        size="sm"
                      >
                        {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {copySuccess && (
                      <p className="text-sm text-success">Copied to clipboard!</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Link
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on Social
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Sign-ins</span>
                      <span className="text-2xl font-bold text-foreground">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Hot Leads</span>
                      <span className="text-2xl font-bold text-success">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Emails Sent</span>
                      <span className="text-2xl font-bold text-accent">0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/dashboard" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        View All Leads
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Follow-up Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Lead Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Next Steps */}
          <Card className="mt-8 shadow-card border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Print your QR poster using the "Print Poster" button above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Post the QR code at your open house entrance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>Watch leads come in and receive automatic email notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span>Follow up with leads using the dashboard and CSV export</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventSuccess;