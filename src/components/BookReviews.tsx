import { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string;
  } | null;
}

interface BookReviewsProps {
  bookId: string;
}

const BookReviews = ({ bookId }: BookReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
      return;
    }

    // Fetch user profiles separately
    const reviewsWithProfiles = await Promise.all(
      (data || []).map(async (review) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', review.user_id)
          .single();

        return {
          ...review,
          profiles: profile
        };
      })
    );

    setReviews(reviewsWithProfiles as any);
    
    // Check if user has already reviewed
    if (user) {
      const existingReview = reviewsWithProfiles.find(r => r.user_id === user.id);
      if (existingReview) {
        setUserReview(existingReview as any);
        setRating(existingReview.rating);
        setReviewText(existingReview.review_text || '');
      }
    }
    
    setLoading(false);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);

    if (userReview) {
      // Update existing review
      const { error } = await supabase
        .from('reviews')
        .update({
          rating,
          review_text: reviewText.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', userReview.id);

      if (error) {
        toast.error('Failed to update review');
        setSubmitting(false);
        return;
      }

      toast.success('Review updated successfully');
    } else {
      // Create new review
      const { error } = await supabase
        .from('reviews')
        .insert({
          book_id: bookId,
          user_id: user.id,
          rating,
          review_text: reviewText.trim() || null
        });

      if (error) {
        toast.error('Failed to submit review');
        setSubmitting(false);
        return;
      }

      toast.success('Review submitted successfully');
    }

    setSubmitting(false);
    setShowReviewForm(false);
    fetchReviews();
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', userReview.id);

    if (error) {
      toast.error('Failed to delete review');
      return;
    }

    toast.success('Review deleted');
    setUserReview(null);
    setRating(0);
    setReviewText('');
    fetchReviews();
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>
        
        {user && !showReviewForm && (
          <Button onClick={() => setShowReviewForm(true)}>
            {userReview ? 'Edit Review' : 'Write a Review'}
          </Button>
        )}
      </div>

      {showReviewForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        i < (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review (Optional)</label>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={4}
                maxLength={1000}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {reviewText.length}/1000 characters
              </p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={submitting || rating === 0}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : userReview ? 'Update Review' : 'Submit Review'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  if (!userReview) {
                    setRating(0);
                    setReviewText('');
                  }
                }}
              >
                Cancel
              </Button>
              {userReview && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteReview}
                >
                  Delete Review
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review this book!
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">
                    {review.profiles?.full_name || review.profiles?.email?.split('@')[0] || 'Anonymous'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.review_text && (
                <p className="text-muted-foreground">{review.review_text}</p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BookReviews;
