import { HugeiconsIcon } from '@hugeicons/react';
import {
  Clock01Icon,
  FireIcon,
  StarIcon,
} from '@hugeicons/core-free-icons';
import type { MealSuggestion } from '../nutritionEngine';

type MealCardProps = {
  meal: MealSuggestion;
  onSelect: (meal: MealSuggestion) => void;
};

function MealCard({ meal, onSelect }: MealCardProps) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-sky-100 bg-white shadow-[0_14px_34px_rgba(75,104,133,0.1)] transition duration-[250ms] hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(75,104,133,0.16)]">
      <button className="block h-44 w-full overflow-hidden bg-[#FFF9E8]" onClick={() => onSelect(meal)} type="button">
        <img
          alt=""
          className="h-full w-full object-contain p-5 transition duration-[250ms] group-hover:scale-105"
          src={meal.imageUrl}
        />
      </button>

      <div className="p-5">
        <h3 className="mb-3 text-lg font-bold leading-snug text-[#27415C]">{meal.name}</h3>
        <div className="mb-4 flex items-center gap-1 text-[#F4C542]">
          {Array.from({ length: 5 }, (_, index) => (
            <HugeiconsIcon
              icon={StarIcon}
              key={index}
              size={16}
              strokeWidth={index + 1 <= Math.round(meal.rating) ? 2 : 1.2}
            />
          ))}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 text-sm font-bold text-[#5B6B7A]">
          <span className="flex items-center gap-2 rounded-2xl bg-[#FFF5E8] px-3 py-2">
            <HugeiconsIcon icon={FireIcon} size={16} strokeWidth={1.7} />
            {meal.calories} kcal
          </span>
          <span className="flex items-center gap-2 rounded-2xl bg-[#EAF7FF] px-3 py-2">
            <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={1.7} />
            {meal.prepTime} phút
          </span>
        </div>

        <button
          className="w-full rounded-2xl border border-[#E8EEF6] bg-white px-4 py-3 text-sm font-bold text-[#5AAEFF] transition duration-[250ms] hover:border-[#5AAEFF] hover:bg-[#EAF7FF]"
          onClick={() => onSelect(meal)}
          type="button"
        >
          Xem chi tiết
        </button>
      </div>
    </article>
  );
}

export default MealCard;
