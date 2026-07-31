import { HugeiconsIcon } from '@hugeicons/react';
import { FilterIcon } from '@hugeicons/core-free-icons';
import type {
  AgeBand,
  Allergy,
  BabyNutritionProfile,
  MomStage,
  NutritionAudience,
  NutritionFilterState,
  NutritionGoal,
} from '../nutritionEngine';
import {
  ageBandLabels,
  allergyLabels,
  goalLabels,
  momStageLabels,
} from '../nutritionEngine';

type NutritionFilterProps = {
  filter: NutritionFilterState;
  isAuthenticated: boolean;
  isLoading: boolean;
  onChange: (filter: NutritionFilterState) => void;
  onGenerate: () => void;
  selectedProfile?: BabyNutritionProfile;
};

const audienceOptions: Array<[NutritionAudience, string]> = [
  ['pregnant', 'Mẹ bầu'],
  ['postpartum', 'Mẹ sau sinh'],
  ['child', 'Trẻ em'],
];

const ageOptions = Object.entries(ageBandLabels) as Array<[AgeBand, string]>;
const momStageOptions = Object.entries(momStageLabels) as Array<[MomStage, string]>;
const goalOptions = Object.entries(goalLabels) as Array<[NutritionGoal, string]>;
const allergyOptions = Object.entries(allergyLabels) as Array<[Allergy, string]>;

function NutritionFilter({
  filter,
  isAuthenticated,
  isLoading,
  onChange,
  onGenerate,
  selectedProfile,
}: NutritionFilterProps) {
  const updateFilter = (nextValues: Partial<NutritionFilterState>) => {
    onChange({ ...filter, ...nextValues });
  };

  const handleAllergyChange = (allergy: Allergy) => {
    if (allergy === 'none') {
      updateFilter({ allergies: ['none'] });
      return;
    }

    const current = filter.allergies.filter((item) => item !== 'none');
    const next = current.includes(allergy)
      ? current.filter((item) => item !== allergy)
      : [...current, allergy];

    updateFilter({ allergies: next.length ? next : ['none'] });
  };

  return (
    <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF7FF] text-[#4AA8FF]">
          <HugeiconsIcon icon={FilterIcon} size={22} strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-sm font-bold text-[#5AAEFF]">Bộ lọc dinh dưỡng</p>
          <h2 className="text-2xl font-bold text-[#27415C]">Cá nhân hóa thực đơn</h2>
        </div>
      </div>

      {isAuthenticated && selectedProfile ? (
        <div className="mb-6 rounded-[22px] bg-[#F8FCFF] p-4 text-sm font-semibold leading-7 text-[#5B6B7A]">
          Đang dùng hồ sơ của <strong className="text-[#27415C]">{selectedProfile.name}</strong>, gồm tuổi,
          giới tính, chiều cao, cân nặng và dị ứng đã lưu. Bạn không cần nhập lại thông tin bé.
        </div>
      ) : null}

      <div className="grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <label className="grid min-w-0 gap-2 text-sm font-bold text-[#27415C]">
          Đối tượng
          <select
            className="min-w-0 max-w-full appearance-none truncate rounded-2xl border border-[#E8EEF6] bg-[#F8FCFF] px-4 py-3 pr-10 text-base font-semibold text-[#5B6B7A] outline-none transition duration-[250ms] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
            onChange={(event) => updateFilter({ audience: event.target.value as NutritionAudience })}
            value={filter.audience}
          >
            {audienceOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-bold text-[#27415C]">
          Độ tuổi
          <select
            className="min-w-0 max-w-full appearance-none truncate rounded-2xl border border-[#E8EEF6] bg-[#F8FCFF] px-4 py-3 pr-10 text-base font-semibold text-[#5B6B7A] outline-none transition duration-[250ms] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
            disabled={isAuthenticated && filter.audience === 'child'}
            onChange={(event) =>
              filter.audience === 'child'
                ? updateFilter({ ageBand: event.target.value as AgeBand })
                : updateFilter({ momStage: event.target.value as MomStage })
            }
            value={filter.audience === 'child' ? filter.ageBand : filter.momStage}
          >
            {(filter.audience === 'child' ? ageOptions : momStageOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-bold text-[#27415C]">
          Mục tiêu
          <select
            className="min-w-0 max-w-full appearance-none truncate rounded-2xl border border-[#E8EEF6] bg-[#F8FCFF] px-4 py-3 pr-10 text-base font-semibold text-[#5B6B7A] outline-none transition duration-[250ms] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
            onChange={(event) => updateFilter({ goal: event.target.value as NutritionGoal })}
            value={filter.goal}
          >
            {goalOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <div className="min-w-0 md:col-span-2 lg:col-span-3">
          <p className="mb-3 text-sm font-bold text-[#27415C]">Dị ứng</p>
          <div className="flex flex-wrap gap-3">
            {allergyOptions.map(([value, label]) => {
              const isSelected = filter.allergies.includes(value);

              return (
                <button
                  className={[
                    'rounded-2xl border px-4 py-2.5 text-sm font-bold transition duration-[250ms]',
                    isSelected
                      ? 'border-[#FF8FB8] bg-[#FFEFF6] text-[#B8406D]'
                      : 'border-[#E8EEF6] bg-white text-[#5B6B7A] hover:border-pink-100 hover:bg-pink-50',
                  ].join(' ')}
                  key={value}
                  onClick={() => handleAllergyChange(value)}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-end">
          <button
            className="h-12 w-full rounded-2xl bg-[#5AAEFF] px-5 text-base font-bold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isLoading}
            onClick={onGenerate}
            type="button"
          >
            {isLoading ? 'Đang gợi ý...' : 'Gợi ý ngay'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default NutritionFilter;
