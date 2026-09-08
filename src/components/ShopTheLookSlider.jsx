import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Volume2, VolumeX, Maximize2, ShoppingBag, Eye } from 'lucide-react';

const lookVideos = [
  {
    id: 'look-1',
    title: 'Royal Oak Chrono',
    productId: 'prod-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-close-up-41556-large.mp4',
    poster: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-2',
    title: 'Skeleton Tourbillon',
    productId: 'prod-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-his-wrist-watch-41555-large.mp4',
    poster: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-3',
    title: 'Noir Minimalist',
    productId: 'prod-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-checking-the-time-on-a-wrist-watch-41553-large.mp4',
    poster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-4',
    title: 'Oceanic Diver 300M',
    productId: 'prod-4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-adjusting-a-wrist-watch-41554-large.mp4',
    poster: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-5',
    title: 'Smart Horizon Gold',
    productId: 'prod-5',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-looking-at-his-wrist-watch-41557-large.mp4',
    poster: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-6',
    title: 'Heritage Rose Vault',
    productId: 'prod-6',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-close-up-41556-large.mp4',
    poster: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-7',
    title: 'Executive Steel Chrono',
    productId: 'prod-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-checking-the-time-on-a-wrist-watch-41553-large.mp4',
    poster: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  }
];

const ShopTheLookSlider = () => {
  const { products, setSelectedProduct, lookVideos: storeLookVideos } = useStore();
  const lookVideosList = storeLookVideos && storeLookVideos.length > 0 ? storeLookVideos : lookVideos;
  
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Track mute state for each of the videos (default muted)
  const [mutedStates, setMutedStates] = useState(new Array(lookVideosList.length).fill(true));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const videoRefs = useRef([]);

  // Mouse Drag-to-Scroll State for Video Cards
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeftPos - walk;
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = (scrollLeft / maxScroll) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    }
  };

  // Progress Bar Line Direct Mouse Dragging & Click Navigation
  const updateScrollFromProgress = (clientX) => {
    if (!progressBarRef.current || !sliderRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    sliderRef.current.scrollLeft = percentage * maxScroll;
  };

  const handleProgressMouseDown = (e) => {
    setIsDraggingProgress(true);
    updateScrollFromProgress(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDraggingProgress) {
        updateScrollFromProgress(e.clientX);
      }
    };
    const handleGlobalMouseUp = () => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
      }
    };

    if (isDraggingProgress) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDraggingProgress]);

  const toggleMute = (index) => {
    setMutedStates(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      if (videoRefs.current[index]) {
        videoRefs.current[index].muted = updated[index];
      }
      return updated;
    });
  };

  const toggleFullscreen = (index) => {
    const videoEl = videoRefs.current[index];
    if (videoEl) {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen();
      } else if (videoEl.webkitRequestFullscreen) {
        videoEl.webkitRequestFullscreen();
      } else if (videoEl.msRequestFullscreen) {
        videoEl.msRequestFullscreen();
      }
    }
  };

  const handleProductClick = (productId) => {
    const targetProd = products.find(p => p.id === productId) || products[0];
    if (targetProd) {
      setSelectedProduct(targetProd);
    }
  };

  return (
    <div className="w-full mt-6 md:mt-8 relative group px-1 sm:px-4 select-none">
      
      {/* Horizontal Ultra-Smooth Scroll Container (7 Boxes) */}
      <div 
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex space-x-3.5 md:space-x-5 overflow-x-auto scrollbar-none py-3 px-2 sm:px-4 transition-all duration-300 cursor-grab ${
          isMouseDown ? 'cursor-grabbing scroll-auto' : 'scroll-smooth'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {lookVideosList.map((item, idx) => (
          <div 
            key={item.id}
            className="w-[240px] sm:w-[280px] md:w-[310px] h-[380px] sm:h-[440px] md:h-[470px] flex-shrink-0 snap-center rounded-2xl md:rounded-3xl relative overflow-hidden bg-[#111111] border border-[#c5a059]/30 hover:border-[#c5a059] transition-all duration-300 shadow-2xl group/card flex flex-col justify-between p-4 sm:p-5"
          >
            {/* Background Video */}
            <video
              ref={el => videoRefs.current[idx] = el}
              src={item.videoUrl}
              poster={item.poster}
              autoPlay
              loop
              muted={mutedStates[idx]}
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"
            />

            {/* Gradient Overlays for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none rounded-2xl md:rounded-3xl" />

            {/* TOP HEADER: Clean Box Title */}
            <div className="relative z-20 flex flex-col">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-light tracking-wider uppercase drop-shadow-md line-clamp-1">
                {item.title}
              </h3>
            </div>

            {/* BOTTOM FOOTER: View Product / Shop Now + Controls */}
            <div className="relative z-20 flex flex-col space-y-3 pt-3.5 border-t border-white/10">
              
              {/* Product Quick Action Bar */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => handleProductClick(item.productId)}
                  className="flex-1 bg-[#c5a059] text-black hover:bg-[#e5c158] font-semibold text-xs py-2 px-3 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>Shop Now</span>
                </button>

                <button
                  onClick={() => handleProductClick(item.productId)}
                  className="bg-black/60 backdrop-blur-md text-gray-200 hover:text-[#e5c158] hover:bg-black/80 font-light text-[11px] py-2 px-2.5 rounded-xl border border-white/20 transition-all flex items-center space-x-1 cursor-pointer"
                  title="View Details"
                >
                  <Eye size={13} />
                  <span className="hidden sm:inline">View</span>
                </button>
              </div>

              {/* Video Controls Bar: Volume & Fullscreen Icons */}
              <div className="flex items-center justify-between text-xs text-gray-300 px-0.5 pt-0.5">
                <span className="text-[9px] tracking-widest text-gray-400 font-extralight uppercase">
                  Wazum Look
                </span>

                <div className="flex items-center space-x-2">
                  {/* Volume Icon Button */}
                  <button 
                    onClick={() => toggleMute(idx)}
                    className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:text-white hover:bg-[#c5a059] hover:border-[#c5a059] transition-all cursor-pointer shadow-sm"
                    title={mutedStates[idx] ? "Unmute Video" : "Mute Video"}
                    aria-label="Volume Control"
                  >
                    {mutedStates[idx] ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>

                  {/* Fullscreen Icon Button */}
                  <button 
                    onClick={() => toggleFullscreen(idx)}
                    className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:text-white hover:bg-[#c5a059] hover:border-[#c5a059] transition-all cursor-pointer shadow-sm"
                    title="Watch Fullscreen"
                    aria-label="Fullscreen Control"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Expanded Interactive Draggable Gold Progress Slider Bar */}
      <div className="flex flex-col items-center justify-center mt-6 space-y-2 w-full px-2 sm:px-6">
        <div 
          ref={progressBarRef}
          onMouseDown={handleProgressMouseDown}
          className="w-full max-w-xl md:max-w-3xl h-2.5 bg-[#1a1a1a] rounded-full relative cursor-pointer border border-[#c5a059]/30 select-none group/line shadow-lg overflow-visible"
          title="Drag handle or click line to navigate"
        >
          {/* Gold Filled Track */}
          <div 
            className="h-full bg-gradient-to-r from-[#c5a059] via-[#e5c158] to-[#c5a059] rounded-full relative transition-all duration-75 shadow-[0_0_12px_rgba(197,160,89,0.8)]"
            style={{ width: `${Math.max(4, Math.min(100, scrollProgress || 4))}%` }}
          >
            {/* Draggable Handle Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4.5 h-4.5 rounded-full bg-white border-2 border-[#c5a059] shadow-xl group-hover/line:scale-125 transition-transform cursor-grab active:cursor-grabbing" />
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-xl md:max-w-3xl text-[10px] uppercase tracking-widest text-[#c5a059] font-light px-1 pt-1">
          <span className="font-semibold text-[#e5c158]">Look 1</span>
          <span className="text-gray-400 text-[9px]">Drag slider handle or swipe cards</span>
          <span className="font-semibold text-[#e5c158]">Look {lookVideosList.length}</span>
        </div>
      </div>

    </div>
  );
};

export default ShopTheLookSlider;
