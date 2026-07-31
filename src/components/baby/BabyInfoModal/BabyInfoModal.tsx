import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

export type BabyGender = 'girl' | 'boy';

export type BabyInfoData = {
  id?: string;
  name: string;
  gender: BabyGender;
  birthDate: string;
};

export type BabyInfoExtraField = {
  key: string;
  label: string;
  unit?: string;
  type?: 'number' | 'text';
  min?: number;
  max?: number;
  step?: number;
  value?: string;
  errorMessage?: string;
};

type BabyInfoModalProps = {
  extraFields?: BabyInfoExtraField[];
  initialData?: BabyInfoData;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onSave: (babyInfo: Required<BabyInfoData>, extraValues: Record<string, string>) => void;
};

function BabyInfoModal({
  extraFields = [],
  initialData,
  isOpen,
  onClose,
  onSave,
}: BabyInfoModalProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [gender, setGender] = useState<BabyGender>(initialData?.gender ?? 'girl');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate ?? '');
  const [extraValues, setExtraValues] = useState<Record<string, string>>(() =>
    extraFields.reduce<Record<string, string>>((values, field) => {
      values[field.key] = field.value ?? '';
      return values;
    }, {}),
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(initialData?.name ?? '');
    setGender(initialData?.gender ?? 'girl');
    setBirthDate(initialData?.birthDate ?? '');
    setExtraValues(
      extraFields.reduce<Record<string, string>>((values, field) => {
        values[field.key] = field.value ?? '';
        return values;
      }, {}),
    );
    setError('');
  }, [extraFields, initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !birthDate) {
      setError('Vui lòng nhập đầy đủ thông tin bé.');
      return;
    }

    const invalidField = extraFields.find((field) => {
      const value = extraValues[field.key] ?? '';

      if (!value.trim()) {
        return true;
      }

      if (field.type === 'number') {
        const parsedValue = Number(value);
        return (
          Number.isNaN(parsedValue) ||
          (field.min !== undefined && parsedValue < field.min) ||
          (field.max !== undefined && parsedValue > field.max)
        );
      }

      return false;
    });

    if (invalidField) {
      setError(invalidField.errorMessage ?? `Vui lòng nhập ${invalidField.label.toLowerCase()} hợp lệ.`);
      return;
    }

    onSave(
      {
        id: initialData?.id ?? 'guest-baby',
        name: name.trim(),
        gender,
        birthDate,
      },
      extraValues,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
      <form
        className="w-[min(90vw,480px)] rounded-[28px] bg-white p-6 shadow-2xl shadow-sky-200/60 sm:p-7"
        onSubmit={handleSave}
      >
        <h2 className="mb-5 text-2xl font-bold text-[#27415C]">Thông tin bé</h2>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-[#27415C]">
            Tên bé
            <input
              className="rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#27415C]">
            Giới tính
            <select
              className="rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
              onChange={(event) => setGender(event.target.value as BabyGender)}
              value={gender}
            >
              <option value="girl">Bé gái</option>
              <option value="boy">Bé trai</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#27415C]">
            Ngày sinh
            <input
              className="rounded-2xl border border-sky-100 bg-[#F8FCFF] px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100"
              onChange={(event) => setBirthDate(event.target.value)}
              type="date"
              value={birthDate}
            />
          </label>

          {extraFields.map((field) => (
            <label className="grid gap-2 text-sm font-bold text-[#27415C]" key={field.key}>
              {field.label}
              <div className="flex items-center overflow-hidden rounded-2xl border border-sky-100 bg-[#F8FCFF] focus-within:border-[#5AAEFF] focus-within:ring-4 focus-within:ring-sky-100">
                <input
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-medium text-[#5B6B7A] outline-none"
                  max={field.max}
                  min={field.min}
                  onChange={(event) =>
                    setExtraValues((currentValues) => ({
                      ...currentValues,
                      [field.key]: event.target.value,
                    }))
                  }
                  step={field.step}
                  type={field.type ?? 'text'}
                  value={extraValues[field.key] ?? ''}
                />
                {field.unit ? <span className="px-4 text-sm font-bold text-[#5B6B7A]">{field.unit}</span> : null}
              </div>
            </label>
          ))}
        </div>

        {error ? <p className="mt-4 text-sm font-semibold text-[#D97706]">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-[#5B6B7A] transition duration-[250ms] hover:bg-slate-200"
            onClick={onClose}
            type="button"
          >
            Huỷ
          </button>
          <button
            className="rounded-2xl bg-[#5AAEFF] px-5 py-3 font-bold text-white shadow-lg shadow-sky-200 transition duration-[250ms] hover:bg-[#3B82F6]"
            type="submit"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default BabyInfoModal;
