import React, { useState, useEffect } from 'react';

// This component implements lazy loading, WebP support,
// and progressive image loading for better performance
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width = "100%", 
  height = "auto",
  placeholderColor = "#f3f4f6",
  onError,
  priority = false,
  loading = "lazy"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  
  // Check if we have an optimized version available
  const getOptimizedSrc = (originalSrc) => {
    try {
      if (!originalSrc) return '';
      
      // Extract path components
      const lastSlashIndex = originalSrc.lastIndexOf('/');
      if (lastSlashIndex === -1) return originalSrc;
      
      const basePath = originalSrc.substring(0, lastSlashIndex);
      const fileName = originalSrc.substring(lastSlashIndex + 1);
      
      // Replace extension with .webp
      const webpFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Check if browser supports WebP
      const supportsWebP = document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;
      
      return supportsWebP 
        ? `${basePath}/optimized/${webpFileName}` 
        : `${basePath}/optimized/${fileName}`;
    } catch (error) {
      console.error('Error generating optimized image path:', error);
      return originalSrc;
    }
  };
  
  // Load image only when component is in viewport
  useEffect(() => {
    // If priority is true, load immediately without intersection observer
    if (priority) {
      setImgSrc(src);
      return;
    }
    
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImgSrc(src);
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      
      const currentElement = document.getElementById(`image-${alt.replace(/\s+/g, '-')}`);
      if (currentElement) {
        observer.observe(currentElement);
      }
      
      return () => {
        if (currentElement) {
          observer.disconnect();
        }
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setImgSrc(src);
    }
  }, [src, alt]);
  
  // Try to get optimized version if available
  const optimizedSrc = priority ? getOptimizedSrc(src) : getOptimizedSrc(imgSrc);

  return (
    <div 
      id={`image-${alt.replace(/\s+/g, '-')}`}
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        width, 
        height,
        backgroundColor: placeholderColor
      }}
    >
      {/* Low-quality placeholder - use WebP thumbnail if available */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{ 
          backgroundImage: `url(${(src?.replace(/\.\w+$/, '-thumbnail.webp') || src?.replace(/\.\w+$/, '-thumb.jpg') || '')})`,
          opacity: isLoaded ? 0 : 0.8,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Main image - with WebP support */}
      {(priority ? src : imgSrc) && (
        <img 
          src={optimizedSrc || (priority ? src : imgSrc)}
          alt={alt}
          loading={priority ? "eager" : loading}
          fetchpriority={priority ? "high" : "auto"}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error(`Failed to load optimized image: ${optimizedSrc}`);
            // Try fallback to original image
            e.target.src = priority ? src : imgSrc;
            
            // If onError prop is provided, call it
            if (onError) {
              onError(e);
            }
          }}
        />
      )}
      
      {/* Loading indicator - only show for non-priority images that are loading */}
      {!isLoaded && (priority ? src : imgSrc) && !priority && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;