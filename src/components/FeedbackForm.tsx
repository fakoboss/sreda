import { useState, useEffect, FormEvent } from 'react';
import { ConsultationRequest } from '../types';
import { Send, PhoneCall, CheckCircle2, Trash2, Calendar, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeedbackFormProps {
  initialEstimate: {
    area: number;
    roomCount: number;
    serviceType: 'cosmetic' | 'standard' | 'premium-design';
    estimatedCost: number;
  } | null;
  onClearEstimate: () => void;
}

export default function FeedbackForm({ initialEstimate, onClearEstimate }: FeedbackFormProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [area, setArea] = useState<number>(55);
  const [roomCount, setRoomCount] = useState<number>(2);
  const [serviceType, setServiceType] = useState<'cosmetic' | 'standard' | 'premium-design'>('standard');
  const [budget, setBudget] = useState<number>(0);

  const [submittedRequests, setSubmittedRequests] = useState<ConsultationRequest[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Sync initial estimate from calculator when it changes
  useEffect(() => {
    if (initialEstimate) {
      setArea(initialEstimate.area);
      setRoomCount(initialEstimate.roomCount);
      setServiceType(initialEstimate.serviceType);
      setBudget(initialEstimate.estimatedCost);
    }
  }, [initialEstimate]);

  // Load existing requests from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('renovation_requests');
      if (stored) {
        setSubmittedRequests(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  const saveRequests = (requests: ConsultationRequest[]) => {
    setSubmittedRequests(requests);
    try {
      localStorage.setItem('renovation_requests', JSON.stringify(requests));
    } catch (e) {
      console.error('Error writing localStorage', e);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!name.trim()) {
      setErrorMsg('Пожалуйста, введите ваше имя');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg('Введите корректный номер телефона');
      return;
    }

    const newRequest: ConsultationRequest = {
      id: 'req-' + Date.now(),
      name,
      phone,
      email: email.trim() || undefined,
      area,
      roomCount,
      serviceType,
      estimatedCost: budget > 0 ? budget : undefined,
      createdAt: new Date().toLocaleDateString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      status: 'new'
    };

    const updated = [newRequest, ...submittedRequests];
    saveRequests(updated);

    // Show success
    setIsSuccess(true);
    
    // Clear fields
    setName('');
    setPhone('');
    setEmail('');
    onClearEstimate();
    setBudget(0);

    // Hide success alert after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const handleDeleteRequest = (id: string) => {
    const updated = submittedRequests.filter(r => r.id !== id);
    saveRequests(updated);
  };

  return (
    <section id="feedback-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
            Бесплатный Замер
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Начать Свой Ремонт
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Оставьте заявку. Наш прораб приедет в удобное время, проведет точный замер лазерным оборудованием и составит подробную смету совершенно бесплатно.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PhoneCall className="w-6 h-6 text-indigo-600" />
              Запись на замер и консультацию
            </h3>

            {/* In-form Notification for autofilled fields */}
            {initialEstimate && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 text-xs text-indigo-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Смета импортирована из калькулятора!</span>
                  Площадь: <span className="font-semibold">{initialEstimate.area} м²</span>, 
                  Тип: <span className="font-semibold">
                    {initialEstimate.serviceType === 'cosmetic' ? 'Косметический' : 
                     initialEstimate.serviceType === 'standard' ? 'Капитальный' : 'Дизайнерский'}
                  </span>, 
                  Бюджет: <span className="font-semibold font-mono">{initialEstimate.estimatedCost.toLocaleString()} ₽</span>
                </div>
                <button
                  type="button"
                  onClick={onClearEstimate}
                  className="text-indigo-700 hover:text-indigo-950 underline font-semibold font-sans ml-4 cursor-pointer"
                >
                  Сбросить
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Алексей Иванов"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Электронная почта (необязательно)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Apartment specs if filled manually */}
              {!initialEstimate && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                  {/* Area */}
                  <div>
                    <label className="block text-[11px] font-sans font-medium text-slate-600 mb-1">
                      Площадь (м²):
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Rooms */}
                  <div>
                    <label className="block text-[11px] font-sans font-medium text-slate-600 mb-1">
                      Комнат:
                    </label>
                    <select
                      value={roomCount}
                      onChange={(e) => setRoomCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs font-sans focus:outline-none focus:border-indigo-500"
                    >
                      <option value="1">1 комната</option>
                      <option value="2">2 комнаты</option>
                      <option value="3">3 комнаты</option>
                      <option value="4">4 комнаты</option>
                      <option value="5">5+ комнат</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-[11px] font-sans font-medium text-slate-600 mb-1">
                      Тип ремонта:
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs font-sans focus:outline-none focus:border-indigo-500"
                    >
                      <option value="cosmetic">Косметический</option>
                      <option value="standard">Капитальный</option>
                      <option value="premium-design">Дизайнерский</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Error block */}
              {errorMsg && (
                <div className="text-red-600 font-sans text-xs bg-red-50 border border-red-100 p-3 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Success Banner */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-2xl p-4 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm mb-0.5">Спасибо! Заявка принята.</span>
                      Наш мастер свяжется с вами в течение 15 минут для согласования даты бесплатного замера. Сведения также сохранены в списке ваших заявок ниже.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-sans font-bold text-sm md:text-base rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                <Send className="w-4 h-4" />
                Записаться на бесплатный замер
              </button>

              <p className="text-[11px] text-center text-slate-400 font-sans">
                Нажимая на кнопку, вы даете согласие на обработку персональных данных.
              </p>

            </form>
          </div>

          {/* Guidelines / Benefits Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-3xl space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900">Почему мы?</h3>
              
              <div className="space-y-3">
                {[
                  { title: 'Работаем по договору', desc: 'Сроки и финальная смета фиксируются в юридическом договоре. Никаких доплат в процессе.' },
                  { title: 'Поэтапная оплата', desc: 'Вы платите только за фактически выполненные и принятые вами этапы работ. Никакой 100% предоплаты.' },
                  { title: 'Контроль 24/7', desc: 'Регулярные фото- и видеоотчеты в Telegram/WhatsApp. Вы видите весь процесс ремонта удаленно.' },
                  { title: 'Гарантия 3 года', desc: 'Мы несем полную ответственность за качество и даем официальную письменную гарантию на все виды работ.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="bg-indigo-50 text-indigo-800 font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-slate-900">{item.title}</h4>
                      <p className="font-sans text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Instant Contact info */}
            <div className="bg-slate-950 p-5 md:p-6 rounded-3xl text-white text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">Прямая линия</span>
              <div className="text-2xl font-mono font-bold mt-2 hover:text-indigo-400 transition-colors">
                <a href="tel:+79935243862">+7 (993) 524-38-62</a>
              </div>
              <p className="text-slate-400 font-sans text-xs mt-2">Ежедневно с 09:00 до 21:00. Звонок по РФ бесплатный.</p>
            </div>
          </div>

        </div>

        {/* Lead Listing (My requests saved in LocalStorage) */}
        {submittedRequests.length > 0 && (
          <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-indigo-600" />
                <h4 className="font-display font-bold text-base text-slate-900">
                  Ваши отправленные заявки ({submittedRequests.length})
                </h4>
              </div>
              <span className="text-slate-400 font-mono text-[10px] uppercase">Сохранено в вашем браузере</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submittedRequests.map((req) => (
                <div 
                  key={req.id}
                  className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex justify-between items-start hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-sans font-bold text-sm">{req.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({req.createdAt})</span>
                    </div>
                    <div className="text-xs text-slate-500 font-sans">
                      Телефон: <span className="font-semibold text-slate-800">{req.phone}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-sans pt-1">
                      Параметры: <span className="font-semibold text-slate-800">{req.area} м²</span>,{' '}
                      <span className="font-semibold text-slate-800">
                        {req.serviceType === 'cosmetic' ? 'Косметический ремонт' : 
                         req.serviceType === 'standard' ? 'Капитальный ремонт' : 'Дизайнерский ремонт'}
                      </span>
                    </div>
                    {req.estimatedCost && (
                      <div className="text-xs text-indigo-700 font-mono font-bold">
                        Предварительная смета: {req.estimatedCost.toLocaleString()} ₽
                      </div>
                    )}
                    <div className="pt-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                      <span className="text-[10px] text-indigo-700 font-mono font-bold uppercase">
                        Статус: Ожидание звонка прораба
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteRequest(req.id)}
                    className="text-stone-400 hover:text-red-500 p-1.5 hover:bg-stone-200/60 rounded-lg transition cursor-pointer"
                    title="Удалить заявку"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
