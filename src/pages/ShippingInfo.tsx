import { Package, Clock, Globe, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ShippingInfo = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Shipping Information</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Everything you need to know about our shipping policies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Free Shipping</h2>
                <p className="text-muted-foreground">
                  Enjoy free standard shipping on all orders over $50. For orders under $50, standard shipping is just $4.99.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Delivery Time</h2>
                <p className="text-muted-foreground">
                  Standard shipping takes 5-7 business days. Expedited shipping (2-3 business days) is available for $12.99.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Order Processing</h2>
                <p className="text-muted-foreground">
                  Orders are processed within 1-2 business days. You'll receive a tracking number once your order ships.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">International Shipping</h2>
                <p className="text-muted-foreground">
                  We ship worldwide! International shipping costs vary by destination and are calculated at checkout.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Standard Shipping (5-7 business days)</h3>
                <p className="text-muted-foreground">
                  Our most economical option. Free for orders over $50, otherwise $4.99.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expedited Shipping (2-3 business days)</h3>
                <p className="text-muted-foreground">
                  For when you need your books faster. Available for $12.99 on all orders.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Express Shipping (1-2 business days)</h3>
                <p className="text-muted-foreground">
                  Next-day or two-day delivery. Cost varies based on location, starting at $24.99.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            <p className="text-muted-foreground mb-4">
              Once your order ships, you'll receive an email with your tracking number. You can track your package through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your order confirmation email</li>
              <li>Your account's order history page</li>
              <li>The carrier's website using your tracking number</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
            <p className="text-muted-foreground mb-4">
              Please note the following shipping restrictions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>We cannot ship to P.O. boxes for expedited or express delivery</li>
              <li>Some remote areas may require additional delivery time</li>
              <li>International orders may be subject to customs duties and taxes</li>
              <li>We cannot deliver to APO/FPO addresses for express shipping</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
