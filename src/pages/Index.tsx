import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Mail, Users, FileDown, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">OpenHouse QR</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/create-event">
                <Button variant="professional">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              QR Sign-in for{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">Open Houses</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create → Print → Collect → Follow-up in minutes. 
              Instant branded emails, lead management, and CASL compliance built-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/create-event">
                <Button variant="hero" size="xl">
                  Create Your First Event
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                View Demo
              </Button>
            </div>
            
            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src={heroImage} 
                alt="Professional real estate open house" 
                className="rounded-xl shadow-professional w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Professional Open Houses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Day-of speed meets Canada-first compliance with bilingual templates and co-branding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <QrCode className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Instant QR Setup</CardTitle>
                <CardDescription>
                  Generate printable QR posters in 30-60 seconds. No apps required for visitors.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <Mail className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Branded Follow-ups</CardTitle>
                <CardDescription>
                  Instant thank-you emails with your branding, vCard, and Calendly scheduling links.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <Users className="h-12 w-12 text-success mb-4" />
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>
                  Organized lead vault with filtering, CSV export, and hot/warm lead tagging.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>CASL Compliant</CardTitle>
                <CardDescription>
                  Built-in express consent, sender ID, and one-click unsubscribe for Canadian compliance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <FileDown className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Print-Ready Posters</CardTitle>
                <CardDescription>
                  Professional Letter/A4 posters with your branding and clear instructions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-professional transition-smooth border-border/50">
              <CardHeader>
                <MapPin className="h-12 w-12 text-success mb-4" />
                <CardTitle>Multi-Language</CardTitle>
                <CardDescription>
                  Bilingual EN/FR templates and co-branding for Canadian real estate professionals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              No setup fees, no contracts. Pay only for what you use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-professional border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Single Event</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$15</div>
                <CardDescription>Perfect for one-time open houses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    QR poster generation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Unlimited sign-ins
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Branded email follow-ups
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    CSV export
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Choose Single Event
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-professional border-accent/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Unlimited</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$29<span className="text-base font-normal text-muted-foreground">/month</span></div>
                <CardDescription>For active real estate professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Unlimited events
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Bilingual templates
                  </li>
                </ul>
                <Button variant="hero" className="w-full mt-6">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <QrCode className="h-6 w-6 text-primary" />
              <span className="font-bold text-foreground">OpenHouse QR</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
              <a href="#" className="hover:text-foreground transition-smooth">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 OpenHouse QR. Built for Canadian real estate professionals.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;