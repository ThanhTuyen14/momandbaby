import { HugeiconsIcon } from '@hugeicons/react';
import {
  Clock01Icon,
  FireIcon,
  Moon02Icon,
  ServingFoodIcon,
  Sun01Icon,
} from '@hugeicons/core-free-icons';
import type { MealSuggestion } from '../nutritionEngine';

type MealTimelineProps = {
  isLoading: boolean;
  meals: MealSuggestion[];
  onSelectMeal: (meal: MealSuggestion) => void;
};

const slotIcons: Record<MealSuggestion['slot'], typeof Sun01Icon> = {
  breakfast: Sun01Icon,
  'snack-1': ServingFoodIcon,
  lunch: FireIcon,
  'snack-2': ServingFoodIcon,
  dinner: Moon02Icon,
};

function MealTimelineSkeleton() {
  return (
    <div className="grid gap-4">
      {[0, 1, 2, 3, 4].map((item) => (
        <div className="flex gap-4 rounded-[24px] border border-sky-100 bg-white p-4" key={item}>
          <div className="h-12 w-12 animate-pulse rounded-full bg-sky-100" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 animate-pulse rounded-full bg-sky-100" />
            <div className="h-5 w-3/5 animate-pulse rounded-full bg-sky-100" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-sky-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MealTimeline({ isLoading, meals, onSelectMeal }: MealTimelineProps) {
  if (isLoading) {
    return <MealTimelineSkeleton />;
  }

  return (
    <div className="grid gap-4">
      {meals.map((meal, index) => (
        <article
          className="group relative grid gap-4 rounded-[24px] border border-sky-100 bg-white p-4 shadow-[0_14px_34px_rgba(75,104,133,0.08)] transition duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(75,104,133,0.13)] sm:grid-cols-[auto_120px_1fr]"
          key={meal.id}
        >
          {index < meals.length - 1 ? (
            <span className="absolute left-[38px] top-16 hidden h-[calc(100%+16px)] w-px bg-sky-100 sm:block" />
          ) : null}

          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7FF] text-[#4AA8FF]">
            <HugeiconsIcon icon={slotIcons[meal.slot]} size={23} strokeWidth={1.7} />
          </span>

          <button
            className="overflow-hidden rounded-[18px] bg-[#FFF9E8] sm:h-[96px]"
            onClick={() => onSelectMeal(meal)}
            type="button"
          >
            <img
              alt=""
              className="h-32 w-full object-contain p-3 transition duration-[250ms] group-hover:scale-105 sm:h-full"
              src={meal.imageUrl}
            />
          </button>

          <div className="min-w-0">
            <p className="mb-1 text-sm font-bold text-[#FF8FB8]">{meal.slotLabel}</p>
            <h3 className="text-lg font-bold leading-snug text-[#27415C]">{meal.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#5B6B7A]">
              <span className="rounded-full bg-[#FFF5E8] px-3 py-1">{meal.calories} kcal</span>
              <span className="rounded-full bg-[#EAF7FF] px-3 py-1">{meal.protein}g protein</span>
              <span className="flex items-center gap-1 rounded-full bg-[#EEF9F2] px-3 py-1">
                <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.7} />
                {meal.prepTime} phút
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MealTimeline;
