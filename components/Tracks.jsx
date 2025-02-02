import React, { useState, useEffect } from "react";

const Tracks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 🔹 Added state to track hover status
  const items = [
    { id: 1, src: "/oi.png", alt: "OI", href: "/oi" },
    { id: 2, src: "/healthcare.png", alt: "Healthcare", href: "/healthcare" },
    { id: 3, src: "/edtech.png", alt: "Edtech", href: "/edtech" },
    { id: 4, src: "/aiml.png", alt: "AI/ML", href: "/aiml" },
    { id: 5, src: "/agritech.png", alt: "Agritech", href: "/agritech" },
    { id: 6, src: "/fintech.png", alt: "Fintech", href: "/fintech" }
  ];

  const [intervalTime, setIntervalTime] = useState(1000); 

  useEffect(() => {
    if (isPaused) return; // 🔹 Stops the interval when hovered

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items.length, intervalTime, isPaused]); // 🔹 Added isPaused as a dependency

  const getVisibleItems = () => {
    const totalItems = items.length;
    const visibleItems = [];
    
    for (let i = -3; i <= 3; i++) {
      const index = (activeIndex + i + totalItems) % totalItems;
      visibleItems.push({
        ...items[index],
        position: i
      });
    }
    return visibleItems;
  };

  const getTransformStyles = (position) => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    const radius = screenWidth <= 640 ? 300 : screenWidth <= 1024 ? 400 : 500;
    const angleStep = 40;
    const angle = position * angleStep;
    
    const x = Math.sin(angle * (Math.PI / 180)) * radius;
    const z = (Math.cos(angle * (Math.PI / 180)) * radius) - radius;
    
    const scale = (radius + z) / radius;
    const opacity = scale * 0.8 + 0.2;
    
    return {
      transform: `
        translateX(${x}px)
        translateZ(${z}px)
        rotateY(${-angle}deg)
        scale(${scale})
      `,
      zIndex: Math.round(scale * 100),
      opacity: opacity,
      visibility: 'visible',
      transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="bg-[#1e002e] ">
      <div className="flex justify-center relative text-[60px] sm:text-[120px] md:text-[160px] xl:text-[280px] font-extrabold text-[#6B5E77] md:pl-20 md:pr-20">
        DOMAINS
        <div className="flex justify-center absolute text-[30px] sm:text-[60px] md:text-[90px] xl:text-[140px] bottom-0 font-extrabold text-[#FCF961]">
          DOMAINS
        </div>
      </div>
      <div className="relative bg-[#1E002E] flex items-center justify-center overflow-hidden carousel-container perspective-1200 sm:h-[40vh] md:h-[70vh] ">
        <div className="relative w-full max-w-[90vw] mt-[0px] lg:max-w-[1600px] lg:mt-[50px] md:mt-[50px]">
          <div className="relative flex justify-center items-center w-full lg:h-[60vh] h-[40vh] max-h-[600px] transform-gpu preserve-3d">
            {getVisibleItems().map(({ id, src, alt, href, position }) => {
              const styles = getTransformStyles(position);
              return (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => e.preventDefault()}
                  className="absolute transform-gpu backface-hidden"
                  style={styles}
                  onMouseEnter={() => setIsPaused(true)} // 🔹 Pause on hover
                  onMouseLeave={() => setIsPaused(false)} // 🔹 Resume when hover ends
                >
                  <div className={`relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] transition-all duration-500`}>
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      draggable="false"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
