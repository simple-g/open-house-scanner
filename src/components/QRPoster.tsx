import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Download, Printer } from "lucide-react";

interface QRPosterProps {
  eventData: {
    agentName: string;
    brokerage: string;
    propertyAddress: string;
    eventDate: string;
    eventTime: string;
    brandingColor: string;
  };
  qrCodeUrl: string;
  signInUrl: string;
}

const QRPoster = ({ eventData, qrCodeUrl, signInUrl }: QRPosterProps) => {
  const handleDownload = () => {
    // Generate PDF or high-res image for download
    console.log("Download poster");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Poster Preview */}
      <div className="bg-background border-2 border-dashed border-border rounded-lg p-8">
        <div 
          className="max-w-2xl mx-auto bg-background shadow-professional rounded-lg overflow-hidden print:shadow-none print:max-w-none"
          style={{ aspectRatio: "8.5/11" }} // Letter size ratio
        >
          {/* Header */}
          <div 
            className="px-8 py-6 text-white"
            style={{ backgroundColor: eventData.brandingColor }}
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">OPEN HOUSE</h1>
              <p className="text-lg opacity-90">Scan to Sign In</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 text-center space-y-6">
            {/* Property Info */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{eventData.propertyAddress}</h2>
              <p className="text-lg text-muted-foreground">
                {eventData.eventDate} • {eventData.eventTime}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-8">
              <div className="bg-white p-6 rounded-lg shadow-card border-2 border-border">
                {/* Mock QR Code - in real app this would be generated */}
                <div className="w-48 h-48 bg-foreground flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 w-40 h-40">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.5 ? 'bg-background' : 'bg-foreground'} aspect-square`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold text-foreground">How to Sign In:</h3>
              <ol className="space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Open your phone's camera app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Point camera at QR code above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>Tap the link that appears</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span>Fill out the quick sign-in form</span>
                </li>
              </ol>
            </div>

            {/* Backup URL */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Can't scan? Visit: <br />
                <span className="font-mono text-primary break-all">{signInUrl}</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-secondary border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-semibold text-foreground">{eventData.agentName}</p>
                <p className="text-muted-foreground">{eventData.brokerage}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <QrCode className="h-4 w-4" />
                  <span>Powered by OpenHouse QR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handlePrint} variant="outline" size="lg">
          <Printer className="h-4 w-4 mr-2" />
          Print Poster
        </Button>
        <Button onClick={handleDownload} variant="professional" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Tips */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-3">Printing Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Print on Letter (8.5" x 11") or A4 paper for best results</li>
            <li>• Use color printing for maximum impact</li>
            <li>• Consider laminating for outdoor use</li>
            <li>• Post at eye level near the main entrance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRPoster;