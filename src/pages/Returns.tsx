import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Returns = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Return Policy</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            We want you to love your purchase. If you're not satisfied, we're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6 bg-accent/5 border-accent">
            <div className="flex items-start gap-4">
              <RotateCcw className="h-8 w-8 text-accent mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">30-Day Return Policy</h2>
                <p className="text-muted-foreground">
                  You have 30 days from the date of delivery to return your purchase for a full refund or exchange. 
                  Items must be in their original condition with all packaging materials.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Eligible for Return</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Unopened books</li>
                <li>Damaged items</li>
                <li>Wrong item sent</li>
                <li>Defective products</li>
              </ul>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">Not Eligible</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Digital downloads</li>
                <li>Gift cards</li>
                <li>Opened audiobooks</li>
                <li>Special orders</li>
              </ul>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-amber-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Restocking Fee</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Opened books: 15%</li>
                <li>No fee for defects</li>
                <li>No fee for our error</li>
                <li>Free return shipping</li>
              </ul>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">How to Return an Item</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Initiate Return Request</h3>
                  <p className="text-muted-foreground">
                    Go to your order history and select the item you wish to return. Click "Request Return" and follow the prompts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Print Return Label</h3>
                  <p className="text-muted-foreground">
                    We'll email you a prepaid return shipping label. Print it and attach it to the outside of your package.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ship Your Return</h3>
                  <p className="text-muted-foreground">
                    Drop off your package at any authorized shipping location. Keep your receipt as proof of shipment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Receive Your Refund</h3>
                  <p className="text-muted-foreground">
                    Once we receive your return, we'll process it within 3-5 business days. Refunds are issued to the original payment method.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
            <p className="text-muted-foreground mb-4">
              Need to exchange an item? We make it easy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Damaged or defective items are exchanged at no charge</li>
              <li>Wrong size or format? We'll cover the shipping both ways</li>
              <li>Changed your mind? Standard return shipping applies</li>
              <li>Exchanges are processed within 1-2 business days of receipt</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Refund Timeline</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">3-5 business days:</strong> Processing time after we receive your return
              </p>
              <p>
                <strong className="text-foreground">5-10 business days:</strong> Time for refund to appear on your statement
              </p>
              <p className="text-sm">
                Note: Refund timing may vary depending on your financial institution.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-muted">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Have questions about returning an item? Our customer service team is here to help!
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent/90">
                Contact Customer Service
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Returns;
