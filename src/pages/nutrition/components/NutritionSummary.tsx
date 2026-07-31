import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartRingIcon,
  FireIcon,
  ServingFoodIcon,
  WaterfallDown01Icon,
} from '@hugeicons/core-free-icons';
import type { NutritionPlan } from '../nutritionEngine';

type NutritionSummaryProps = {
  isLoading: boolean;
  plan?: NutritionPlan;
};

const macroColors = ['#FF8FB8', '#5AAEFF', '#F4C542', '#3BB273'];

function SummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((item) => (
        <div className="rounded-[24px] border border-sky-100 bg-white p-5" key={item}>
          <div className="mb-4 h-11 w-11 animate-pulse rounded-full bg-sky-100" />
          <div className="mb-3 h-7 w-16 animate-pulse rounded-full bg-sky-100" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-sky-50" />
        </div>
      ))}
    </div>
  );
}

function NutritionSummary({ isLoading, plan }: NutritionSummaryProps) {
  if (isLoading || !plan) {
    return <SummarySkeleton />;
  }

  const stats = [
    { label: 'Bữa chính', value: plan.stats.mains, icon: ServingFoodIcon, tone: 'bg-[#EAF7FF] text-[#4AA8FF]' },
    { label: 'Bữa phụ', value: plan.stats.snacks, icon: ServingFoodIcon, tone: 'bg-[#FFEFF6] text-[#FF7BA9]' },
    { label: 'Kcal', value: plan.stats.calories, icon: FireIcon, tone: 'bg-[#FFF5E8] text-[#D97706]' },
    { label: 'Nước', value: plan.stats.water, icon: WaterfallDown01Icon, tone: 'bg-[#EEF9F2] text-[#3BB273]' },
  ];
  const macroValues = [
    { label: 'Protein', value: plan.macro.protein },
    { label: 'Carb', value: plan.macro.carb },
    { label: 'Fat', value: plan.macro.fat },
    { label: 'Vitamin', value: plan.macro.vitamin },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            className="rounded-[24px] border border-sky-100 bg-white p-5 shadow-[0_14px_34px_rgba(75,104,133,0.1)]"
            key={stat.label}
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${stat.tone}`}>
              <HugeiconsIcon icon={stat.icon} size={22} strokeWidth={1.7} />
            </div>
            <strong className="block text-2xl font-extrabold text-[#27415C]">{stat.value}</strong>
            <p className="mt-1 text-sm font-bold text-[#5B6B7A]">{stat.label}</p>
          </article>
        ))}
      </div>

      <section className="grid gap-6 rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] md:grid-cols-[220px_1fr] sm:p-7">
        <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#FF8FB8_0_24%,#5AAEFF_24%_58%,#F4C542_58%_76%,#3BB273_76%_100%)]">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
            <HugeiconsIcon className="text-[#5AAEFF]" icon={ChartRingIcon} size={26} strokeWidth={1.7} />
            <strong className="mt-1 text-2xl font-extrabold text-[#27415C]">{plan.achievement}%</strong>
            <span className="text-xs font-bold text-[#5B6B7A]">Đã đạt</span>
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-[#5AAEFF]">Dinh dưỡng hôm nay</p>
            <h2 className="text-2xl font-bold text-[#27415C]">Cân bằng theo nhu cầu hiện tại</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {macroValues.map((macro, index) => (
              <div className="rounded-2xl bg-[#F8FCFF] p-3" key={macro.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#5B6B7A]">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: macroColors[index] }} />
                    {macro.label}
                  </span>
                  <span>{macro.value}{macro.label === 'Vitamin' ? '%' : 'g'}</span>
                </div>
                <div className="h-2 rounded-full bg-white">
                  <div
                    className="h-full rounded-full"
                    style={{ backgroundColor: macroColors[index], width: `${Math.min(macro.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NutritionSummary;
