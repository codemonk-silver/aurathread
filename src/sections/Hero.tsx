import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

class CinematicTextReveal {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  text: string;
  mouse: { x: number; y: number };
  bgImage: HTMLImageElement;
  width: number;
  height: number;
  animationId: number | null;
  boundResize: () => void;
  boundDraw: () => void;
  boundMouseMove: (e: MouseEvent) => void;

  constructor(canvasId: string, imageSrc: string, text: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.text = text;
    this.mouse = { x: -5000, y: -5000 };
    this.width = 0;
    this.height = 0;
    this.animationId = null;

    this.boundResize = this.resize.bind(this);
    this.boundDraw = this.draw.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);

    this.bgImage = new Image();
    this.bgImage.src = imageSrc;
    this.bgImage.onload = () => {
      this.resize();
      this.animationId = requestAnimationFrame(this.boundDraw);
    };

    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse = { x: -5000, y: -5000 };
    });
    window.addEventListener('resize', this.boundResize);
  }

  onMouseMove(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = (e.clientX - rect.left) * window.devicePixelRatio;
    this.mouse.y = (e.clientY - rect.top) * window.devicePixelRatio;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  draw() {
    const w = this.width / window.devicePixelRatio;
    const h = this.height / window.devicePixelRatio;

    this.ctx.clearRect(0, 0, w, h);

    // Draw darkened background
    this.ctx.drawImage(this.bgImage, 0, 0, w, h);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    this.ctx.fillRect(0, 0, w, h);

    // Cut text through the dark overlay
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.font = `500 ${Math.min(w * 0.12, 140)}px "Cormorant Garamond", serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.text, w / 2, h / 2);

    // Create soft mouse brush
    const mx = this.mouse.x / window.devicePixelRatio;
    const my = this.mouse.y / window.devicePixelRatio;
    const gradient = this.ctx.createRadialGradient(mx, my, 0, mx, my, 150);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, w, h);

    // Restore
    this.ctx.globalCompositeOperation = 'source-over';

    this.animationId = requestAnimationFrame(this.boundDraw);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.canvas.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('resize', this.boundResize);
  }
}

export default function Hero() {
  const canvasRef = useRef<CinematicTextReveal | null>(null);

  useEffect(() => {
    canvasRef.current = new CinematicTextReveal(
      'hero-canvas',
      '/hero-bg.jpg',
      'STYLE DIRECT\nTO YOUR CHAT'
    );

    return () => {
      canvasRef.current?.destroy();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Canvas for cinematic text reveal */}
      <canvas
        id="hero-canvas"
        className="absolute inset-0 w-full h-full hero-canvas"
      />

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 z-10">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-4 h-4 text-white/60" />
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 scroll-line" />
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[2px] text-white/50 font-medium rotate-0 origin-left">
          Scroll to discover
        </span>
      </div>

      {/* WhatsApp CTA on hero */}
      <div className="absolute bottom-8 right-8 z-10">
        <a
          href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-pill text-xs uppercase tracking-[1px] border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          Start Chatting
        </a>
      </div>
    </section>
  );
}
