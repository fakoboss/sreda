import { useState, useMemo } from 'react';
import { Calculator as CalcIcon, Flame, ShieldCheck, Ruler, Layers, Settings, Calendar, Award } from 'lucide-react';

interface CalculatorProps {
  onEstimateSubmit: (data: {
    area: number;
    roomCount: number;
    serviceType: 'cosmetic' | 'standard' | 'premium-design';
    estimatedCost: number;
  }) => void;
}

export default function Calculator({ onEstimateSubmit }: CalculatorProps) {
  const [area, setArea] = useState<number>(55);
  const [roomCount, setRoomCount] = useState<number>(2);
  const [serviceType, setServiceType] = useState<'cosmetic' | 'standard' | 'premium-design'>('standard');
  const [materialsGrade, setMaterialsGrade] = useState<'comfort' | 'premium' | 'exclusive'>('premium');
  
  // Additional checkboxes
  const [dismantling, setDismantling] = useState<boolean>(false);
  const [underfloorHeating, setUnderfloorHeating] = useState<boolean>(false);
  const [smartHome, setSmartHome] = useState<boolean>(false);
  const [ventilation, setVentilation] = useState<boolean>(false);

  // Configuration factors
  const BASE_RATES = {
    cosmetic: 8500, // Rubles per m²
    standard: 16000,
    'premium-design': 28000,
  };

  const MATERIALS_FACTORS = {
    comfort: 0.8, // as percentage of work cost, or coefficient
    premium: 1.2,
    exclusive: 1.8,
  };

  const ESTIMATES = useMemo(() => {
    // 1. Calculate base work cost
    let baseRate = BASE_RATES[serviceType];
    if (dismantling) {
      baseRate += 1800; // Demolition adds to per-meter cost
    }
    
    const workCost = Math.round(area * baseRate);

    // 2. Calculate material costs
    const materialsFactor = MATERIALS_FACTORS[materialsGrade];
    // Materials cost is proportional to work cost based on complexity
    let materialCost = Math.round(workCost * materialsFactor * 0.75);

    // 3. Flat add-ons
    let addonsCost = 0;
    if (underfloorHeating) addonsCost += 22000;
    if (smartHome) addonsCost += 65000;
    if (ventilation) addonsCost += 48000;

    const totalCost = workCost + materialCost + addonsCost;

    // 4. Calculate duration
    let baseDays = 20;
    if (serviceType === 'standard') baseDays = 35;
    if (serviceType === 'premium-design') baseDays = 60;
    const areaFactor = Math.round(area * 0.6);
    const roomsFactor = roomCount * 4;
    const durationDays = baseDays + areaFactor + roomsFactor;

    // 5. Cost Breakdown
    const roughMaterials = Math.round(materialCost * 0.4);
    const finishingMaterials = Math.round(materialCost * 0.6);
    const plumbingElectrical = Math.round(workCost * 0.25);
    const finishWorks = Math.round(workCost * 0.75);

    return {
      workCost,
      materialCost: materialCost + addonsCost,
      totalCost,
      durationDays,
      breakdown: {
        roughMaterials,
        finishingMaterials,
        plumbingElectrical,
        finishWorks,
      }
    };
  }, [area, roomCount, serviceType, materialsGrade, dismantling, underfloorHeating, smartHome, ventilation]);

  const handleSendRequest = () => {
    onEstimateSubmit({
      area,
      roomCount,
      serviceType,
      estimatedCost: ESTIMATES.totalCost,
    });
  };

  return (
    <section id="calculator-section" className="py-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase block mb-3 font-semibold">
            Прозрачное ценообразование
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Калькулятор Стоимости Ремонта
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Рассчитайте ориентировочную стоимость работ и материалов за 1 минуту. Укажите параметры вашей квартиры для точного предварительного расчёта.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Col 7) */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl p-6 md:p-8 border border-slate-700/60 backdrop-blur-md">
            
            {/* Range Slider for Area */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-slate-200 font-sans font-medium flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-indigo-400" />
                  Площадь квартиры:
                </label>
                <span className="text-2xl font-mono font-bold text-indigo-400 bg-slate-900/60 px-4 py-1 rounded-lg border border-slate-700">
                  {area} м²
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs font-mono text-slate-400 mt-2 px-1">
                <span>15 м²</span>
                <span>80 м²</span>
                <span>150 м²</span>
                <span>250 м²</span>
              </div>
            </div>

            {/* Room count selector */}
            <div className="mb-8">
              <label className="text-slate-200 font-sans font-medium mb-3 block">
                Количество комнат:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setRoomCount(count)}
                    className={`py-3 rounded-xl font-mono font-bold text-sm transition-all duration-300 border cursor-pointer ${
                      roomCount === count
                        ? 'bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-lg shadow-indigo-600/25'
                        : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {count === 5 ? '5+' : count}
                  </button>
                ))}
              </div>
            </div>

            {/* Renovation Type selector */}
            <div className="mb-8">
              <label className="text-slate-200 font-sans font-medium mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Тип ремонта:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Cosmetic */}
                <button
                  type="button"
                  onClick={() => setServiceType('cosmetic')}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 ${
                    serviceType === 'cosmetic'
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold font-sans text-sm mb-1 text-white flex justify-between">
                    Косметический
                    {serviceType === 'cosmetic' && <span className="text-indigo-400 text-xs">●</span>}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Освежить отделку, обои, покраска стен, замена ламината. Быстро и экономично.
                  </p>
                  <div className="mt-2 font-mono text-xs text-indigo-400 font-semibold">
                    от {BASE_RATES.cosmetic.toLocaleString()} ₽/м²
                  </div>
                </button>

                {/* Standard / Capital */}
                <button
                  type="button"
                  onClick={() => setServiceType('standard')}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 ${
                    serviceType === 'standard'
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold font-sans text-sm mb-1 text-white flex justify-between">
                    Капитальный
                    {serviceType === 'standard' && <span className="text-indigo-400 text-xs">●</span>}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Замена стяжки, штукатурка стен, вся новая проводка и трубы, новая сантехника.
                  </p>
                  <div className="mt-2 font-mono text-xs text-indigo-400 font-semibold">
                    от {BASE_RATES.standard.toLocaleString()} ₽/м²
                  </div>
                </button>

                {/* Premium Design */}
                <button
                  type="button"
                  onClick={() => setServiceType('premium-design')}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 ${
                    serviceType === 'premium-design'
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold font-sans text-sm mb-1 text-white flex justify-between">
                    Дизайнерский
                    {serviceType === 'premium-design' && <span className="text-indigo-400 text-xs">●</span>}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    По индивидуальному проекту, сложные элементы отделки, интеграции, премиум материалы.
                  </p>
                  <div className="mt-2 font-mono text-xs text-indigo-400 font-semibold">
                    от {BASE_RATES['premium-design'].toLocaleString()} ₽/м²
                  </div>
                </button>

              </div>
            </div>

            {/* Materials Grade selector */}
            <div className="mb-8">
              <label className="text-slate-200 font-sans font-medium mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                Класс черновых и чистовых материалов:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'comfort', title: 'Комфорт', desc: 'Надежные бренды (Knauf, Tarkett, Ceresit)' },
                  { id: 'premium', title: 'Премиум', desc: 'Улучшенные марки (VitrA, Rehau, Dulux)' },
                  { id: 'exclusive', title: 'Эксклюзив', desc: 'Импортные элитные бренды (Kerama, Oikos, ТЕЦ)' }
                ].map((grade) => (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={() => setMaterialsGrade(grade.id as any)}
                    className={`p-3 rounded-xl text-left border text-xs cursor-pointer transition-all duration-300 ${
                      materialsGrade === grade.id
                        ? 'bg-indigo-500/15 border-indigo-500/85 text-white'
                        : 'bg-slate-900/40 border-slate-700/70 text-slate-300 hover:bg-slate-700/40'
                    }`}
                  >
                    <div className="font-bold font-sans mb-1">{grade.title}</div>
                    <div className="text-[11px] text-slate-400 font-sans leading-relaxed">{grade.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options checkboxes */}
            <div>
              <label className="text-slate-200 font-sans font-medium mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                Дополнительные опции:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* Dismantling */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900/20 cursor-pointer select-none hover:bg-slate-700/20 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={dismantling}
                    onChange={(e) => setDismantling(e.target.checked)}
                    className="rounded-sm bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <div className="font-sans text-xs">
                    <span className="font-semibold block text-slate-200">Демонтаж стен/отделки</span>
                    <span className="text-slate-400 text-[10px]">+1 800 ₽ / м² к смете</span>
                  </div>
                </label>

                {/* Underfloor heating */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900/20 cursor-pointer select-none hover:bg-slate-700/20 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={underfloorHeating}
                    onChange={(e) => setUnderfloorHeating(e.target.checked)}
                    className="rounded-sm bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <div className="font-sans text-xs">
                    <span className="font-semibold block text-slate-200">Монтаж теплого пола</span>
                    <span className="text-slate-400 text-[10px]">+22 000 ₽ (мат. + работа)</span>
                  </div>
                </label>

                {/* Smart Home */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900/20 cursor-pointer select-none hover:bg-slate-700/20 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={smartHome}
                    onChange={(e) => setSmartHome(e.target.checked)}
                    className="rounded-sm bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <div className="font-sans text-xs">
                    <span className="font-semibold block text-slate-200">Интеграция Умного Дома</span>
                    <span className="text-slate-400 text-[10px]">+65 000 ₽ под ключ</span>
                  </div>
                </label>

                {/* Ventilation */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900/20 cursor-pointer select-none hover:bg-slate-700/20 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={ventilation}
                    onChange={(e) => setVentilation(e.target.checked)}
                    className="rounded-sm bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <div className="font-sans text-xs">
                    <span className="font-semibold block text-slate-200">Вентиляция и кондиц.</span>
                    <span className="text-slate-400 text-[10px]">+48 000 ₽ монтаж трасс</span>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Results Display Panel (Col 5) */}
          <div className="lg:col-span-5 bg-slate-800 rounded-3xl border border-slate-700 p-6 md:p-8 flex flex-col justify-between sticky top-8 shadow-2xl">
            
            <div>
              {/* Card Title */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
                  <CalcIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Предварительный расчёт</h3>
                  <p className="text-xs text-slate-400 font-sans">Смета сформирована автоматически</p>
                </div>
              </div>

              {/* Total Cost Display */}
              <div className="mb-6 text-center lg:text-left">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block mb-1">Итоговая стоимость:</span>
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-indigo-400 tracking-tight">
                  {ESTIMATES.totalCost.toLocaleString()} ₽
                </span>
                <span className="text-xs text-slate-400 block mt-1">~ {(Math.round(ESTIMATES.totalCost / area)).toLocaleString()} ₽ за м²</span>
              </div>

              {/* Works & Materials Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-700">
                <div className="bg-slate-900/50 p-3.5 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block mb-1 font-sans">Стоимость работ</span>
                  <span className="text-lg font-mono font-bold text-white">
                    {ESTIMATES.workCost.toLocaleString()} ₽
                  </span>
                </div>
                <div className="bg-slate-900/50 p-3.5 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block mb-1 font-sans">Черновые + чистовые мат.</span>
                  <span className="text-lg font-mono font-bold text-slate-200">
                    {ESTIMATES.materialCost.toLocaleString()} ₽
                  </span>
                </div>
              </div>

              {/* Duration display */}
              <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/25 p-4 rounded-2xl mb-6">
                <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0 animate-bounce" />
                <div>
                  <span className="text-[11px] text-slate-300 block font-sans">Рекомендуемый срок выполнения</span>
                  <span className="text-base font-sans font-bold text-white">
                    ~ {ESTIMATES.durationDays} дней <span className="text-xs text-slate-400 font-normal">({Math.ceil(ESTIMATES.durationDays / 30)} мес.)</span>
                  </span>
                </div>
              </div>

              {/* Cost detailed breakdown */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Структура расходов (примерная):</h4>
                
                {/* 1. Черновые материалы */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-sans">
                    <span>Черновые смеси, электрика, трубы:</span>
                    <span className="font-mono text-slate-200 font-semibold">{(ESTIMATES.breakdown.roughMaterials).toLocaleString()} ₽</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                {/* 2. Чистовые материалы */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-sans">
                    <span>Чистовой керамогранит, обои, ламинат:</span>
                    <span className="font-mono text-slate-200 font-semibold">{(ESTIMATES.breakdown.finishingMaterials).toLocaleString()} ₽</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* 3. Монтажные/черновые работы */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-sans">
                    <span>Разводка инженерных сетей (электр. + сантех.):</span>
                    <span className="font-mono text-slate-200 font-semibold">{(ESTIMATES.breakdown.plumbingElectrical).toLocaleString()} ₽</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                {/* 4. Отделочные работы */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-sans">
                    <span>Штукатурка, укладка покрытий, покраска:</span>
                    <span className="font-mono text-slate-200 font-semibold">{(ESTIMATES.breakdown.finishWorks).toLocaleString()} ₽</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA action */}
            <div className="pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={handleSendRequest}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-sans font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base shadow-xl shadow-indigo-500/10"
              >
                Отправить эту смету мастеру
              </button>
              <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 font-sans mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Фиксируем цену в договоре. Замер и составление сметы — бесплатно!</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
