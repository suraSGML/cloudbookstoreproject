import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Package, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <div className="text-sm text-muted-foreground mb-1">Order Number</div>
            <div className="text-2xl font-bold font-mono">{orderNumber}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">Estimated Delivery</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your order will arrive in 5-7 business days
              </p>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">Confirmation Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Receipt sent to your email address
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/" className="block">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                Continue Shopping
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Questions about your order? <a href="#" className="text-accent hover:underline">Contact support</a>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Card className="p-4">
              <div className="font-semibold mb-1">1. Processing</div>
              <p className="text-muted-foreground">We're preparing your books</p>
            </Card>
            <Card className="p-4">
              <div className="font-semibold mb-1">2. Shipping</div>
              <p className="text-muted-foreground">Your order is on its way</p>
            </Card>
            <Card className="p-4">
              <div className="font-semibold mb-1">3. Delivered</div>
              <p className="text-muted-foreground">Enjoy your new books!</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
