import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  Baby01Icon,
  Pdf01Icon,
  RefreshIcon,
  SaveIcon,
  Share05Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';
import MealCard from './components/MealCard';
import MealTimeline from './components/MealTimeline';
import NutritionFilter from './components/NutritionFilter';
import NutritionSummary from './components/NutritionSummary';
import NutritionTips from './components/NutritionTips';
import RecipeDrawer from './components/RecipeDrawer';
import type {
  BabyNutritionProfile,
  MealSuggestion,
  NutritionFilterState,
  NutritionPlan,
} from './nutritionEngine';
import {
  accountBabyProfiles,
  allergyLabels,
  defaultFilter,
  generateNutritionPlan,
  getAgeBandFromMonths,
  getAgeInMonths,
  goalLabels,
} from './nutritionEngine';
import nutritionIllustrationUrl from '../../assets/dinhduong.png';

type NutritionPageProps = {
  isAuthenticated?: boolean;
};

const getBabyIconColor = (gender?: BabyNutritionProfile['gender']) => {
  if (gender === 'girl') {
    return '#FF7BA9';
  }

  if (gender === 'boy') {
    return '#4AA8FF';
  }

  return '#5B6B7A';
};

function PlanActions({ isLoading, onGenerate }: { isLoading: boolean; onGenerate: () => void }) {
  const actions = [
    { label: 'Lưu thực đơn', icon: SaveIcon },
    { label: 'Xuất PDF', icon: Pdf01Icon },
    { label: 'Chia sẻ', icon: Share05Icon },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-bold text-[#5B6B7A] transition duration-[250ms] hover:border-[#5AAEFF] hover:bg-[#EAF7FF] hover:text-[#2F6D9E]"
          key={action.label}
          type="button"
        >
          <HugeiconsIcon icon={action.icon} size={18} strokeWidth={1.7} />
          {action.label}
        </button>
      ))}
      <button
        className="flex items-center gap-2 rounded-2xl border border-[#5AAEFF] bg-white px-4 py-3 text-sm font-bold text-[#5AAEFF] transition duration-[250ms] hover:bg-[#EAF7FF] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
        onClick={onGenerate}
        type="button"
      >
        <HugeiconsIcon className={isLoading ? 'animate-spin' : ''} icon={RefreshIcon} size={18} strokeWidth={1.7} />
        Tạo thực đơn mới
      </button>
    </div>
  );
}

