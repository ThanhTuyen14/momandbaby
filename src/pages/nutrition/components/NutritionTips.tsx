import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  BookOpen01Icon,
  BulbIcon,
  CircleQuestionMarkIcon,
} from '@hugeicons/core-free-icons';

type NutritionTipsProps = {
  tips: string[];
};

const articles = [
  { title: '10 thực phẩm giàu Canxi.', path: '/dinh-duong/thuc-pham-giau-canxi' },
  { title: 'Bé biếng ăn nên làm gì?', path: '/cham-soc-be/be-bieng-an' },
  { title: 'Những thực phẩm không nên ăn cùng nhau.', path: '/dinh-duong/thuc-pham-khong-nen-an-cung' },
];

const faqItems = [
  {
    question: 'Bé nên ăn bao nhiêu bữa mỗi ngày?',
    answer: 'Tùy độ tuổi, trẻ thường có 3 bữa chính và 1-2 bữa phụ. Quan trọng là khẩu phần vừa sức và giàu dinh dưỡng.',
  },
  {
    question: 'Khi nào bắt đầu ăn dặm?',
    answer: 'Thông thường quanh 6 tháng tuổi, khi bé đã sẵn sàng phát triển và sữa mẹ/sữa công thức không còn đáp ứng đủ nhu cầu năng lượng.',
  },
  {
    question: 'Có nên cho bé uống nước ép?',
    answer: 'Nên ưu tiên trái cây nguyên miếng hoặc nghiền phù hợp độ tuổi. Nước ép dễ làm bé no và giảm hứng thú với món giàu dưỡng chất hơn.',
  },
  {
    question: 'Trẻ bị dị ứng nên ăn gì?',
    answer: 'Loại bỏ đúng thực phẩm gây dị ứng, đọc kỹ thành phần và hỏi chuyên gia nếu bé từng có phản ứng nặng.',
  },
];

function NutritionTips({ tips }: NutritionTipsProps) {
  const [openQuestion, setOpenQuestion] = useState(faqItems[0].question);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
          <HugeiconsIcon icon={BulbIcon} size={20} strokeWidth={1.7} />
          Mẹo dinh dưỡng
        </p>
        <div className="grid gap-3">
          {tips.map((tip) => (
            <p className="rounded-2xl bg-[#F8FCFF] px-4 py-3 text-sm font-semibold leading-7 text-[#5B6B7A]" key={tip}>
              {tip}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
          <HugeiconsIcon icon={BookOpen01Icon} size={20} strokeWidth={1.7} />
          Mẹo từ chuyên gia
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {articles.map((article) => (
            <NavLink
              className="rounded-[22px] bg-[#FFF9E8] p-4 text-sm font-bold leading-6 text-[#27415C] transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#FFF5E8]"
              key={article.path}
              to={article.path}
            >
              {article.title}
            </NavLink>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(65,105,140,0.08)] sm:p-7 lg:col-span-2">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[#5AAEFF]">
          <HugeiconsIcon icon={CircleQuestionMarkIcon} size={20} strokeWidth={1.7} />
          FAQ
        </p>
        <div className="grid gap-3">
          {faqItems.map((item) => {
            const isOpen = item.question === openQuestion;

            return (
              <article className="rounded-2xl border border-sky-100 bg-[#F8FCFF]" key={item.question}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-bold text-[#27415C]"
                  onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
                  type="button"
                >
                  {item.question}
                  <HugeiconsIcon
                    className={['shrink-0 transition duration-[250ms]', isOpen ? 'rotate-180' : ''].join(' ')}
                    icon={ArrowDown01Icon}
                    size={20}
                    strokeWidth={1.7}
                  />
                </button>
                {isOpen ? (
                  <p className="px-4 pb-4 text-sm font-medium leading-7 text-[#5B6B7A]">{item.answer}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default NutritionTips;
