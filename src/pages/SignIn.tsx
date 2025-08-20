import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, User, Mail, Phone, Clock, MapPin, Building } from "lucide-react";

const SignIn = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitorType: "",
    timeline: "",
    hasConsent: false
  });

  // Mock event data - would come from API
  const eventData = {
    agentName: "Sarah Johnson",
    brokerage: "Premium Realty Inc.",
    propertyAddress: "123 Maple Street, Toronto, ON M1A 1A1",
    eventDate: "Saturday, March 23, 2024",
    eventTime: "2:00 PM - 4:00 PM",
    brandingColor: "#1e40af"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData({
      ...formData,
      hasConsent: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasConsent) {
      alert("Please provide consent to receive follow-up communications.");
      return;
    }
    // Handle form submission - would integrate with backend
    console.log("Sign-in data:", formData);
    // Show success message and redirect
  };

  return (
    <div className="min-h-screen bg-gradient-card px-4 py-8">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">OpenHouse QR</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome to Our Open House
          </h1>
          <p className="text-muted-foreground">
            Please sign in to receive property information and schedule a private showing
          </p>
        </div>

        {/* Property Info Card */}
        <Card className="mb-6 shadow-card border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{eventData.propertyAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {eventData.eventDate} • {eventData.eventTime}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {eventData.agentName} • {eventData.brokerage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign-in Form */}
        <Card className="shadow-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Sign In
            </CardTitle>
            <CardDescription>
              Please provide your information to receive updates about this property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitorType">I am a</Label>
                <Select onValueChange={(value) => handleSelectChange("visitorType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Home Buyer</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="agent">Real Estate Agent</SelectItem>
                    <SelectItem value="neighbor">Neighbor</SelectItem>
                    <SelectItem value="curious">Just Curious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline to Purchase</Label>
                <Select onValueChange={(value) => handleSelectChange("timeline", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="over-1-year">Over 1 year</SelectItem>
                    <SelectItem value="not-sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CASL Consent */}
              <Card className="border-accent/20 bg-accent-light/10">
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="consent" 
                      checked={formData.hasConsent}
                      onCheckedChange={handleConsentChange}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="consent" 
                        className="text-sm font-normal leading-relaxed cursor-pointer"
                      >
                        <strong>Express Consent (Required):</strong> I consent to receive commercial 
                        electronic messages from {eventData.agentName} and {eventData.brokerage} 
                        regarding this property and related real estate opportunities. I understand 
                        I can unsubscribe at any time by clicking the unsubscribe link in any email.
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                variant="professional" 
                size="lg" 
                className="w-full"
                disabled={!formData.hasConsent}
              >
                Sign In to Open House
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By signing in, you agree to receive property information and scheduling details. 
                Your information is secure and will not be shared with third parties.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>Powered by OpenHouse QR • CASL Compliant</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;