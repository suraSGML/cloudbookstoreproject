import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'You can modify or cancel your order within 1 hour of placing it. After that, orders are processed and shipped. Contact our customer service team immediately if you need to make changes.'
        },
        {
          q: 'Do you offer gift wrapping?',
          a: 'Yes! We offer complimentary gift wrapping on all orders. You can add this option during checkout and include a personalized message.'
        },
        {
          q: 'How do I track my order?',
          a: 'Once your order ships, you\'ll receive a tracking number via email. You can also view your order status in your account under "Order History".'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping takes 5-7 business days. Expedited (2-3 days) and Express (1-2 days) shipping options are available at checkout.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes! We ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination and are calculated at checkout.'
        },
        {
          q: 'What if my package is lost or damaged?',
          a: 'If your package is lost or arrives damaged, contact us immediately with your order number and photos of any damage. We\'ll replace the item or issue a full refund.'
        },
        {
          q: 'Can I change my shipping address after ordering?',
          a: 'If your order hasn\'t shipped yet, we can update your address. Contact customer service as soon as possible with your order number and new address.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy. Items must be in original condition. Opened books are subject to a 15% restocking fee. Digital downloads and gift cards are non-refundable.'
        },
        {
          q: 'How long does it take to get a refund?',
          a: 'Refunds are processed within 3-5 business days of receiving your return. It may take an additional 5-10 business days for the refund to appear on your statement.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'We provide free return shipping for damaged, defective, or incorrect items. For other returns, standard return shipping costs apply.'
        },
        {
          q: 'Can I exchange an item instead of returning it?',
          a: 'Absolutely! We offer hassle-free exchanges. Follow the return process and indicate you\'d like an exchange instead of a refund.'
        }
      ]
    },
    {
      category: 'Account & Membership',
      questions: [
        {
          q: 'Do I need an account to place an order?',
          a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, create wishlists, and earn rewards points.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to create a new password.'
        },
        {
          q: 'Is there a loyalty program?',
          a: 'Yes! Members earn 1 point for every dollar spent. Points can be redeemed for discounts on future purchases. Join for free by creating an account.'
        },
        {
          q: 'How do I update my account information?',
          a: 'Log in to your account and click on "Account Settings" to update your personal information, addresses, and payment methods.'
        }
      ]
    },
    {
      category: 'Books & Products',
      questions: [
        {
          q: 'Can I preview a book before buying?',
          a: 'Yes! Many books offer a free preview of the first few pages. Look for the "Preview Pages" button on the book\'s detail page.'
        },
        {
          q: 'Do you sell digital books?',
          a: 'Yes, we offer both physical and digital formats for many titles. Digital books are available for instant download after purchase.'
        },
        {
          q: 'How do I know if a book is in stock?',
          a: 'Stock availability is shown on each product page. If a book is out of stock, you can sign up to be notified when it becomes available.'
        },
        {
          q: 'Can I request a book that\'s not in your catalog?',
          a: 'Absolutely! Contact us with the title and author, and we\'ll do our best to special order it for you. Processing time varies by availability.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Find answers to common questions about ordering, shipping, returns, and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}

          <Card className="p-8 text-center bg-muted">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer service team is ready to help!
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Contact Us
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
