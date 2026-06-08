import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { Sparkles } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Legacy Template",
  afterLabel = "Avtaran Elite Version"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div id="before-after-outer-id" className="relative select-none rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900 group shadow-lg dark:shadow-2xl">
      <div
        ref={containerRef}
        className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="Redesigned System"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 bg-cyan-500/95 text-slate-950 font-mono text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur shadow-lg">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          {afterLabel}
        </div>

        {/* Before Image (Overlay clipped on position) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-all duration-75"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={beforeImage}
            alt="Legacy System"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
          />
          <div className="absolute top-4 left-4 z-10 bg-slate-950/80 text-slate-350 font-mono text-xs px-2.5 py-1 rounded-full border border-slate-800/80 backdrop-blur">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize transition-all duration-75 group-hover:bg-cyan-400 z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Circle Control Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white group-hover:border-cyan-400 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
            <div className="flex gap-1.5 items-center justify-center">
              <span className="text-[10px] text-white group-hover:text-cyan-400 font-bold">◀</span>
              <span className="text-[10px] text-white group-hover:text-cyan-400 font-bold">▶</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-205 dark:border-slate-800/60 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-300">Drag or click the slider handle</span> to visualize the transformation from legacy clunky setups to refined, converted environments!
      </div>
    </div>
  );
}
