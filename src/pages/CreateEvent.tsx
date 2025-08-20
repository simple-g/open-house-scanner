import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, ArrowLeft, Building, User, Mail, Palette, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    agentName: "",
    agentEmail: "",
    agentPhone: "",
    brokerage: "",
    brandingColor: "#1e40af",
    calendlyLink: "",
    propertyAddress: "",
    eventDate: "",
    eventTime: "",
    propertyDescription: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would integrate with backend
    console.log("Event data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">OpenHouse QR</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Step 1 of 2</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Create Your Open House Event
            </h1>
            <p className="text-lg text-muted-foreground">
              Set up your professional QR sign-in page in under 60 seconds
            </p>
          </div>

          <Card className="shadow-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Event Details
              </CardTitle>
              <CardDescription>
                Enter your information to create a branded sign-in experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Agent Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Agent Name
                    </Label>
                    <Input
                      id="agentName"
                      name="agentName"
                      value={formData.agentName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="agentEmail"
                      name="agentEmail"
                      type="email"
                      value={formData.agentEmail}
                      onChange={handleInputChange}
                      placeholder="john@realty.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentPhone">Phone Number</Label>
                    <Input
                      id="agentPhone"
                      name="agentPhone"
                      type="tel"
                      value={formData.agentPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brokerage" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Brokerage
                    </Label>
                    <Input
                      id="brokerage"
                      name="brokerage"
                      value={formData.brokerage}
                      onChange={handleInputChange}
                      placeholder="ABC Realty Inc."
                      required
                    />
                  </div>
                </div>

                {/* Branding */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandingColor" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Brand Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="brandingColor"
                        name="brandingColor"
                        type="color"
                        value={formData.brandingColor}
                        onChange={handleInputChange}
                        className="w-16 h-11 p-1 border border-input"
                      />
                      <Input
                        value={formData.brandingColor}
                        onChange={handleInputChange}
                        name="brandingColor"
                        placeholder="#1e40af"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calendlyLink" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Calendly/Cal.com Link
                    </Label>
                    <Input
                      id="calendlyLink"
                      name="calendlyLink"
                      type="url"
                      value={formData.calendlyLink}
                      onChange={handleInputChange}
                      placeholder="https://calendly.com/yourlink"
                    />
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Property Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Toronto, ON M1A 1A1"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Open House Date</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventTime">Time</Label>
                      <Input
                        id="eventTime"
                        name="eventTime"
                        type="text"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        placeholder="2:00 PM - 4:00 PM"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyDescription">Property Description (Optional)</Label>
                    <Textarea
                      id="propertyDescription"
                      name="propertyDescription"
                      value={formData.propertyDescription}
                      onChange={handleInputChange}
                      placeholder="Beautiful 3-bedroom home in desirable neighborhood..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link to="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" variant="hero" className="flex-1">
                    Create QR Sign-in Page
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Card */}
          <Card className="mt-8 shadow-card border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <span className="text-sm">Generate your branded QR poster for printing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <span className="text-sm">Visitors scan QR code to access your sign-in page</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <span className="text-sm">Instant branded follow-up emails sent automatically</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;