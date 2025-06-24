
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageViewer = ({ src, alt, className = "" }: ImageViewerProps) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setScale(1);
    setRotation(0);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetView();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt}
          className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        />
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="relative flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView}>
                Reset
              </Button>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Image Container */}
          <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4">
            <img
              src={src}
              alt={alt}
              className="max-w-none transition-transform duration-200"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
