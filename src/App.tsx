import { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  HardHat, 
  Phone, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Clock, 
  ThumbsUp, 
  HelpCircle, 
  ChevronDown,
  User
} from 'lucide-react';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import FeedbackForm from './components/FeedbackForm';
import { Testimonial } from './types';

// Helper function to get correct asset path for GitHub Pages
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/\//g, '/');
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Ирина Ковалева',
    role: 'Владелица квартиры в ЖК «Лесной»',
    text: 'Заказывали капитальный ремонт двухкомнатной квартиры. Очень переживали за сроки и раздувание бюджета, но в итоге остались в полнейшем восторге! Смета была зафиксирована в договоре и не выросла ни на один рубль. Все материалы прораб закупал сам со скидкой, предоставлял отчеты. Закончили даже на 3 дня раньше срока!',
    rating: 5,
    date: '14 мая 2026 г.'
  },
  {
    id: 'test-2',
    author: 'Михаил Резник',
    role: 'Владелец апартаментов в Москва-Сити',
    text: 'Нам нужен был сложный дизайнерский ремонт по готовому проекту. Мастера из этой компании — настоящие профессионалы. Идеально выполнили заусовку керамогранита под 45 градусов в санузле, смонтировали теневые профили для натяжных потолков и скрытую подсветку. Качество стыков материалов — ювелирное. Однозначно рекомендую!',
    rating: 5,
    date: '28 апреля 2026 г.'
  },
  {
    id: 'test-3',
    author: 'Дмитрий Володин',
    role: 'Владелец студии на Волгоградке',
    text: 'Заказывал косметический ремонт студии под сдачу в аренду. Бюджет был сильно ограничен. Мне предложили отличный эконом-вариант: подобрали очень прочные обои под покраску, износостойкий линолеум и быстро привели квартиру в товарный вид за 12 дней! Работали слаженно, мусор за собой полностью убрали.',
    rating: 5,
    date: '02 июня 2026 г.'
  }
];

const FAQS = [
  {
    q: 'Сколько стоит выезд замерщика и составление сметы?',
    a: 'Это абсолютно бесплатно и ни к чему вас не обязывает. Наш инженер приедет со специальным высокоточным оборудованием, произведет замеры, обсудит пожелания и составит детальную смету на работы и черновые материалы.'
  },
  {
    q: 'Изменится ли стоимость ремонта в процессе?',
    a: 'Нет. Финальная стоимость фиксируется в договоре перед началом работ. Мы берем все риски изменения цен на себя. Стоимость может измениться только в случае, если вы сами решите добавить новые виды работ в процессе.'
  },
  {
    q: 'Предоставляете ли вы гарантию на выполненные работы?',
    a: 'Да, мы предоставляем официальную письменную гарантию 3 года на все отделочные, сантехнические и электромонтажные работы. Если в течение этого времени выявится дефект, мы устраним его за свой счет.'
  },
  {
    q: 'Кто закупает строительные материалы?',
    a: 'По вашему желанию мы можем полностью взять закупку, доставку и подъем материалов на себя. Мы работаем напрямую с крупными оптовыми поставщиками, поэтому материалы обходятся нашим клиентам на 15–20% дешевле розничных магазинов.'
  },
  {
    q: 'Как я смогу контролировать ход ремонта?',
    a: 'Вам не придется постоянно ездить на объект. Каждые 3–4 дня прораб отправляет детальный фото- и видеоотчет в удобный вам мессенджер (WhatsApp, Telegram), где комментирует каждый выполненный этап работы.'
  }
];

