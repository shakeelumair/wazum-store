import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AnnouncementBar = () => {
  const { siteConfig } = useStore();

  if (siteConfig?.showAnnouncementBar === false) {
    return null;
  }

  const rawMessages = siteConfig?.announcementText 
    ? siteConfig.announcementText.split('|').map(m => m.trim())
    : [
        "Easy exchange policy",
        "Free shipping on orders above Rs. 10,000",
        "300 dc advance required to confirm your order"
      ];

  const messages = rawMessages.length > 0 ? rawMessages : ["Wazum Store Luxury Collection"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const triggerChange = (newIndex) => {
    setIsBlinking(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsBlinking(false);
    }, 350);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + messages.length) % messages.length;
    triggerChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % messages.length;
    triggerChange(nextIdx);
  };

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIdx) => (prevIdx + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full bg-[#111111] py-2.5 md:py-3.5 flex justify-center items-center relative text-xs md:text-sm select-none border-b border-[#c5a059]/30 min-h-[44px]">
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-[40px] text-[#c5a059] hover:text-white transition-colors p-1 cursor-pointer" 
        aria-label="Previous message"
      >
        <ChevronLeft size={16} strokeWidth={1.5} className="md:w-5 md:h-5" />
      </button>
      
      <span 
        className={`text-[#e5c158] font-light tracking-wider md:tracking-widest text-center px-8 max-w-[80vw] truncate transition-all duration-400 ease-in-out ${
          isBlinking ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {messages[currentIndex]}
      </span>

      <button 
        onClick={handleNext}
        className="absolute right-2 md:right-[40px] text-[#c5a059] hover:text-white transition-colors p-1 cursor-pointer" 
        aria-label="Next message"
      >
        <ChevronRight size={16} strokeWidth={1.5} className="md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
