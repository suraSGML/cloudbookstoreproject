import { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import FilterSort, { type FilterOptions } from '@/components/FilterSort';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  format: string;
  genre: string;
  cover: string | null;
  description: string | null;
  isbn: string | null;
  publication_date: string | null;
  publicationDate?: string; // For compatibility
  in_stock: boolean;
  inStock?: number; // For compatibility with ProductCard
}

const Home = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    genre: 'all',
    minPrice: 0,
    maxPrice: 50,
    minRating: 0,
    sortBy: 'featured',
  });
  
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('in_stock', true);

    if (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
      return;
    }

    // Transform data to include inStock for compatibility
    const transformedBooks = data.map(book => ({
      ...book,
      inStock: book.in_stock ? 10 : 0,
      publicationDate: book.publication_date || undefined
    }));

    setBooks(transformedBooks);
    setLoading(false);
  };

  const genres = useMemo(() => {
    const uniqueGenres = new Set(books.map(book => book.genre));
    return Array.from(uniqueGenres).sort();
  }, [books]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query) ||
          (book.isbn && book.isbn.toLowerCase().includes(query)) ||
          (book.description && book.description.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }
      
      // Genre filter
      if (filters.genre !== 'all' && book.genre !== filters.genre) return false;
      
      // Price filter
      if (book.price < filters.minPrice || book.price > filters.maxPrice) return false;
      
      // Rating filter
      if (book.rating < filters.minRating) return false;
      
      return true;
    });

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [books, filters, searchQuery]);

  const featuredBooks = useMemo(() => books.slice(0, 4), [books]);
  const bestSellers = useMemo(() => books.filter(book => book.rating >= 4.6).slice(0, 4), [books]);
  const newReleases = useMemo(() => books.slice(4, 8), [books]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            <ProductCard key={book.id} book={book as any} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* All Books with Filters */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">All Books</h2>
          <p className="text-muted-foreground">Browse our complete collection</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSort
              filters={filters}
              onFilterChange={setFilters}
              genres={genres}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredAndSortedBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No books found matching your filters</p>
                <Button onClick={() => setFilters({
                  genre: 'all',
                  minPrice: 0,
                  maxPrice: 50,
                  minRating: 0,
                  sortBy: 'featured',
                })}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {filteredAndSortedBooks.length} {filteredAndSortedBooks.length === 1 ? 'book' : 'books'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedBooks.map((book) => (
                    <ProductCard key={book.id} book={book as any} onAddToCart={addToCart} />
                  ))}
                </div>
              </>
            )}
          </div>
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
          <Button 
            variant="ghost"
            onClick={() => {
              setViewFilter('bestseller');
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((book) => (
            <ProductCard key={book.id} book={book as any} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4 py-16">
...
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((book) => (
            <ProductCard key={book.id} book={book as any} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* CTA Section - Only show when not logged in */}
      {!user && (
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Book Community
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get exclusive access to early releases, author interviews, and personalized recommendations.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
