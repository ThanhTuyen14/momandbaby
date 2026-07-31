import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  Baby01Icon,
  ChartLineData01Icon,
  CircleQuestionMarkIcon,
  Delete02Icon,
  Edit02Icon,
  SaveIcon,
  Sun01Icon,
  TrendingUpDownIcon,
  WeightScaleIcon,
} from '@hugeicons/core-free-icons';
import BabyInfoModal from '../../components/baby/BabyInfoModal';
import type { BabyGender, BabyInfoData } from '../../components/baby/BabyInfoModal';
import GrowthChart from '../../components/growth/GrowthChart';
import weightIllustrationUrl from '../../assets/cannang.png';

type BabyProfile = Required<BabyInfoData>;

type WeightRecord = {
  id: number;
  date: string;
  ageMonths: number;
  weight: number;
  who: number;
  lower: number;
};

type AccountBaby = BabyProfile & {
  records: WeightRecord[];
};

type WeightPageProps = {
  isAuthenticated?: boolean;
};

const weightReference: WeightRecord[] = [
  { id: 1, date: '2025-06-10', ageMonths: 6, weight: 7.1, who: 7.3, lower: 6.1 },
  { id: 2, date: '2025-09-10', ageMonths: 9, weight: 8.0, who: 8.2, lower: 6.9 },
  { id: 3, date: '2025-12-10', ageMonths: 12, weight: 8.8, who: 8.9, lower: 7.5 },
  { id: 4, date: '2026-03-10', ageMonths: 15, weight: 9.4, who: 9.6, lower: 8.0 },
  { id: 5, date: '2026-06-10', ageMonths: 18, weight: 9.9, who: 10.2, lower: 8.5 },
  { id: 6, date: '2026-07-10', ageMonths: 19, weight: 10.1, who: 10.4, lower: 8.7 },
];

const accountBabies: AccountBaby[] = [
  {
    id: 'bong',
    name: 'Bé Bông',
    gender: 'girl',
    birthDate: '2024-12-10',
    records: weightReference,
  },
  {
    id: 'bin',
    name: 'Bé Bin',
    gender: 'boy',
    birthDate: '2024-10-05',
    records: [
      { id: 11, date: '2025-04-05', ageMonths: 6, weight: 7.8, who: 7.9, lower: 6.4 },
      { id: 12, date: '2025-07-05', ageMonths: 9, weight: 8.7, who: 8.9, lower: 7.1 },
      { id: 13, date: '2025-10-05', ageMonths: 12, weight: 9.6, who: 9.6, lower: 7.8 },
      { id: 14, date: '2026-01-05', ageMonths: 15, weight: 10.2, who: 10.3, lower: 8.4 },
      { id: 15, date: '2026-04-05', ageMonths: 18, weight: 10.9, who: 10.9, lower: 8.9 },
    ],
  },
  {
    id: 'miu',
    name: 'Bé Miu',
    gender: 'girl',
    birthDate: '2025-01-20',
    records: [
      { id: 21, date: '2025-07-20', ageMonths: 6, weight: 6.5, who: 7.3, lower: 6.1 },
      { id: 22, date: '2025-10-20', ageMonths: 9, weight: 7.1, who: 8.2, lower: 6.9 },
      { id: 23, date: '2026-01-20', ageMonths: 12, weight: 7.7, who: 8.9, lower: 7.5 },
      { id: 24, date: '2026-04-20', ageMonths: 15, weight: 8.2, who: 9.6, lower: 8.0 },
    ],
  },
];

const nutritionTips = [
  { title: 'Thực đơn giúp bé tăng cân khỏe mạnh.', path: '/dinh-duong/thuc-don-tang-can' },
  { title: 'Bao lâu nên cân bé một lần?', path: '/cham-soc-be/bao-lau-nen-can-be' },
  {
    title: 'Những sai lầm khi theo dõi cân nặng của trẻ.',
    path: '/suc-khoe/sai-lam-theo-doi-can-nang',
  },
];

