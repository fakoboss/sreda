import { useState } from 'react';
import { PortfolioItem } from '../types';
import { Eye, Clock, Ruler, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Helper function to get correct asset path for GitHub Pages
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/\//g, '/');
};

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'proj-1',
    title: 'Евротрешка в ЖК «Скандинавия»',
    description: 'Комплексный дизайнерский ремонт под ключ для молодой семьи. Особенность проекта — бесшовное зонирование раздвижными перегородками и скрытые двери.',
    category: 'full-apartment',
    beforeImage: getAssetPath('scandinavia-before.png'),
    afterImage: getAssetPath('scandinavia-after.png'),
    duration: '65 дней',
    cost: 1680000,
    area: 72,
    location: 'Москва, ул. Скандинавский бульвар',
    servicesList: [
      'Возведение перегородок из пазогребневых плит',
      'Полная механизированная штукатурка стен по маякам',
      'Прокладка скрытой электропроводки (74 точки)',
      'Укладка кварцвиниловой плитки единым контуром',
      'Монтаж теневого натяжного потолка с подсветкой',
      'Монтаж скрытых дверей Invisible'
    ]
  },
  {
    id: 'proj-2',
    title: 'Кухня-гостиная на Патриарших',
    description: 'Интеграция кухонной зоны в жилую комнату с премиальной шумоизоляцией пола и стен. Классические молдинги на стенах в сочетании с современными материалами.',
    category: 'kitchen',
    beforeImage: getAssetPath('patriarshie-before.png'),
    afterImage: getAssetPath('patriarshie-after.png'),
    duration: '28 дней',
    cost: 720000,
    area: 28,
    location: 'Москва, Малый Козихинский пер.',
    servicesList: [
      'Монтаж звукоизоляционных панелей Soundguard',
      'Прокладка отдельных силовых линий для бытовой техники',
      'Укладка влагостойкого ламината 33 класса',
      'Выравнивание углов под 90° для установки кухонной мебели',
      'Монтаж декоративной гипсовой лепнины на стены'
    ]
  },
  {
    id: 'proj-3',
    title: 'Мастер-санузел в ЖК «Резиденции»',
    description: 'Ванная комната премиум-класса с отдельно стоящей ванной и подвесным унитазом с инсталляцией. Установлена система защиты от протечек воды.',
    category: 'bathroom',
    beforeImage: getAssetPath('residence-before.png'),
    afterImage: getAssetPath('residence-after.png'),
    duration: '16 дней',
    cost: 450000,
    area: 8.5,
    location: 'Москва, Бережковская набережная',
    servicesList: [
      'Обмазочная двухслойная гидроизоляция общая и мокрых зон',
      'Скрытый монтаж коллекторного узла Far',
      'Установка системы Neptun против затопления',
      'Резка керамогранита под угол 45 градусов (заусовка)',
      'Монтаж сантехники из нержавеющей стали с PVD-покрытием'
    ]
  },
  {
    id: 'proj-4',
    title: 'Индустриальный лофт в Сокольниках',
    description: 'Дизайнерский ремонт в стиле лофт с сохранением фактуры оригинального кирпича, декоративной штукатуркой под бетон и открытой дизайнерской ретро-проводкой.',
    category: 'living-room',
    beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    afterImage: getAssetPath('loft-after.png'),
    duration: '42 дня',
    cost: 980000,
    area: 45,
    location: 'Москва, ул. Стромынка',
    servicesList: [
      'Очистка и защитное лакирование оригинальной кирпичной кладки',
      'Нанесение декоративной штукатурки с эффектом арт-бетона',
      'Укладка массивной дубовой доски на полиуретановый клей',
      'Монтаж стильного накладного трекового освещения (черный мат)',
      'Монтаж радиаторов отопления Arbonia трубчатого типа'
    ]
  },
  {
    id: 'proj-5',
    title: 'Светлая студия в ЖК «Метрополия»',
    description: 'Оптимизация пространства студии для сдачи в аренду. Зонирование мебелью и стеклянной перегородкой. Бюджетный, но износостойкий ремонт.',
    category: 'full-apartment',
    beforeImage: 'https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=800&q=80',
    afterImage: getAssetPath('metropolia-after.png'),
    duration: '25 дней',
    cost: 590000,
    area: 31,
    location: 'Москва, Волгоградский проспект',
    servicesList: [
      'Обои под покраску (антивандальный флизелин)',
      'Покраска стен моющейся краской Tikkurila в 2 слоя',
      'Укладка износостойкого коммерческого линолеума под паркет',
      'Комплексная разводка освещения на 4 зоны',
      'Монтаж подвесных светильников над барной стойкой'
    ]
  },
  {
    id: 'proj-6',
    title: 'Гостиная в неоклассическом стиле',
    description: 'Капитальный ремонт гостиной в историческом центре Москвы. Сохранение лепного декора, замена напольных балок, укладка классической паркетной «елочки».',
    category: 'living-room',
    beforeImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
    afterImage: getAssetPath('classic-after.png'),
    duration: '45 дней',
    cost: 1150000,
    area: 36,
    location: 'Москва, Пречистенский переулок',
    servicesList: [
      'Реставрация и укрепление потолочной лепнины',
      'Усиление лаг пола и укладка фанерного основания',
      'Укладка штучного дубового паркета «французская елка»',
      'Покрытие паркета износостойким матовым лаком Bona в 3 слоя',
      'Шпаклевка и высококачественная покраска стен под боковое освещение'
    ]
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'living-room' | 'kitchen' | 'bathroom' | 'full-apartment'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredItems = PORTFOLIO_ITEMS.filter(
    item => filter === 'all' || item.category === filter
  );

  return (
    <section id="portfolio-section" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
              Наши работы
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
              Галерея Проектов
            </h2>
            <p className="text-slate-500 font-sans mt-2 max-w-xl">
              Посмотрите на квартиры наших довольных клиентов. Каждый ремонт уникален и выполнен строго по ГОСТам и СНиПам.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Все' },
              { id: 'full-apartment', label: 'Квартиры' },
              { id: 'living-room', label: 'Гостиные' },
              { id: 'kitchen', label: 'Кухни' },
              { id: 'bathroom', label: 'Ванные' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-300 cursor-pointer ${
                  filter === btn.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Image Wrap */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-slate-900/80 text-white font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs uppercase">
                    {item.category === 'full-apartment' ? 'Квартира' : 
                     item.category === 'living-room' ? 'Гостиная' : 
                     item.category === 'kitchen' ? 'Кухня' : 'Ванная'}
                  </span>

                  {/* Quick stats overlay bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-4 flex justify-between text-white font-mono text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-indigo-400" /> {item.area} м²
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> {item.duration}
                    </span>
                  </div>

                  {/* Hover Eye Button */}
                  <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(item)}
                      className="bg-white/95 text-slate-900 p-3.5 rounded-full shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-indigo-600 font-mono text-[11px] font-bold block mb-1">
                      {item.location.split(',')[0]}
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer item: Cost & More Details Button */}
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">Смета проекта:</span>
                      <span className="text-base font-mono font-bold text-slate-950">
                        {item.cost.toLocaleString()} ₽
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(item)}
                      className="text-xs font-sans font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Смотреть работы
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal / Dialog for Project details */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs cursor-pointer"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl relative z-10 max-h-[90vh] overflow-y-auto"
              >
                {/* Header Top image banner */}
                <div className="relative h-64 md:h-80 bg-slate-100">
                  <img
                    src={selectedProject.afterImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                  
                  {/* Location & Title */}
                  <div className="absolute bottom-6 left-6 md:left-8 text-white right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-indigo-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Проект завершен
                      </span>
                      <span className="text-slate-300 font-mono text-xs flex items-center gap-1">
                        <Landmark className="w-3.5 h-3.5" /> {selectedProject.location}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md border border-white/10 transition cursor-pointer"
                    aria-label="Закрыть"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Description & Works */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                        О проекте:
                      </h4>
                      <p className="text-slate-600 font-sans text-sm leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Work list */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Выполненные работы:
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.servicesList.map((srv, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-sans leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{srv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Key details stats box */}
                  <div className="md:col-span-5">
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-2">
                        Характеристики сметы:
                      </h4>

                      {/* Area */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-sans flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-slate-400" /> Общая площадь:
                        </span>
                        <span className="font-mono font-semibold text-slate-900">{selectedProject.area} м²</span>
                      </div>

                      {/* Duration */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-sans flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" /> Срок выполнения:
                        </span>
                        <span className="font-mono font-semibold text-slate-900">{selectedProject.duration}</span>
                      </div>

                      {/* Total Cost */}
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60">
                        <span className="text-slate-500 font-sans font-bold">Итоговая стоимость:</span>
                        <span className="font-mono font-bold text-indigo-600 text-base">
                          {selectedProject.cost.toLocaleString()} ₽
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 font-sans leading-relaxed pt-2">
                        * Все материалы закупались напрямую у партнеров-производителей по дилерским скидкам (экономия клиента ~ 15%).
                      </div>

                      {/* Call-to-action button inside modal */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProject(null);
                          // Scroll to contact form
                          document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs rounded-xl transition cursor-pointer text-center block"
                      >
                        Хочу такой же ремонт
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
