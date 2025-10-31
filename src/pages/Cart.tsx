import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 14.99,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      quantity: 1,
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 12.99,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50" />
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven't added any books yet.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90"
            onClick={() => navigate('/')}
          >
            Browse Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.author}
                      </p>
                    </div>
                    <p className="text-xl font-bold">${item.price}</p>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50 && shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-6 space-y-2 text-xs text-center text-muted-foreground">
                <p>✓ Secure checkout</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Free returns</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