const faqItems = [
  {
    question: 'Bé nên tăng bao nhiêu kg mỗi tháng?',
    answer:
      'Mức tăng cân phụ thuộc vào độ tuổi, giới tính và tình trạng sức khỏe. Quan trọng nhất là theo dõi xu hướng đều đặn theo thời gian.',
  },
  {
    question: 'Khi nào cân nặng của bé được xem là thấp?',
    answer:
      'Nếu cân nặng thấp hơn ngưỡng dưới chuẩn hoặc bé tăng cân rất chậm trong nhiều lần đo liên tiếp, phụ huynh nên trao đổi với chuyên gia.',
  },
  {
    question: 'Bao lâu nên cân bé một lần?',
    answer:
      'Với trẻ nhỏ, có thể cân mỗi tháng một lần và ghi nhận cùng một thời điểm tương đối để dữ liệu dễ so sánh.',
  },
  {
    question: 'Nên cân bé vào thời điểm nào trong ngày?',
    answer:
      'Nên cân vào cùng một thời điểm, ưu tiên buổi sáng, trước bữa ăn lớn và dùng cùng một loại cân để giảm sai số.',
  },
];

const today = new Date().toISOString().slice(0, 10);

const formatDate = (value: string) => {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
};

const formatDisplayDate = (value?: string) => (value ? formatDate(value) : '—');

const getGenderLabel = (gender?: BabyGender) => {
  if (gender === 'girl') {
    return 'Bé gái';
  }

  if (gender === 'boy') {
    return 'Bé trai';
  }

  return '—';
};

const getBabyPrefix = (gender?: BabyGender) => (gender === 'boy' ? '👦' : '👧');

const getBabyIconColor = (gender?: BabyGender) => {
  if (gender === 'girl') {
    return '#FF7BA9';
  }

  if (gender === 'boy') {
    return '#4AA8FF';
  }

  return 'currentColor';
};

const getWeightStatus = (record?: WeightRecord) => {
  if (!record) {
    return '—';
  }

  if (record.weight < record.lower) {
    return 'Dưới chuẩn';
  }

  if (record.weight > record.who + 1.6) {
    return 'Vượt chuẩn';
  }

  return 'Đạt chuẩn';
};

const getEvaluationTone = (record?: WeightRecord) => {
  const status = getWeightStatus(record);

  if (status === 'Dưới chuẩn') {
    return 'border-amber-100 bg-[#FFF8DA] text-[#8A6514]';
  }

  if (status === 'Vượt chuẩn') {
    return 'border-pink-100 bg-[#FFEFF6] text-[#B8406D]';
  }

  if (status === 'Đạt chuẩn') {
    return 'border-emerald-100 bg-[#ECFFF5] text-[#207A52]';
  }

  return 'border-slate-100 bg-slate-50 text-slate-500';
};

const estimateAgeMonths = (birthDate: string, measureDate: string) => {
  const measuredAt = new Date(`${measureDate}T00:00:00`);
  const birthAt = new Date(`${birthDate}T00:00:00`);
  const months =
    (measuredAt.getFullYear() - birthAt.getFullYear()) * 12 +
    measuredAt.getMonth() -
    birthAt.getMonth();

  return Math.max(0, months + (measuredAt.getDate() >= birthAt.getDate() ? 0 : -1));
};