export default function App() {
  const [selectedEstimate, setSelectedEstimate] = useState<{
    area: number;
    roomCount: number;
    serviceType: 'cosmetic' | 'standard' | 'premium-design';
    estimatedCost: number;
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleEstimateReceived = (estimate: {
    area: number;
    roomCount: number;
    serviceType: 'cosmetic' | 'standard' | 'premium-design';
    estimatedCost: number;
  }) => {
    setSelectedEstimate(estimate);
    // Smooth scroll to feedback form
    document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearEstimate = () => {
    setSelectedEstimate(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img 
                src={getAssetPath("logo.avif")} 
                alt="SREDA" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative">
              <span className="font-display font-black text-3xl tracking-tighter text-slate-900 block leading-none relative">
                <span className="relative z-10">SRE</span><span className="text-indigo-600 relative z-10">DA</span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors -z-0"></span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 block uppercase mt-1 ml-0.5">
                строительная компания
              </span>
            </div>
          </a>

          {/* Nav Links - Desktop only */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-semibold text-slate-600">
            <a href="#before-after-section" className="hover:text-slate-900 transition-colors">Портфолио До/После</a>
            <a href="#services-section" className="hover:text-slate-900 transition-colors">Цены</a>
            <a href="#calculator-section" className="hover:text-slate-900 transition-colors">Калькулятор</a>
            <a href="#portfolio-section" className="hover:text-slate-900 transition-colors">Проекты</a>
            <a href="#reviews-section" className="hover:text-slate-900 transition-colors">Отзывы</a>
          </nav>

          {/* Contact Details */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Звоните ежедневно:</span>
              <a href="tel:+79935243862" className="font-mono font-bold text-slate-900 hover:text-indigo-600 transition-colors text-sm">
                +7 (993) 524-38-62
              </a>
            </div>
            <a 
              href="#feedback-section" 
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 rounded-lg text-xs font-sans font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-100"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Заказать замер</span>
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-white pt-6 pb-20 md:pt-10 md:pb-24 overflow-hidden">
        {/* Abstract decorative graphic elements in background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/50 rounded-l-full -z-10 blur-xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-none">
              Профессиональный Ремонт Квартир в Москве <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-700">под ключ</span>
            </h1>

            <p className="text-lg text-slate-600 font-sans leading-relaxed max-w-xl">
              Зафиксируем честную цену в официальном договоре. Контроль прораба на каждом этапе, поэтапная оплата по факту сдачи работ и письменная гарантия 3 года.
            </p>

            {/* Quick Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: 'Письменная гарантия', val: '3 года' },
                { label: 'Опыт работы команды', val: '12+ лет' },
                { label: 'Сданных квартир', val: '350+' },
                { label: 'Предоплата за работы', val: '0%' }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex-1 shadow-sm">
                  <span className="block text-xl font-mono font-bold text-slate-900">{metric.val}</span>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#calculator-section" 
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-sans font-bold rounded-2xl px-8 py-4 text-center tracking-wide transition-all duration-300 shadow-lg shadow-indigo-100 cursor-pointer flex items-center justify-center gap-2"
              >
                Рассчитать стоимость ремонта
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#before-after-section" 
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-sans font-bold rounded-2xl px-8 py-4 text-center transition cursor-pointer flex items-center justify-center gap-2"
              >
                Посмотреть результаты
              </a>
            </div>

          </div>

          {/* Right Image/Feature Panel */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <img
                src={getAssetPath("hero-image.jpg")}
                alt="Красивый готовый интерьер квартиры"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid Badge */}
              <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-xs text-white p-4 rounded-2xl border border-slate-700/50 shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Страховка</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Все работы застрахованы на <span className="text-white font-bold">5 000 000 ₽</span> на случай непредвиденных обстоятельств.
                </p>
              </div>

              {/* Overlaid Bottom Status Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
                <div className="bg-indigo-100 text-indigo-800 p-2 rounded-lg flex-shrink-0">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Прямо сейчас</span>
                  <span className="text-xs font-sans font-bold text-slate-900 block leading-tight">Ремонтируем 14 квартир в Москве</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CORE BEFORE/AFTER INTERACTIVE SLIDER */}
      <BeforeAfterSlider />

      {/* DETAILED SERVICES & ESTIMATED COST LIST */}
      <section id="services-section" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
              Тарифные планы
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
              Виды Ремонта И Цены
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
              Мы предлагаем три основных класса ремонта в зависимости от ваших целей, состояния квартиры и планируемого бюджета.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1: Cosmetic */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <span className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">01 // Быстро и свежо</span>
                <h3 className="text-2xl font-display font-bold text-slate-900 mt-2">Косметический</h3>
                <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
                  Идеальный вариант для обновления внешнего вида перед сдачей в аренду или при покупке квартиры в хорошем состоянии.
                </p>

                <div className="my-6 py-4 border-y border-slate-200">
                  <span className="text-xs text-slate-400 block font-sans">Стоимость работ:</span>
                  <span className="text-3xl font-mono font-extrabold text-slate-900">от 8 500 ₽</span>
                  <span className="text-slate-500 text-sm font-sans font-medium"> / м²</span>
                </div>

                <ul className="space-y-3">
                  {[
                    'Демонтаж старых обоев и напольных покрытий',
                    'Частичное выравнивание стен (визуальное)',
                    'Поклейка флизелиновых или бумажных обоев',
                    'Укладка ламината, кварцвинила или линолеума',
                    'Монтаж новых пластиковых плинтусов',
                    'Замена розеток и выключателей (без переноса)'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a 
                  href="#calculator-section" 
                  className="w-full py-3 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white rounded-xl text-center text-xs font-sans font-bold transition-all block cursor-pointer"
                >
                  Выбрать косметический
                </a>
              </div>
            </div>

            {/* Service 2: Capital/Standard (BEST CHOICE) */}
            <div className="bg-slate-900 text-white border-2 border-indigo-500 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full font-sans font-extrabold text-[10px] tracking-wider uppercase shadow-md">
                Популярный выбор
              </span>

              <div>
                <span className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">02 // С нуля под ключ</span>
                <h3 className="text-2xl font-display font-bold text-white mt-2">Капитальный ремонт</h3>
                <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
                  Полноценный комплексный ремонт новостройки или вторичного жилья с заменой всех инженерных сетей и выравниванием геометрии.
                </p>

                <div className="my-6 py-4 border-y border-slate-800">
                  <span className="text-xs text-slate-400 block font-sans">Стоимость работ:</span>
                  <span className="text-3xl font-mono font-extrabold text-indigo-400">от 16 000 ₽</span>
                  <span className="text-slate-300 text-sm font-sans font-medium"> / м²</span>
                </div>

                <ul className="space-y-3">
                  {[
                    'Возведение перегородок и зонирование комнат',
                    'Высококачественная штукатурка стен под маяк',
                    'Заливка ровной полусухой или мокрой стяжки пола',
                    'Полная прокладка медной силовой проводки',
                    'Разводка труб водоснабжения и скрытая канализация',
                    'Укладка плитки/керамогранита в санузле',
                    'Финишная шпаклевка и покраска/поклейка стен'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a 
                  href="#calculator-section" 
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-center text-xs font-sans font-bold transition-all block cursor-pointer shadow-lg shadow-indigo-500/10"
                >
                  Выбрать капитальный
                </a>
              </div>
            </div>

            {/* Service 3: Premium/Design */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <span className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">03 // Элитный дизайн</span>
                <h3 className="text-2xl font-display font-bold text-slate-900 mt-2">Дизайнерский / Премиум</h3>
                <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
                  Создание эксклюзивного интерьера по индивидуальному дизайн-проекту с авторским надзором и премиальными материалами отделки.
                </p>

                <div className="my-6 py-4 border-y border-slate-200">
                  <span className="text-xs text-slate-400 block font-sans">Стоимость работ:</span>
                  <span className="text-3xl font-mono font-extrabold text-slate-900">от 28 000 ₽</span>
                  <span className="text-slate-500 text-sm font-sans font-medium"> / м²</span>
                </div>

                <ul className="space-y-3">
                  {[
                    'Разработка индивидуального 3D дизайн-проекта',
                    'Монтаж сложных многоуровневых гипсокартоновых потолков',
                    'Монтаж скрытого трекового и теневого освещения',
                    'Укладка крупноформатного керамогранита с запилом',
                    'Нанесение элитных декоративных штукатурок и красок',
                    'Интеграция систем «Умный дом» и вентиляции',
                    'Авторский надзор ведущего архитектора 24/7'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a 
                  href="#calculator-section" 
                  className="w-full py-3 border border-slate-300 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-center text-xs font-sans font-bold transition-all block cursor-pointer"
                >
                  Выбрать премиум
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CALCULATOR COMPONENT */}
      <Calculator onEstimateSubmit={handleEstimateReceived} />

      {/* PORTFOLIO GRID SHOWCASE */}
      <Portfolio />

      {/* CLIENT REVIEWS / TESTIMONIALS */}
      <section id="reviews-section" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
              Отзывы клиентов
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
              Что Говорят О Нас Довольные Жильцы
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
              Мы гордимся тем, что более 40% наших новых клиентов приходят по рекомендации друзей и родственников.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-indigo-600">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-indigo-600" />
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-xs text-slate-600 font-sans leading-relaxed italic mb-6">
                    "{test.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <span className="font-sans font-bold text-xs text-slate-900 block leading-tight">
                      {test.author}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                      {test.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono ml-auto">
                    {test.date.split(' ')[0]} {test.date.split(' ')[1]}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Verification Badge */}
          <div className="mt-12 flex justify-center items-center gap-2 text-xs text-slate-500 font-sans">
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
            <span>Все отзывы проверены и подтверждены актами приемки-передачи выполненных работ.</span>
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
              Частые вопросы
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Отвечаем На Ваши Вопросы
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-300"
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-sans font-bold text-slate-900 text-sm md:text-base flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-indigo-600' : ''
                    }`} 
                  />
                </button>

                {/* Body Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === idx ? 'max-h-[200px] border-t border-slate-200/60 bg-white' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT FEEDBACK FORM */}
      <FeedbackForm initialEstimate={selectedEstimate} onClearEstimate={clearEstimate} />

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Company identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
                <img 
                  src={getAssetPath("logo.avif")} 
                  alt="SREDA" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative">
                <span className="font-display font-black text-2xl tracking-tighter text-white block leading-none relative">
                  <span className="relative z-10">SRE</span><span className="text-indigo-400 relative z-10">DA</span>
                  <span className="absolute -bottom-0.5 left-0 w-full h-1.5 bg-indigo-500/20 -z-0"></span>
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              Профессиональные ремонтно-отделочные работы в жилых и коммерческих помещениях на территории Москвы и Московской области. Строго соблюдаем СНиП, ГОСТ и согласованные сроки.
            </p>

            <div className="text-[10px] text-slate-500 font-mono">
              © {new Date().getFullYear()} ООО «СРЕДА» (SREDA). Все права защищены.
            </div>
          </div>

          {/* Navigation link tags */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Разделы сайта:</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li><a href="#before-after-section" className="hover:text-indigo-400 transition-colors">Слайдер До / После</a></li>
              <li><a href="#services-section" className="hover:text-indigo-400 transition-colors">Тарифы и стоимость</a></li>
              <li><a href="#calculator-section" className="hover:text-indigo-400 transition-colors">Калькулятор сметы</a></li>
              <li><a href="#portfolio-section" className="hover:text-indigo-400 transition-colors">Выполненные проекты</a></li>
              <li><a href="#feedback-section" className="hover:text-indigo-400 transition-colors">Бесплатный замер</a></li>
            </ul>
          </div>

          {/* Legal / Contacts box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Контакты и адрес:</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <span className="block text-slate-500">Телефон для справок:</span>
                <a href="tel:+79935243862" className="font-mono font-bold text-white hover:text-indigo-400 transition-colors">
                  +7 (993) 524-38-62
                </a>
              </li>
              <li>
                <span className="block text-slate-500">Офис в Москве:</span>
                <span className="text-white font-medium">г. Москва, ул. Космонавтов, д. 18, оф. 402</span>
              </li>
              <li>
                <span className="block text-slate-500">Режим работы:</span>
                <span className="text-white font-medium">Ежедневно с 09:00 до 21:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 border-t border-slate-900/80 text-[10px] text-slate-500 font-sans text-center leading-relaxed">
          * Представленные на сайте расчеты стоимости ремонта носят исключительно ознакомительный характер и не являются публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Точная стоимость работ и материалов определяется только после выезда инженера-замерщика и составления официальной сметы.
        </div>

      </footer>

    </div>
  );
}
