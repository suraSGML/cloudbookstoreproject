import { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { books } from '@/data/books';
import type { Book } from '@/data/books';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const navigate = useNavigate();

  const handleAddToCart = (book: Book) => {
    setCart([...cart, book]);
    toast.success(`"${book.title}" added to cart!`);
  };

  const featuredBooks = books.slice(0, 4);
  const bestSellers = books.filter(book => book.rating >= 4.6).slice(0, 4);
  const newReleases = books.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Discover Your Next Favorite Book</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Stories
              <br />
              <span className="text-accent">Come Alive</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Explore thousands of titles from bestsellers to hidden gems. Free shipping on orders over $50.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                Browse Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Staff Picks
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Staff Picks</h2>
            <p className="text-muted-foreground mt-2">Handpicked by our team of book lovers</p>
          </div>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <ProductCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Trending</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Best Sellers</h2>
            <p className="text-muted-foreground mt-2">Most popular books this month</p>
          </div>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((book) => (
            <ProductCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Just In</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">New Releases</h2>
            <p className="text-muted-foreground mt-2">Fresh arrivals you won't want to miss</p>
          </div>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((book) => (
            <ProductCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Book Community
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get exclusive access to early releases, author interviews, and personalized recommendations.
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Sign Up Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