const getWhoStandard = (ageMonths: number, gender: BabyGender = 'girl') => {
  const genderOffset = gender === 'boy' ? 0.7 : 0;
  const ordered = [...weightReference].sort((first, second) => first.ageMonths - second.ageMonths);
  const lowerBound = ordered[0];
  const upperBound = ordered[ordered.length - 1];

  if (ageMonths <= lowerBound.ageMonths) {
    return {
      who: Number((lowerBound.who + genderOffset).toFixed(1)),
      lower: Number((lowerBound.lower + genderOffset).toFixed(1)),
    };
  }

  if (ageMonths >= upperBound.ageMonths) {
    const extraMonths = ageMonths - upperBound.ageMonths;

    return {
      who: Number((upperBound.who + genderOffset + extraMonths * 0.18).toFixed(1)),
      lower: Number((upperBound.lower + genderOffset + extraMonths * 0.14).toFixed(1)),
    };
  }

  const next = ordered.find((record) => record.ageMonths >= ageMonths) ?? upperBound;
  const previous = [...ordered].reverse().find((record) => record.ageMonths <= ageMonths) ?? lowerBound;
  const span = next.ageMonths - previous.ageMonths || 1;
  const ratio = (ageMonths - previous.ageMonths) / span;

  return {
    who: Number((previous.who + genderOffset + (next.who - previous.who) * ratio).toFixed(1)),
    lower: Number((previous.lower + genderOffset + (next.lower - previous.lower) * ratio).toFixed(1)),
  };
};

const buildRecord = (profile: BabyProfile, date: string, weight: number): WeightRecord => {
  const ageMonths = estimateAgeMonths(profile.birthDate, date);
  const standard = getWhoStandard(ageMonths, profile.gender);

  return {
    id: Date.now(),
    date,
    ageMonths,
    weight: Number(weight.toFixed(1)),
    who: standard.who,
    lower: standard.lower,
  };
};

