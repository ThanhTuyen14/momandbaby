import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  Baby01Icon,
  CircleQuestionMarkIcon,
  Delete02Icon,
  Edit02Icon,
  RulerIcon,
  SaveIcon,
  Sun01Icon,
} from '@hugeicons/core-free-icons';
import BabyInfoModal from '../../components/baby/BabyInfoModal';
import type { BabyGender, BabyInfoData } from '../../components/baby/BabyInfoModal';
import GrowthChart from '../../components/growth/GrowthChart';
import heightIllustrationUrl from '../../assets/chieucao.png';

type BabyProfile = Required<BabyInfoData>;

type GrowthRecord = {
  id: number;
  date: string;
  ageMonths: number;
  height: number;
  who: number;
  lower: number;
};

type AccountBaby = BabyProfile & {
  records: GrowthRecord[];
};

type HeightPageProps = {
  isAuthenticated?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

const whoReference: GrowthRecord[] = [
  { id: 1, date: '2025-06-10', ageMonths: 6, height: 65.2, who: 65.7, lower: 62.1 },
  { id: 2, date: '2025-09-10', ageMonths: 9, height: 70.1, who: 70.1, lower: 66.8 },
  { id: 3, date: '2025-12-10', ageMonths: 12, height: 74.3, who: 74.0, lower: 70.3 },
  { id: 4, date: '2026-03-10', ageMonths: 15, height: 78.0, who: 77.5, lower: 73.7 },
  { id: 5, date: '2026-06-10', ageMonths: 18, height: 81.2, who: 80.7, lower: 76.9 },
  { id: 6, date: '2026-07-10', ageMonths: 19, height: 82.1, who: 81.7, lower: 77.7 },
];

const accountBabies: AccountBaby[] = [
  {
    id: 'bong',
    name: 'Bé Bông',
    gender: 'girl',
    birthDate: '2024-12-10',
    records: whoReference,
  },
  {
    id: 'bin',
    name: 'Bé Bin',
    gender: 'boy',
    birthDate: '2024-10-05',
    records: [
      { id: 11, date: '2025-04-05', ageMonths: 6, height: 66.4, who: 67.6, lower: 63.3 },
      { id: 12, date: '2025-07-05', ageMonths: 9, height: 71.6, who: 72.0, lower: 67.7 },
      { id: 13, date: '2025-10-05', ageMonths: 12, height: 75.5, who: 75.7, lower: 71.0 },
      { id: 14, date: '2026-01-05', ageMonths: 15, height: 79.1, who: 79.1, lower: 74.4 },
      { id: 15, date: '2026-04-05', ageMonths: 18, height: 82.4, who: 82.3, lower: 77.2 },
    ],
  },
  {
    id: 'miu',
    name: 'Bé Miu',
    gender: 'girl',
    birthDate: '2025-01-20',
    records: [
      { id: 21, date: '2025-07-20', ageMonths: 6, height: 64.4, who: 65.7, lower: 62.1 },
      { id: 22, date: '2025-10-20', ageMonths: 9, height: 68.8, who: 70.1, lower: 66.8 },
      { id: 23, date: '2026-01-20', ageMonths: 12, height: 72.2, who: 74.0, lower: 70.3 },
      { id: 24, date: '2026-04-20', ageMonths: 15, height: 75.1, who: 77.5, lower: 73.7 },
    ],
  },
];

const expertTips = [
  { title: 'Thực phẩm giúp tăng chiều cao', path: '/dinh-duong/thuc-pham-tang-chieu-cao' },
  { title: 'Vai trò của Vitamin D', path: '/suc-khoe/vai-tro-vitamin-d' },
  {
    title: 'Giấc ngủ ảnh hưởng đến chiều cao như thế nào?',
    path: '/suc-khoe/giac-ngu-va-chieu-cao',
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Bé tăng bao nhiêu cm mỗi tháng?',
    answer:
      'Tốc độ tăng chiều cao thay đổi theo độ tuổi. Trong năm đầu, bé thường tăng nhanh hơn, sau đó chậm dần và nên được theo dõi định kỳ.',
  },
  {
    question: 'Khi nào cần đưa bé đi khám?',
    answer:
      'Nếu chiều cao liên tục dưới ngưỡng chuẩn, tăng trưởng chậm bất thường hoặc bé có dấu hiệu mệt mỏi, biếng ăn kéo dài, phụ huynh nên đưa bé đi khám.',
  },
  {
    question: 'Bao lâu nên đo chiều cao một lần?',
    answer:
      'Với trẻ nhỏ, phụ huynh có thể đo mỗi tháng một lần và ghi lại cùng ngày để dễ so sánh xu hướng phát triển.',
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

const getEvaluation = (record?: GrowthRecord) => {
  if (!record) {
    return '—';
  }

  if (record.height < record.lower) {
    return 'Dưới chuẩn';
  }

  if (record.height >= record.who) {
    return 'Đạt chuẩn';
  }

  return 'Theo dõi thêm';
};

const getEvaluationTone = (record?: GrowthRecord) => {
  if (!record) {
    return 'border-slate-100 bg-slate-50 text-slate-500';
  }

  if (record.height < record.lower) {
    return 'border-amber-100 bg-[#FFF8DA] text-[#8A6514]';
  }

  if (record.height >= record.who) {
    return 'border-emerald-100 bg-[#ECFFF5] text-[#207A52]';
  }

  return 'border-sky-100 bg-[#EEF8FF] text-[#2F6D9E]';
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
  const genderOffset = gender === 'boy' ? 1.7 : 0;
  const ordered = [...whoReference].sort((first, second) => first.ageMonths - second.ageMonths);
  const lowerBound = ordered[0];
  const upperBound = ordered[ordered.length - 1];

  if (ageMonths <= lowerBound.ageMonths) {
    return { who: lowerBound.who + genderOffset, lower: lowerBound.lower + genderOffset };
  }

  if (ageMonths >= upperBound.ageMonths) {
    const extraMonths = ageMonths - upperBound.ageMonths;

    return {
      who: Number((upperBound.who + genderOffset + extraMonths * 0.8).toFixed(1)),
      lower: Number((upperBound.lower + genderOffset + extraMonths * 0.75).toFixed(1)),
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

const buildRecord = (profile: BabyProfile, date: string, height: number): GrowthRecord => {
  const ageMonths = estimateAgeMonths(profile.birthDate, date);
  const standard = getWhoStandard(ageMonths, profile.gender);

  return {
    id: Date.now(),
    date,
    ageMonths,
    height: Number(height.toFixed(1)),
    who: standard.who,
    lower: standard.lower,
  };
};

function HeightPage({ isAuthenticated = false }: HeightPageProps) {
  const [selectedBabyId, setSelectedBabyId] = useState(accountBabies[0].id);
  const selectedAccountBaby = accountBabies.find((baby) => baby.id === selectedBabyId) ?? accountBabies[0];
  const [guestProfile, setGuestProfile] = useState<BabyProfile | undefined>();
  const [guestRecords, setGuestRecords] = useState<GrowthRecord[]>([]);
  const [accountRecordsByBaby, setAccountRecordsByBaby] = useState<Record<string, GrowthRecord[]>>(
    () =>
      accountBabies.reduce<Record<string, GrowthRecord[]>>((recordsByBaby, baby) => {
        recordsByBaby[baby.id] = baby.records;
        return recordsByBaby;
      }, {}),
  );
  const [date, setDate] = useState(today);
  const [height, setHeight] = useState('');
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
  const isUnderStandard = Boolean(latestRecord && latestRecord.height < latestRecord.lower);
  const currentAge = latestRecord ? `${latestRecord.ageMonths} tháng` : '—';
  const chartData = sortedRecords.map((record) => ({
    id: record.id,
    date: record.date,
    ageMonths: record.ageMonths,
    value: record.height,
    who: record.who,
    lower: record.lower,
  }));

  const saveRecords = (nextRecords: GrowthRecord[]) => {
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
    setHeight('');
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
      setError('Vui lòng thêm thông tin bé trước khi lưu chiều cao.');
      return;
    }

    const parsedHeight = Number(height);

    if (!date || Number.isNaN(parsedHeight) || parsedHeight <= 0 || parsedHeight > 200) {
      setError('Vui lòng nhập chiều cao lớn hơn 0 và không quá 200 cm.');
      return;
    }

    const nextRecord = {
      ...buildRecord(activeProfile, date, parsedHeight),
      id: editingId ?? Date.now(),
    };

    saveRecords(
      editingId
        ? records.map((record) => (record.id === editingId ? nextRecord : record))
        : [...records, nextRecord],
    );
    resetInput();
  };

  const handleEdit = (record: GrowthRecord) => {
    setEditingId(record.id);
    setDate(record.date);
    setHeight(String(record.height));
    setError('');
  };

  const handleDelete = (recordId: number) => {
    if (records.length <= 1) {
      return;
    }

    saveRecords(records.filter((record) => record.id !== recordId));
  };

  const handleSaveGuestBaby = (profile: BabyProfile, extraValues: Record<string, string>) => {
    const currentHeight = Number(extraValues.height);
    const firstRecord = buildRecord(profile, today, currentHeight);
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
            <HugeiconsIcon icon={RulerIcon} size={20} strokeWidth={1.7} />
            Công cụ tăng trưởng
          </p>
          <h1 className="mb-4 text-[36px] font-extrabold leading-tight text-[#27415C] sm:text-5xl">
            Theo dõi chiều cao
          </h1>
          <p className="max-w-xl text-base leading-8 text-[#5B6B7A] sm:text-lg">
            Theo dõi sự phát triển chiều cao của bé theo từng tháng và so sánh với chuẩn WHO.
          </p>
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-[32px] bg-[#EAF7FF] p-8 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <img
            alt="Bé đang đo chiều cao với thước đo"
            className="h-full max-h-[320px] w-full object-contain"
            src={heightIllustrationUrl}
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
                ['Giới tính', getGenderLabel(activeProfile?.gender)],
                ['Ngày sinh', formatDisplayDate(activeProfile?.birthDate)],
                ['Tuổi', currentAge],
                ['Chiều cao hiện tại', latestRecord ? `${latestRecord.height} cm` : '—'],
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
          emptyMessage="Chưa có dữ liệu chiều cao. Bấm Chỉnh sửa để thêm thông tin bé."
          maxValuePadding={3}
          minValuePadding={3}
          showMarkerValues={false}
          title="Chiều cao theo tháng"
          type="height"
          unit="cm"
        />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <article
          className={[
            'rounded-[28px] border p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]',
            isUnderStandard ? 'border-amber-100 bg-[#FFF8DA]' : 'border-emerald-100 bg-[#ECFFF5]',
          ].join(' ')}
        >
          <h2 className="mb-3 text-2xl font-bold text-[#27415C]">Đánh giá</h2>
          {!latestRecord ? (
            <div className="space-y-3 text-[#5B6B7A]">
              <p className="font-bold text-[#27415C]">Chưa có dữ liệu chiều cao.</p>
              <p>Thêm thông tin bé để hệ thống tự động so sánh với chuẩn WHO.</p>
            </div>
          ) : isUnderStandard ? (
            <div className="text-[#5B6B7A]">
              <p className="mb-3 font-bold text-[#8A6514]">Chiều cao thấp hơn chuẩn WHO.</p>
              <p className="mb-3 font-semibold">Khuyến nghị:</p>
              <ul className="grid gap-2 pl-5">
                <li>Bổ sung Canxi</li>
                <li>Vitamin D</li>
                <li>Ngủ đủ</li>
                <li>Vận động ngoài trời</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-[#5B6B7A]">
              <p className="font-bold text-[#207A52]">Chiều cao của bé đang phát triển bình thường.</p>
              <p>Đạt chuẩn WHO.</p>
              <p>Tiếp tục duy trì chế độ dinh dưỡng và vận động phù hợp.</p>
            </div>
          )}
        </article>

        <article className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_18px_50px_rgba(65,105,140,0.08)]">
          <h2 className="mb-5 text-2xl font-bold text-[#27415C]">Nhập chiều cao mới</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-bold text-[#27415C]">
              Ngày đo
              <input
                className="rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none transition duration-[250ms] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!activeProfile}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#27415C]">
              Chiều cao
              <div className="flex items-center overflow-hidden rounded-2xl border border-sky-100 bg-[#F8FCFF] focus-within:border-[#5AAEFF] focus-within:ring-4 focus-within:ring-sky-100">
                <input
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!activeProfile}
                  max="200"
                  min="0.1"
                  onChange={(event) => setHeight(event.target.value)}
                  placeholder="Nhập chiều cao"
                  step="0.1"
                  type="number"
                  value={height}
                />
                <span className="px-4 text-sm font-bold text-[#5B6B7A]">cm</span>
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
          <h2 className="mb-5 text-2xl font-bold text-[#27415C]">Lịch sử đo</h2>

          {sortedRecords.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-sky-100 bg-[#F8FCFF] p-6 text-center font-semibold text-[#5B6B7A]">
              Chưa có lịch sử đo.
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-3xl border border-sky-50 md:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#EAF7FF] text-sm font-bold text-[#27415C]">
                    <tr>
                      <th className="px-5 py-4">Ngày đo</th>
                      <th className="px-5 py-4">Tuổi</th>
                      <th className="px-5 py-4">Chiều cao</th>
                      <th className="px-5 py-4">Đánh giá</th>
                      <th className="px-5 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-50 text-[#5B6B7A]">
                    {sortedRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="px-5 py-4 font-medium">{formatDate(record.date)}</td>
                        <td className="px-5 py-4">{record.ageMonths} tháng</td>
                        <td className="px-5 py-4 font-bold text-[#27415C]">{record.height} cm</td>
                        <td className="px-5 py-4">
                          <span className={['rounded-full border px-3 py-1 text-sm font-bold', getEvaluationTone(record)].join(' ')}>
                            {getEvaluation(record)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              aria-label={`Sửa số đo ${record.ageMonths} tháng`}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-[#5AAEFF] transition duration-[250ms] hover:bg-sky-100"
                              onClick={() => handleEdit(record)}
                              type="button"
                            >
                              <HugeiconsIcon icon={Edit02Icon} size={19} strokeWidth={1.7} />
                            </button>
                            <button
                              aria-label={`Xóa số đo ${record.ageMonths} tháng`}
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
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-[#5AAEFF]">{record.ageMonths} tháng</p>
                        <p className="text-2xl font-extrabold text-[#27415C]">{record.height} cm</p>
                        <p className="text-sm text-[#5B6B7A]">{formatDate(record.date)}</p>
                      </div>
                      <span className={['rounded-full border px-3 py-1 text-xs font-bold', getEvaluationTone(record)].join(' ')}>
                        {getEvaluation(record)}
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
            <HugeiconsIcon icon={RulerIcon} size={24} strokeWidth={1.7} />
            Chiều cao chuẩn WHO
          </h2>
          <div className="grid gap-4 text-[#5B6B7A]">
            <div className="rounded-3xl bg-[#EAF7FF] p-4">
              <p className="font-bold text-[#27415C]">Bé trai</p>
              <p>{latestRecord ? `${(latestRecord.lower + 1.7).toFixed(1)}–${(latestRecord.who + 5.8).toFixed(1)} cm` : '—'}</p>
            </div>
            <div className="rounded-3xl bg-[#FFEFF6] p-4">
              <p className="font-bold text-[#27415C]">Bé gái</p>
              <p>{latestRecord ? `${latestRecord.lower.toFixed(1)}–${(latestRecord.who + 4.1).toFixed(1)} cm` : '—'}</p>
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
            Mẹo từ chuyên gia
          </h2>
          <div className="grid gap-3">
            {expertTips.map((tip) => (
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
            key: 'height',
            label: 'Chiều cao hiện tại',
            max: 200,
            min: 0.1,
            step: 0.1,
            type: 'number',
            unit: 'cm',
            value: latestRecord ? String(latestRecord.height) : '',
            errorMessage: 'Vui lòng nhập chiều cao hợp lệ từ 0 đến 200 cm.',
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

export default HeightPage;
