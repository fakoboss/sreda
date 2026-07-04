import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, KeyboardEvent, CSSProperties } from 'react';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SliderData {
  id: string;
  title: string;
  before: string;
  after: string;
  desc: string;
  tags: string[];
  details: { label: string; value: string }[];
}

const SLIDERS: SliderData[] = [
  {
    id: 'living-room',
    title: 'Гостиная в ЖК «Маяк»',
    desc: 'Капитальный ремонт гостиной: замена всей проводки, выравнивание стен, укладка инженерной доски и монтаж дизайнерского трекового освещения.',
    before: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80', // Concrete raw structure
    after: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', // Beautiful modern living room
    tags: ['Скандинавский стиль', 'Площадь: 24 м²', 'Срок: 18 дней'],
    details: [
      { label: 'Инженерная доска', value: 'дуб натур, премиум гидроизоляция' },
      { label: 'Стены', value: 'финишная шпаклевка, износостойкая краска' }
    ]
  },
  {
    id: 'bathroom',
    title: 'Ванная комната в сталинке',
    desc: 'Полный демонтаж старой сантехники и перегородок. Гидроизоляция, скрытая разводка труб REHAU, укладка керамогранита под мрамор и монтаж сантехники.',
    before: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1620626011160-9928f1b9b630?auto=format&fit=crop&w=1200&q=80',
    tags: ['Мраморный дизайн', 'Площадь: 6.5 м²', 'Срок: 12 дней'],
    details: [
      { label: 'Материал', value: 'керамогранит под белый мрамор' },
      { label: 'Разводка', value: 'трубы REHAU, коллекторная группа' }
    ]
  },
  {
    id: 'kitchen',
    title: 'Кухня-столовая',
    desc: 'Перепланировка, зонирование пространства, укладка керамогранита с подогревом, монтаж кухонного гарнитура с интегрированной техникой.',
    before: 'https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Минимализм', 'Площадь: 18 м²', 'Срок: 14 дней'],
    details: [
      { label: 'Пол', value: 'керамогранит с подогревом (теплый пол)' },
      { label: 'Гарнитур', value: 'интегрированная техника, матовые фасады' }
    ]
  }
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('living-room');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSlider = SLIDERS.find(s => s.id === activeTab) || SLIDERS[0];

  // Reset position slightly when switching tabs for a nice visual effect
  useEffect(() => {
    setSliderPosition(50);
  }, [activeTab]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  // Keyboard navigation for slider accessibility
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(100, prev + 5));
    }
  };

  return (
    <section id="before-after-section" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
            Интерактивное Портфолио
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Результаты До / После
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Мы не просто ремонтируем, мы преображаем пространства. Подвигайте ползунок влево и вправо, чтобы в реальном времени оценить качество нашей работы.
          </p>
        </div>

        {/* Room Tab Selectors */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
          {SLIDERS.map((slider) => (
            <button
              key={slider.id}
              onClick={() => setActiveTab(slider.id)}
              className={`px-6 py-3 rounded-full font-sans font-medium text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                activeTab === slider.id
                  ? 'bg-slate-900 text-white font-semibold ring-2 ring-slate-900 ring-offset-2'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {slider.title.split(' ')[0]} {slider.title.includes('комната') ? 'комната' : ''}
            </button>
          ))}
        </div>

        {/* Dynamic content card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl shadow-slate-100">
          
          {/* Draggable Slider Container */}
          <div className="lg:col-span-7 w-full">
            <div 
              ref={containerRef}
              className="relative aspect-video w-full rounded-2xl overflow-hidden select-none shadow-lg bg-slate-200 cursor-ew-resize border border-slate-200"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              role="slider"
              aria-valuenow={sliderPosition}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              style={{ '--slider-pos': `${sliderPosition}%` } as CSSProperties}
            >
              {/* After image (Base background) */}
              <img
                src={activeSlider.after}
                alt="После ремонта"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Label "После" */}
              <div className="absolute right-4 bottom-4 z-10 bg-emerald-500/90 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-xs tracking-wider shadow-md pointer-events-none uppercase">
                После ремонта
              </div>

              {/* Before image (Overlay clipped by clip-path) */}
              <div 
                className="absolute inset-0 w-full h-full clip-before overflow-hidden pointer-events-none"
              >
                <img
                  src={activeSlider.before}
                  alt="До ремонта"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Label "До" */}
              <div 
                className="absolute left-4 bottom-4 z-10 bg-red-600/90 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-xs tracking-wider shadow-md pointer-events-none uppercase transition-opacity duration-300"
                style={{ opacity: sliderPosition < 15 ? 0 : 1 }}
              >
                Черновой этап / До
              </div>

              {/* Centered Guide Tooltip (shows initially) */}
              <AnimatePresence>
                {sliderPosition === 50 && !isDragging && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-xs pointer-events-none z-20"
                  >
                    <div className="bg-white/95 text-slate-900 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200">
                      <ArrowLeftRight className="w-5 h-5 text-indigo-600 animate-pulse" />
                      <span className="font-sans text-xs font-semibold tracking-wide">
                        Потяните в стороны
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-[4px] bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 text-indigo-600 z-40">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Details / Text Info Container */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              Проект в деталях
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">
              {activeSlider.title}
            </h3>
            
            <p className="text-slate-600 font-sans leading-relaxed mb-6">
              {activeSlider.desc}
            </p>

            {/* Tags/Details Row */}
            <div className="flex flex-col gap-3 mb-6">
              {activeSlider.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl font-sans">
                  <span className="font-semibold text-slate-900">{detail.label}:</span> {detail.value}
                </div>
              ))}
            </div>

            {/* Badges list */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {activeSlider.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-indigo-50 text-indigo-800 border border-indigo-100 rounded-lg px-3 py-1 text-xs font-mono font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Small Tip */}
        <div className="mt-8 flex justify-center items-center gap-2 text-slate-500 text-xs font-sans">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Вы можете нажимать клавиши стрелок <span className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200">←</span> и <span className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200">→</span> на клавиатуре, выбрав ползунок</span>
        </div>

      </div>
    </section>
  );
}