function StatCards({ records }: { records: WeightRecord[] }) {
  const latest = records[records.length - 1];
  const previous = records[records.length - 2];
  const diffPrevious = latest && previous ? latest.weight - previous.weight : undefined;
  const diffWho = latest ? latest.weight - latest.who : undefined;

  const stats = [
    {
      label: 'Cân nặng hiện tại',
      value: latest ? `${latest.weight} kg` : '—',
      icon: WeightScaleIcon,
      tone: 'bg-[#EAF7FF] text-[#4AA8FF]',
    },
    ...(diffPrevious === undefined
      ? []
      : [
          {
            label: 'Tăng từ lần trước',
            value: `${diffPrevious >= 0 ? '+' : ''}${diffPrevious.toFixed(1)} kg`,
            icon: TrendingUpDownIcon,
            tone: 'bg-[#FFF9E8] text-[#C89A1D]',
          },
        ]),
    {
      label: 'So với chuẩn WHO',
      value: diffWho === undefined ? '—' : `${diffWho >= 0 ? '+' : ''}${diffWho.toFixed(1)} kg`,
      note: latest ? getWeightStatus(latest) : undefined,
      icon: ChartLineData01Icon,
      tone: 'bg-[#FFEFF6] text-[#FF7BA9]',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          className="rounded-[24px] border border-sky-100 bg-white p-5 shadow-[0_14px_34px_rgba(75,104,133,0.1)]"
          key={stat.label}
        >
          <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${stat.tone}`}>
            <HugeiconsIcon icon={stat.icon} size={22} strokeWidth={1.7} />
          </div>
          <p className="mb-2 text-sm font-bold text-[#5B6B7A]">{stat.label}</p>
          <strong className="block text-2xl font-extrabold text-[#27415C]">{stat.value}</strong>
          {stat.note ? <span className="mt-1 block text-sm font-bold text-[#5AAEFF]">{stat.note}</span> : null}
        </article>
      ))}
    </div>
  );
}

function WeightPage({ isAuthenticated = false }: WeightPageProps) {
  const [selectedBabyId, setSelectedBabyId] = useState(accountBabies[0].id);
  const selectedAccountBaby = accountBabies.find((baby) => baby.id === selectedBabyId) ?? accountBabies[0];
  const [guestProfile, setGuestProfile] = useState<BabyProfile | undefined>();
  const [guestRecords, setGuestRecords] = useState<WeightRecord[]>([]);
  const [accountRecordsByBaby, setAccountRecordsByBaby] = useState<Record<string, WeightRecord[]>>(
    () =>
      accountBabies.reduce<Record<string, WeightRecord[]>>((recordsByBaby, baby) => {
        recordsByBaby[baby.id] = baby.records;
        return recordsByBaby;
      }, {}),
  );
  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isBabyModalOpen, setIsBabyModalOpen] = useState(false);

  const activeProfile = isAuthenticated ? selectedAccountBaby : guestProfile;
  const records = isAuthenticated ? accountRecordsByBaby[selectedAccountBaby.id] ?? [] : guestRecords;
  const sortedRecords = useMemo(
    () => [...records].sort((first, second) => first.ageMonths - second.ageMonths),
    [records],
  );
  const latestRecord = sortedRecords[sortedRecords.length - 1];
  const status = getWeightStatus(latestRecord);
  const currentAge = latestRecord ? `${latestRecord.ageMonths} tháng` : '—';
  const chartData = sortedRecords.map((record) => ({
    id: record.id,
    date: record.date,
    ageMonths: record.ageMonths,
    value: record.weight,
    who: record.who,
    lower: record.lower,
  }));

  const saveRecords = (nextRecords: WeightRecord[]) => {
    if (isAuthenticated) {
      setAccountRecordsByBaby((current) => ({
        ...current,
        [selectedAccountBaby.id]: nextRecords,
      }));
      return;
    }

    setGuestRecords(nextRecords);
  };

  const resetInput = () => {
    setDate(today);
    setWeight('');
    setEditingId(null);
    setError('');
  };

  const handleSelectBaby = (babyId: string) => {
    setSelectedBabyId(babyId);
    resetInput();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeProfile) {
      setError('Vui lòng thêm thông tin bé trước khi lưu cân nặng.');
      return;
    }

    const parsedWeight = Number(weight);

    if (!date || Number.isNaN(parsedWeight) || parsedWeight <= 0 || parsedWeight > 100) {
      setError('Vui lòng nhập cân nặng lớn hơn 0 và không quá 100 kg.');
      return;
    }

    const nextRecord = {
      ...buildRecord(activeProfile, date, parsedWeight),
      id: editingId ?? Date.now(),
    };

    saveRecords(
      editingId
        ? records.map((record) => (record.id === editingId ? nextRecord : record))
        : [...records, nextRecord],
    );
    resetInput();
  };

  const handleEdit = (record: WeightRecord) => {
    setEditingId(record.id);
    setDate(record.date);
    setWeight(String(record.weight));
    setError('');
  };

  const handleDelete = (recordId: number) => {
    if (records.length <= 1) {
      return;
    }

    saveRecords(records.filter((record) => record.id !== recordId));
  };

  const handleSaveGuestBaby = (profile: BabyProfile, extraValues: Record<string, string>) => {
    const currentWeight = Number(extraValues.weight);
    const firstRecord = buildRecord(profile, today, currentWeight);
    setGuestProfile(profile);
    setGuestRecords([firstRecord]);
    setIsBabyModalOpen(false);
    resetInput();
  };

  return (
    <div className="bg-[#F8FCFF]">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center rounded-[32px] bg-white p-7 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-10">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
            <HugeiconsIcon icon={WeightScaleIcon} size={20} strokeWidth={1.7} />
            Công cụ tăng trưởng
          </p>
          <h1 className="mb-4 text-[36px] font-extrabold leading-tight text-[#27415C] sm:text-5xl">
            Theo dõi cân nặng
          </h1>
          <p className="max-w-xl text-base leading-8 text-[#5B6B7A] sm:text-lg">
            Theo dõi cân nặng của bé theo từng giai đoạn và so sánh với chuẩn WHO.
          </p>
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-[32px] bg-[#FFF5E8] p-8 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <img
            alt="Bé đang ngồi trên cân điện tử"
            className="h-full max-h-[320px] w-full object-contain"
            src={weightIllustrationUrl}
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.95fr_1.45fr] lg:px-8">
        <div className="grid gap-4">
          {isAuthenticated && accountBabies.length > 1 ? (
            <label className="grid gap-2 rounded-[24px] border border-sky-100 bg-white p-5 text-sm font-bold text-[#27415C] shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
              Chọn bé
              <select
                className="w-full rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-bold text-[#5B6B7A] outline-none focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
                onChange={(event) => handleSelectBaby(event.target.value)}
                value={selectedBabyId}
              >
                {accountBabies.map((baby) => (
                  <option key={baby.id} value={baby.id}>
                    {getBabyPrefix(baby.gender)} {baby.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <article className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[#27415C]">
                <HugeiconsIcon
                  color={getBabyIconColor(activeProfile?.gender)}
                  icon={Baby01Icon}
                  size={25}
                  strokeWidth={1.7}
                />
                {activeProfile?.name ?? '—'}
              </h2>
              <button
                className="rounded-full bg-[#FFEFF6] px-4 py-2 text-sm font-bold text-[#FF7BA9] transition duration-[250ms] hover:bg-[#FFDCEB]"
                onClick={() => {
                  if (!isAuthenticated) {
                    setIsBabyModalOpen(true);
                  }
                }}
                type="button"
              >
                Chỉnh sửa
              </button>
            </div>

            <dl className="grid gap-4 text-[#5B6B7A]">
              {[
                ['Tên bé', activeProfile?.name ?? '—'],
                ['Giới tính', getGenderLabel(activeProfile?.gender)],
                ['Ngày sinh', formatDisplayDate(activeProfile?.birthDate)],
                ['Tuổi', currentAge],
                ['Cân nặng hiện tại', latestRecord ? `${latestRecord.weight} kg` : '—'],
              ].map(([label, value]) => (
                <div
                  className="flex items-center justify-between gap-4 border-b border-sky-50 pb-3 last:border-0 last:pb-0"
                  key={label}
                >
                  <dt className="font-medium">{label}</dt>
                  <dd className="text-right font-bold text-[#27415C]">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <GrowthChart
          chartData={chartData}
          childGender={activeProfile?.gender}
          emptyMessage="Chưa có dữ liệu cân nặng. Bấm Chỉnh sửa để thêm thông tin bé."
          maxValuePadding={1.5}
          minValuePadding={1}
          showMarkerValues
          title="Cân nặng theo giai đoạn"
          type="weight"
          unit="kg"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <StatCards records={sortedRecords} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <article className={['rounded-[28px] border p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]', getEvaluationTone(latestRecord)].join(' ')}>
          <h2 className="mb-3 text-2xl font-bold text-[#27415C]">Đánh giá</h2>
          {!latestRecord ? (
            <div className="space-y-3 text-[#5B6B7A]">
              <p className="font-bold text-[#27415C]">Chưa có dữ liệu cân nặng.</p>
              <p>Thêm thông tin bé để hệ thống tự động so sánh với chuẩn WHO.</p>
            </div>
          ) : status === 'Dưới chuẩn' ? (
            <div className="text-[#5B6B7A]">
              <p className="mb-3 font-bold text-[#8A6514]">Cân nặng thấp hơn chuẩn WHO.</p>
              <p className="mb-3 font-semibold">Khuyến nghị:</p>
              <ul className="grid gap-2 pl-5">
                <li>Tăng cữ bú</li>
                <li>Bổ sung dinh dưỡng</li>
                <li>Theo dõi định kỳ</li>
              </ul>
            </div>
          ) : status === 'Vượt chuẩn' ? (
            <div className="text-[#5B6B7A]">
              <p className="mb-3 font-bold text-[#B8406D]">Cân nặng cao hơn chuẩn WHO.</p>
              <p className="mb-3 font-semibold">Khuyến nghị:</p>
              <ul className="grid gap-2 pl-5">
                <li>Điều chỉnh khẩu phần</li>
                <li>Khuyến khích vận động</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-[#5B6B7A]">
              <p className="font-bold text-[#207A52]">Cân nặng của bé đang phát triển tốt.</p>
              <p>Đạt chuẩn WHO.</p>
              <p>Tiếp tục duy trì chế độ dinh dưỡng phù hợp.</p>
            </div>
          )}
        </article>

        <article className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <h2 className="mb-5 text-2xl font-bold text-[#27415C]">Nhập cân nặng mới</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-bold text-[#27415C]">
              Ngày cân
              <input
                className="rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none transition duration-[250ms] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!activeProfile}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#27415C]">
              Cân nặng
              <div className="flex items-center overflow-hidden rounded-2xl border border-sky-100 bg-[#F8FCFF] focus-within:border-[#5AAEFF] focus-within:ring-4 focus-within:ring-sky-100">
                <input
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!activeProfile}
                  max="100"
                  min="0.1"
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="Nhập cân nặng"
                  step="0.1"
                  type="number"
                  value={weight}
                />
                <span className="px-4 text-sm font-bold text-[#5B6B7A]">kg</span>
              </div>
            </label>

            {error ? <p className="text-sm font-semibold text-[#D97706]">{error}</p> : null}

            <button
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[#5AAEFF] px-5 py-3 font-bold text-white shadow-lg shadow-sky-200 transition duration-[250ms] hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              disabled={!activeProfile}
              type="submit"
            >
              <HugeiconsIcon icon={SaveIcon} size={20} strokeWidth={1.7} />
              {editingId ? 'Cập nhật' : 'Lưu'}
            </button>
          </form>
        </article>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <article className="rounded-[28px] border border-sky-100 bg-white p-4 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-6">
          <h2 className="mb-5 text-2xl font-bold text-[#27415C]">Lịch sử cân nặng</h2>

          {sortedRecords.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-sky-100 bg-[#F8FCFF] p-6 text-center font-semibold text-[#5B6B7A]">
              Chưa có lịch sử cân.
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-3xl border border-sky-50 md:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#EAF7FF] text-sm font-bold text-[#27415C]">
                    <tr>
                      <th className="px-5 py-4">Ngày đo</th>
                      <th className="px-5 py-4">Tuổi</th>
                      <th className="px-5 py-4">Cân nặng</th>
                      <th className="px-5 py-4">Đánh giá</th>
                      <th className="px-5 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-50 text-[#5B6B7A]">
                    {sortedRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="px-5 py-4 font-medium">{formatDate(record.date)}</td>
                        <td className="px-5 py-4">{record.ageMonths} tháng</td>
                        <td className="px-5 py-4 font-bold text-[#27415C]">{record.weight} kg</td>
                        <td className="px-5 py-4">
                          <span className={['rounded-full border px-3 py-1 text-sm font-bold', getEvaluationTone(record)].join(' ')}>
                            {getWeightStatus(record)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              aria-label={`Sửa số cân ${record.ageMonths} tháng`}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-[#5AAEFF] transition duration-[250ms] hover:bg-sky-100"
                              onClick={() => handleEdit(record)}
                              type="button"
                            >
                              <HugeiconsIcon icon={Edit02Icon} size={19} strokeWidth={1.7} />
                            </button>
                            <button
                              aria-label={`Xóa số cân ${record.ageMonths} tháng`}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#FF7BA9] transition duration-[250ms] hover:bg-pink-100"
                              onClick={() => handleDelete(record.id)}
                              type="button"
                            >
                              <HugeiconsIcon icon={Delete02Icon} size={19} strokeWidth={1.7} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 md:hidden">
                {sortedRecords.map((record) => (
                  <div className="rounded-3xl border border-sky-50 bg-[#F8FCFF] p-4" key={record.id}>
                    <div className="mb-3 border-b border-sky-100 pb-3">
                      <p className="text-sm font-bold text-[#5AAEFF]">{record.ageMonths} tháng</p>
                      <p className="text-2xl font-extrabold text-[#27415C]">{record.weight} kg</p>
                      <p className="text-sm text-[#5B6B7A]">{formatDate(record.date)}</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className={['rounded-full border px-3 py-1 text-xs font-bold', getEvaluationTone(record)].join(' ')}>
                        {getWeightStatus(record)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sm font-bold text-[#5AAEFF]"
                        onClick={() => handleEdit(record)}
                        type="button"
                      >
                        <HugeiconsIcon icon={Edit02Icon} size={18} strokeWidth={1.7} />
                        Sửa
                      </button>
                      <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pink-50 px-3 py-2 text-sm font-bold text-[#FF7BA9]"
                        onClick={() => handleDelete(record.id)}
                        type="button"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={18} strokeWidth={1.7} />
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[0.8fr_1.1fr_1.1fr] lg:px-8">
        <article className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-[#27415C]">
            <HugeiconsIcon icon={WeightScaleIcon} size={24} strokeWidth={1.7} />
            Chuẩn WHO
          </h2>
          <div className="grid gap-4 text-[#5B6B7A]">
            <div className="rounded-3xl bg-[#EAF7FF] p-4">
              <p className="font-bold text-[#27415C]">Bé trai</p>
              <p>{latestRecord ? `${(latestRecord.lower + 0.7).toFixed(1)}–${(latestRecord.who + 2.3).toFixed(1)} kg` : '—'}</p>
            </div>
            <div className="rounded-3xl bg-[#FFEFF6] p-4">
              <p className="font-bold text-[#27415C]">Bé gái</p>
              <p>{latestRecord ? `${latestRecord.lower.toFixed(1)}–${(latestRecord.who + 1.8).toFixed(1)} kg` : '—'}</p>
            </div>
            <button
              className="rounded-2xl bg-[#5AAEFF] px-4 py-3 font-bold text-white transition duration-[250ms] hover:bg-[#3B82F6]"
              type="button"
            >
              Xem bảng chuẩn WHO
            </button>
          </div>
        </article>

        <article className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-[#27415C]">
            <HugeiconsIcon icon={Sun01Icon} size={24} strokeWidth={1.7} />
            Mẹo dinh dưỡng
          </h2>
          <div className="grid gap-3">
            {nutritionTips.map((tip) => (
              <NavLink
                className="rounded-3xl border border-sky-50 bg-[#F8FCFF] px-4 py-3 font-semibold text-[#5B6B7A] transition duration-[250ms] hover:border-[#5AAEFF]/40 hover:text-[#5AAEFF]"
                key={tip.path}
                to={tip.path}
              >
                {tip.title}
              </NavLink>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-[#27415C]">
            <HugeiconsIcon icon={CircleQuestionMarkIcon} size={24} strokeWidth={1.7} />
            FAQ
          </h2>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details className="group rounded-3xl border border-sky-50 bg-[#F8FCFF] p-4" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#27415C]">
                  {item.question}
                  <HugeiconsIcon
                    className="shrink-0 transition duration-[250ms] group-open:rotate-180"
                    icon={ArrowDown01Icon}
                    size={18}
                    strokeWidth={1.7}
                  />
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#5B6B7A]">{item.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </section>

      <BabyInfoModal
        extraFields={[
          {
            key: 'weight',
            label: 'Cân nặng hiện tại',
            max: 100,
            min: 0.1,
            step: 0.1,
            type: 'number',
            unit: 'kg',
            value: latestRecord ? String(latestRecord.weight) : '',
            errorMessage: 'Vui lòng nhập cân nặng hợp lệ từ 0 đến 100 kg.',
          },
        ]}
        initialData={guestProfile}
        isOpen={isBabyModalOpen}
        mode={guestProfile ? 'edit' : 'create'}
        onClose={() => setIsBabyModalOpen(false)}
        onSave={handleSaveGuestBaby}
      />
    </div>
  );
}

export default WeightPage;
