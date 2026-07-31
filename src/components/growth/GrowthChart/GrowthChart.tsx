import { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChartLineData01Icon } from '@hugeicons/core-free-icons';
import type { BabyGender } from '../../baby/BabyInfoModal';

export type GrowthChartDataPoint = {
  ageMonths: number;
  date: string;
  id: number;
  lower: number;
  value: number;
  who: number;
};

type GrowthChartProps = {
  chartData: GrowthChartDataPoint[];
  childGender?: BabyGender;
  emptyMessage: string;
  maxValuePadding?: number;
  minValuePadding?: number;
  title: string;
  type: 'height' | 'weight';
  unit: string;
  valueLabelOffset?: number;
  showMarkerValues?: boolean;
};

const chartSizes = {
  height: {
    width: 720,
    height: 320,
    paddingTop: 24,
    paddingRight: 28,
    paddingBottom: 58,
    paddingLeft: 56,
  },
  weight: {
    width: 720,
    height: 320,
    paddingTop: 32,
    paddingRight: 28,
    paddingBottom: 58,
    paddingLeft: 54,
  },
};

const formatShortDate = (value: string) => {
  const [, month, day] = value.split('-');
  return `${day}/${month}`;
};

const buildPath = (
  records: GrowthChartDataPoint[],
  valueKey: 'value' | 'who' | 'lower',
  scale: (age: number, value: number) => { x: number; y: number },
) =>
  records
    .map((record, index) => {
      const point = scale(record.ageMonths, record[valueKey]);

      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ');

function GrowthChart({
  chartData,
  childGender,
  emptyMessage,
  maxValuePadding,
  minValuePadding = 0,
  showMarkerValues = true,
  title,
  type,
  unit,
  valueLabelOffset = 13,
}: GrowthChartProps) {
  const chartSize = chartSizes[type];
  const childColor = childGender === 'boy' ? '#4AA8FF' : '#FF7BA9';
  const genderLabel = childGender === 'boy' ? 'Bé trai' : 'Bé gái';

  const chartMeta = useMemo(() => {
    if (chartData.length === 0) {
      return null;
    }

    const sortedRecords = [...chartData].sort((first, second) => first.ageMonths - second.ageMonths);
    const ages = sortedRecords.map((record) => record.ageMonths);
    const values = sortedRecords.flatMap((record) => [record.value, record.who, record.lower]);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    const minValue = Math.max(0, Math.floor(Math.min(...values) - minValuePadding));
    const maxValue = Math.ceil(Math.max(...values) + (maxValuePadding ?? minValuePadding));
    const innerWidth = chartSize.width - chartSize.paddingLeft - chartSize.paddingRight;
    const innerHeight = chartSize.height - chartSize.paddingTop - chartSize.paddingBottom;
    const labelStep = Math.max(1, Math.ceil(sortedRecords.length / 6));

    const scale = (age: number, value: number) => ({
      x:
        chartSize.paddingLeft +
        ((age - minAge) / Math.max(maxAge - minAge, 1)) * innerWidth,
      y:
        chartSize.paddingTop +
        ((maxValue - value) / Math.max(maxValue - minValue, 1)) * innerHeight,
    });

    const whoPoints = sortedRecords.map((record) => scale(record.ageMonths, record.who));
    const lowerPoints = sortedRecords.map((record) => scale(record.ageMonths, record.lower));
    const normalArea = [
      ...whoPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`),
      ...lowerPoints.reverse().map((point) => `L ${point.x} ${point.y}`),
      'Z',
    ].join(' ');

    return {
      sortedRecords,
      labelStep,
      minValue,
      maxValue,
      scale,
      normalArea,
      childPath: buildPath(sortedRecords, 'value', scale),
      whoPath: buildPath(sortedRecords, 'who', scale),
      lowerPath: buildPath(sortedRecords, 'lower', scale),
    };
  }, [chartData, chartSize, maxValuePadding, minValuePadding]);

  return (
    <div className="rounded-[28px] border border-sky-100 bg-white p-4 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
            <HugeiconsIcon icon={ChartLineData01Icon} size={20} strokeWidth={1.7} />
            Biểu đồ tăng trưởng
          </p>
          <h2 className="text-2xl font-bold text-[#27415C]">{title}</h2>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#5B6B7A]">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: childColor }} />
            {genderLabel}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#3BB273]" />
            Chuẩn WHO
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F4C542]" />
            Dưới chuẩn
          </span>
        </div>
      </div>

      {!chartMeta ? (
        <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border border-dashed border-sky-100 bg-[#F8FCFF] px-6 text-center font-semibold text-[#5B6B7A]">
          {emptyMessage}
        </div>
      ) : (
        <div className={type === 'height' ? 'overflow-x-auto pb-2' : undefined}>
          <svg
            aria-label={`Biểu đồ ${type === 'height' ? 'chiều cao' : 'cân nặng'} của bé so với chuẩn WHO`}
            className={type === 'height' ? 'h-auto min-w-[680px] overflow-visible' : 'h-auto w-full overflow-visible'}
            role="img"
            viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
          >
            <path d={chartMeta.normalArea} fill="#3BB273" opacity="0.09" />

            {[0, 1, 2, 3].map((line) => {
              const y =
                chartSize.paddingTop +
                ((chartSize.height - chartSize.paddingTop - chartSize.paddingBottom) / 3) * line;

              return (
                <line
                  key={line}
                  stroke="#E8EEF6"
                  strokeWidth="1"
                  x1={chartSize.paddingLeft}
                  x2={chartSize.width - chartSize.paddingRight}
                  y1={y}
                  y2={y}
                />
              );
            })}

            <line
              stroke="#D6E4F2"
              strokeWidth="1.5"
              x1={chartSize.paddingLeft}
              x2={chartSize.paddingLeft}
              y1={chartSize.paddingTop}
              y2={chartSize.height - chartSize.paddingBottom}
            />
            <line
              stroke="#D6E4F2"
              strokeWidth="1.5"
              x1={chartSize.paddingLeft}
              x2={chartSize.width - chartSize.paddingRight}
              y1={chartSize.height - chartSize.paddingBottom}
              y2={chartSize.height - chartSize.paddingBottom}
            />

            <path d={chartMeta.whoPath} fill="none" stroke="#3BB273" strokeLinecap="round" strokeWidth="2.5" />
            <path
              d={chartMeta.lowerPath}
              fill="none"
              stroke="#F4C542"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path d={chartMeta.childPath} fill="none" stroke={childColor} strokeLinecap="round" strokeWidth="3" />

            {chartMeta.sortedRecords.map((record, index) => {
              const point = chartMeta.scale(record.ageMonths, record.value);
              const shouldShowLabel =
                index % chartMeta.labelStep === 0 || index === chartMeta.sortedRecords.length - 1;

              return (
                <g key={record.id}>
                  {showMarkerValues ? (
                    <text
                      fill={childColor}
                      fontSize="12"
                      fontWeight="800"
                      textAnchor="middle"
                      x={point.x}
                      y={point.y - valueLabelOffset}
                    >
                      {record.value}{unit}
                    </text>
                  ) : null}
                  <circle cx={point.x} cy={point.y} fill="#fff" r="7" stroke={childColor} strokeWidth="3" />
                  {shouldShowLabel ? (
                    <text
                      fill="#5B6B7A"
                      fontSize="12"
                      fontWeight="600"
                      textAnchor="middle"
                      x={point.x}
                      y={chartSize.height - chartSize.paddingBottom + 24}
                    >
                      {formatShortDate(record.date)}
                    </text>
                  ) : null}
                </g>
              );
            })}

            <text fill="#5B6B7A" fontSize="13" fontWeight="600" x={chartSize.width / 2 - 22} y="310">
              {type === 'weight' ? 'Ngày đo' : 'Tuổi (tháng)'}
            </text>
            <text fill="#5B6B7A" fontSize="13" fontWeight="600" transform="rotate(-90 18 166)" x="18" y="166">
              {unit}
            </text>
            <text fill="#7A8A99" fontSize="12" x="18" y={chartSize.paddingTop + 5}>
              {chartMeta.maxValue}
            </text>
            <text fill="#7A8A99" fontSize="12" x="18" y={chartSize.height - chartSize.paddingBottom + 4}>
              {chartMeta.minValue}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

export default GrowthChart;
