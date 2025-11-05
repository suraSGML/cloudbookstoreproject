import { useState } from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

interface BookPreviewProps {
  bookId: string;
  bookTitle: string;
  previewUrl?: string | null;
  downloadUrl?: string | null;
  pagesPreview?: number;
}

const BookPreview = ({ bookTitle, previewUrl, downloadUrl, pagesPreview = 10 }: BookPreviewProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      toast.success('Download started');
    } else {
      toast.info('Download not available for this book');
    }
  };

  const handlePreview = () => {
    if (previewUrl) {
      setIsPreviewOpen(true);
    } else {
      toast.info('Preview not available for this book');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>Preview first {pagesPreview} pages before buying</span>
      </div>

      <div className="flex gap-3">
        {previewUrl && (
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview Pages
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Preview: {bookTitle}</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-auto">
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title={`Preview of ${bookTitle}`}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {downloadUrl && (
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Sample
          </Button>
        )}
      </div>

      {!previewUrl && !downloadUrl && (
        <p className="text-sm text-muted-foreground text-center py-2">
          Preview and download options coming soon
        </p>
      )}
    </div>
  );
};

export default BookPreview;