function NutritionPage({ isAuthenticated = false }: NutritionPageProps) {
  const [selectedBabyId, setSelectedBabyId] = useState(accountBabyProfiles[0].id);
  const selectedProfile = accountBabyProfiles.find((baby) => baby.id === selectedBabyId) ?? accountBabyProfiles[0];
  const [filter, setFilter] = useState<NutritionFilterState>(() => ({
    ...defaultFilter,
    ...(isAuthenticated
      ? {
          ageBand: getAgeBandFromMonths(getAgeInMonths(selectedProfile.birthDate)),
          allergies: selectedProfile.allergies,
        }
      : {}),
  }));
  const [generation, setGeneration] = useState(0);
  const [plan, setPlan] = useState<NutritionPlan>();
  const [selectedMeal, setSelectedMeal] = useState<MealSuggestion>();
  const [isLoading, setIsLoading] = useState(true);
  const [historyByBaby, setHistoryByBaby] = useState<Record<string, NutritionPlan[]>>({});
  const [activeHistoryPlanId, setActiveHistoryPlanId] = useState('');
  const previousMealIdsRef = useRef<string[]>([]);

  const activeProfile = isAuthenticated ? selectedProfile : undefined;
  const currentHistory = activeProfile ? historyByBaby[activeProfile.id] ?? [] : [];

  useEffect(() => {
    if (!activeProfile) {
      return;
    }

    setFilter((currentFilter) => ({
      ...currentFilter,
      audience: 'child',
      ageBand: getAgeBandFromMonths(getAgeInMonths(activeProfile.birthDate)),
      allergies: activeProfile.allergies,
    }));
    setActiveHistoryPlanId('');
  }, [activeProfile]);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    generateNutritionPlan({
      filter,
      generation,
      previousMealIds: previousMealIdsRef.current,
      profile: activeProfile,
    }).then((nextPlan) => {
      if (!isMounted) {
        return;
      }

      setPlan(nextPlan);
      previousMealIdsRef.current = nextPlan.meals.map((meal) => meal.name);
      setIsLoading(false);

      if (activeProfile) {
        setHistoryByBaby((currentHistoryByBaby) => ({
          ...currentHistoryByBaby,
          [activeProfile.id]: [nextPlan, ...(currentHistoryByBaby[activeProfile.id] ?? [])].slice(0, 6),
        }));
        setActiveHistoryPlanId(nextPlan.id);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeProfile, filter, generation]);

  const visiblePlan = plan;

  const handleSelectBaby = (babyId: string) => {
    setSelectedBabyId(babyId);
    setGeneration((current) => current + 1);
  };

  const handleGenerateNewPlan = () => {
    setGeneration((current) => current + 1);
  };

  const allergyText = activeProfile
    ? activeProfile.allergies.map((allergy) => allergyLabels[allergy]).join(', ')
    : filter.allergies.map((allergy) => allergyLabels[allergy]).join(', ');

  return (
    <div className="bg-[#F8FCFF]">
      <section className="mx-auto grid min-h-[420px] w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center rounded-[32px] bg-white p-7 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-10">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
            <HugeiconsIcon icon={SparklesIcon} size={20} strokeWidth={1.7} />
            Công cụ dinh dưỡng
          </p>
          <h1 className="mb-4 text-[36px] font-extrabold leading-tight text-[#27415C] sm:text-5xl">
            Gợi ý dinh dưỡng
          </h1>
          <p className="max-w-xl text-base leading-8 text-[#5B6B7A] sm:text-lg">
            Thực đơn khoa học dành cho mẹ và bé, được cá nhân hóa theo từng độ tuổi.
          </p>
          {visiblePlan ? (
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full bg-[#EAF7FF] px-4 py-2 text-[#2F6D9E]">
                {visiblePlan.profileSummary.ageLabel}
              </span>
              <span className="rounded-full bg-[#EEF9F2] px-4 py-2 text-[#207A52]">
                {visiblePlan.profileSummary.statusLabel}
              </span>
              <span className="rounded-full bg-[#FFEFF6] px-4 py-2 text-[#B8406D]">
                {visiblePlan.profileSummary.goalLabel}
              </span>
            </div>
          ) : null}
          <a
            className="mt-7 inline-flex w-fit rounded-2xl bg-[#5AAEFF] px-5 py-3 text-base font-bold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6]"
            href="#today-menu"
          >
            Khám phá thực đơn
          </a>
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-[32px] bg-[#FFF9E8] p-8 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <img
            alt="Minh họa bé ăn uống lành mạnh"
            className="h-full max-h-[330px] w-full object-contain"
            src={nutritionIllustrationUrl}
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <section className="grid min-w-0 gap-4 rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] sm:p-7">
            <label className="grid min-w-0 gap-2 text-sm font-bold text-[#27415C]">
              Chọn bé
              <select
                className="min-w-0 max-w-full appearance-none truncate rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 pr-10 text-base font-bold text-[#5B6B7A] outline-none focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
                onChange={(event) => handleSelectBaby(event.target.value)}
                value={selectedBabyId}
              >
                {accountBabyProfiles.map((baby) => (
                  <option key={baby.id} value={baby.id}>
                    {baby.gender === 'boy' ? '👦' : '👧'} {baby.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex items-center gap-3 rounded-[22px] bg-[#F8FCFF] p-4 lg:col-span-2">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
                  style={{ color: getBabyIconColor(activeProfile?.gender) }}
                >
                  <HugeiconsIcon icon={Baby01Icon} size={24} strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#5B6B7A]">Hồ sơ đang chọn</p>
                  <strong className="text-lg text-[#27415C]">{activeProfile?.name}</strong>
                </div>
              </div>
              <div className="rounded-[22px] bg-[#F8FCFF] p-4">
                <p className="text-sm font-bold text-[#5B6B7A]">Chiều cao</p>
                <strong className="text-lg text-[#27415C]">{activeProfile?.height} cm</strong>
              </div>
              <div className="rounded-[22px] bg-[#F8FCFF] p-4">
                <p className="text-sm font-bold text-[#5B6B7A]">Cân nặng</p>
                <strong className="text-lg text-[#27415C]">{activeProfile?.weight} kg</strong>
              </div>
              <div className="rounded-[22px] bg-[#F8FCFF] p-4">
                <p className="text-sm font-bold text-[#5B6B7A]">Dị ứng</p>
                <strong className="text-lg text-[#27415C]">{allergyText}</strong>
              </div>
            </div>
          </section>
        ) : null}

        <NutritionFilter
          filter={filter}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          onChange={setFilter}
          onGenerate={handleGenerateNewPlan}
          selectedProfile={activeProfile}
        />

        <NutritionSummary isLoading={isLoading} plan={visiblePlan} />

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" id="today-menu">
          <div className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-sm font-bold text-[#5AAEFF]">Thực đơn được tạo động</p>
                <h2 className="text-2xl font-bold text-[#27415C]">Thực đơn hôm nay</h2>
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#5AAEFF] bg-white px-4 py-3 text-sm font-bold text-[#5AAEFF] transition duration-[250ms] hover:bg-[#EAF7FF] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                disabled={isLoading}
                onClick={handleGenerateNewPlan}
                type="button"
              >
                <HugeiconsIcon className={isLoading ? 'animate-spin' : ''} icon={RefreshIcon} size={18} strokeWidth={1.7} />
                Tạo thực đơn mới
              </button>
            </div>

            {isLoading ? (
              <p className="mb-5 rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#2F6D9E]">
                Đang tạo thực đơn phù hợp...
              </p>
            ) : null}
            <div className={!isLoading ? 'animate-[auth-fade-in_0.45s_ease-out_both]' : undefined}>
              <MealTimeline
                isLoading={isLoading}
                meals={visiblePlan?.meals ?? []}
                onSelectMeal={setSelectedMeal}
              />
            </div>
          </div>

          <aside className="grid gap-6">
            <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#5AAEFF]">Lịch sử</p>
                  <h2 className="text-2xl font-bold text-[#27415C]">Thực đơn đã tạo</h2>
                </div>
                <HugeiconsIcon className="text-[#8AA0B5]" icon={ArrowDown01Icon} size={20} strokeWidth={1.7} />
              </div>

              {isAuthenticated ? (
                <div className="grid gap-3">
                  {currentHistory.length ? (
                    currentHistory.map((historyPlan, index) => (
                      <button
                        className={[
                          'rounded-2xl border px-4 py-3 text-left text-sm font-bold transition duration-[250ms]',
                          activeHistoryPlanId === historyPlan.id
                            ? 'border-[#5AAEFF] bg-[#EAF7FF] text-[#2F6D9E]'
                            : 'border-[#E8EEF6] bg-white text-[#5B6B7A] hover:border-sky-200 hover:bg-sky-50',
                        ].join(' ')}
                        key={historyPlan.id}
                        onClick={() => {
                          setActiveHistoryPlanId(historyPlan.id);
                          setPlan(historyPlan);
                          previousMealIdsRef.current = historyPlan.meals.map((meal) => meal.name);
                        }}
                        type="button"
                      >
                        Hôm nay · Thực đơn {currentHistory.length - index}
                      </button>
                    ))
                  ) : (
                    <p className="rounded-2xl bg-[#F8FCFF] px-4 py-3 text-sm font-semibold text-[#5B6B7A]">
                      Lịch sử sẽ xuất hiện sau khi tạo thực đơn.
                    </p>
                  )}
                </div>
              ) : (
                <p className="rounded-2xl bg-[#F8FCFF] px-4 py-3 text-sm font-semibold leading-7 text-[#5B6B7A]">
                  Đăng nhập để lưu và xem lại các thực đơn đã tạo.
                </p>
              )}
            </section>

          </aside>
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold text-[#5AAEFF]">Danh sách món ăn</p>
              <h2 className="text-2xl font-bold text-[#27415C]">Món phù hợp với {activeProfile?.name ?? goalLabels[filter.goal]}</h2>
            </div>
            <PlanActions isLoading={isLoading} onGenerate={handleGenerateNewPlan} />
          </div>

          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div className="rounded-[24px] border border-sky-100 bg-white p-5" key={item}>
                  <div className="mb-5 h-40 animate-pulse rounded-[20px] bg-sky-100" />
                  <div className="mb-3 h-5 w-3/4 animate-pulse rounded-full bg-sky-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded-full bg-sky-50" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(visiblePlan?.meals ?? []).map((meal) => (
                <MealCard key={meal.id} meal={meal} onSelect={setSelectedMeal} />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
          <p className="mb-4 text-sm font-bold text-[#5AAEFF]">Gợi ý thay thế</p>
          <div className="grid gap-3 md:grid-cols-3">
            {(visiblePlan?.meals ?? []).slice(0, 3).map((meal) => (
              <article className="rounded-[22px] bg-[#FFF9E8] p-4" key={meal.id}>
                <p className="mb-2 text-sm font-bold text-[#27415C]">{meal.name}</p>
                <div className="flex flex-wrap gap-2">
                  {meal.alternatives.slice(0, 3).map((alternative) => (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5B6B7A]" key={alternative}>
                      {alternative}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <NutritionTips tips={visiblePlan?.tips ?? []} />
      </section>

      <RecipeDrawer meal={selectedMeal} onClose={() => setSelectedMeal(undefined)} />
    </div>
  );
}

export default NutritionPage;
