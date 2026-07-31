import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Clock01Icon,
  FireIcon,
  OrganicFoodIcon,
  ServingFoodIcon,
} from '@hugeicons/core-free-icons';
import type { MealSuggestion } from '../nutritionEngine';

type RecipeDrawerProps = {
  meal?: MealSuggestion;
  onClose: () => void;
};

function RecipeDrawer({ meal, onClose }: RecipeDrawerProps) {
  const isOpen = Boolean(meal);

  return (
    <div
      aria-hidden={!isOpen}
      className={[
        'fixed inset-0 z-50 transition duration-[250ms]',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <button
        aria-label="Đóng chi tiết món ăn"
        className={[
          'absolute inset-0 h-full w-full bg-slate-900/30 transition duration-[250ms]',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={onClose}
        type="button"
      />

      <aside
        className={[
          'absolute right-0 top-0 h-full w-full overflow-y-auto bg-white shadow-2xl shadow-sky-100 transition duration-[250ms] sm:w-[min(92vw,520px)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {meal ? (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sky-100 bg-white/95 px-5 py-4 backdrop-blur">
              <h2 className="text-xl font-bold text-[#27415C]">Chi tiết món ăn</h2>
              <button
                aria-label="Đóng"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition duration-[250ms] hover:bg-pink-100"
                onClick={onClose}
                type="button"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.7} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-6 overflow-hidden rounded-[28px] bg-[#FFF9E8]">
                <img alt="" className="h-72 w-full object-contain p-7" src={meal.imageUrl} />
              </div>

              <h3 className="text-2xl font-extrabold leading-tight text-[#27415C]">{meal.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold text-[#5B6B7A]">
                <span className="flex items-center gap-1 rounded-full bg-[#FFF5E8] px-3 py-1.5">
                  <HugeiconsIcon icon={FireIcon} size={15} strokeWidth={1.7} />
                  {meal.calories} kcal
                </span>
                <span className="flex items-center gap-1 rounded-full bg-[#EAF7FF] px-3 py-1.5">
                  <HugeiconsIcon icon={Clock01Icon} size={15} strokeWidth={1.7} />
                  {meal.prepTime} phút
                </span>
                <span className="rounded-full bg-[#EEF9F2] px-3 py-1.5">{meal.ageLabel}</span>
              </div>

              <div className="mt-7 grid gap-5">
                <section className="rounded-[24px] bg-[#F8FCFF] p-5">
                  <p className="mb-3 flex items-center gap-2 text-base font-bold text-[#27415C]">
                    <HugeiconsIcon icon={OrganicFoodIcon} size={20} strokeWidth={1.7} />
                    Nguyên liệu
                  </p>
                  <ul className="grid gap-2 text-sm font-semibold leading-7 text-[#5B6B7A]">
                    {meal.ingredients.map((ingredient) => (
                      <li key={ingredient}>• {ingredient}</li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-[24px] bg-[#F8FCFF] p-5">
                  <p className="mb-3 flex items-center gap-2 text-base font-bold text-[#27415C]">
                    <HugeiconsIcon icon={ServingFoodIcon} size={20} strokeWidth={1.7} />
                    Cách nấu
                  </p>
                  <ol className="grid gap-2 text-sm font-semibold leading-7 text-[#5B6B7A]">
                    {meal.steps.map((step, index) => (
                      <li key={step}>{index + 1}. {step}</li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-[24px] bg-[#F8FCFF] p-5">
                  <p className="mb-3 text-base font-bold text-[#27415C]">Giá trị dinh dưỡng</p>
                  <div className="grid grid-cols-2 gap-3 text-sm font-bold text-[#5B6B7A]">
                    <span>Protein: {meal.protein}g</span>
                    <span>Carb: {meal.carb}g</span>
                    <span>Fat: {meal.fat}g</span>
                    <span>Độ tuổi: {meal.ageLabel}</span>
                  </div>
                </section>

                <section className="rounded-[24px] bg-[#FFF9E8] p-5">
                  <p className="mb-3 text-base font-bold text-[#27415C]">Gợi ý thay thế</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.alternatives.map((alternative) => (
                      <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[#5B6B7A]" key={alternative}>
                        {alternative}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}

export default RecipeDrawer;
