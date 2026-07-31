import { NavLink } from "react-router-dom";
import canNangUrl from "../../../assets/cannang.png";
import chieuCaoUrl from "../../../assets/chieucao.png";
import dinhDuongUrl from "../../../assets/dinhduong.png";
import duSinhUrl from "../../../assets/dusinh.png";
import lichTiemUrl from "../../../assets/lichtiem.png";

type UsefulTool = {
  title: string;
  imageUrl: string;
  backgroundColor: string;
  path: string;
};

const usefulTools: UsefulTool[] = [
  {
    title: "Theo dõi chiều cao",
    imageUrl: chieuCaoUrl,
    backgroundColor: "#EAF7FF",
    path: "/height",
  },
  {
    title: "Theo dõi cân nặng",
    imageUrl: canNangUrl,
    backgroundColor: "#FFF5E8",
    path: "/weight",
  },
  {
    title: "Gợi ý dinh dưỡng",
    imageUrl: dinhDuongUrl,
    backgroundColor: "#FFF9E8",
    path: "/nutrition",
  },
  {
    title: "Tính ngày dự sinh",
    imageUrl: duSinhUrl,
    backgroundColor: "#FFEFF6",
    path: "/cong-cu/tinh-ngay-du-sinh",
  },
  {
    title: "Lịch tiêm chủng",
    imageUrl: lichTiemUrl,
    backgroundColor: "#EEF9F2",
    path: "/cong-cu/lich-tiem-chung",
  },
];

function UsefulToolsSection() {
  return (
    <section
      aria-labelledby="useful-tools-heading"
      className="useful-tools-section mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <h2
        className="mb-7 text-[28px] font-bold leading-tight text-[#1F3B64] md:mb-8 md:text-4xl"
        id="useful-tools-heading"
      >
        Công cụ hữu ích cho mẹ
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5">
        {usefulTools.map((tool) => (
          <NavLink
            aria-label={tool.title}
            className="group flex aspect-square min-h-[156px] cursor-pointer flex-col items-center justify-center rounded-[24px] p-6 text-center shadow-[0_14px_34px_rgba(75,104,133,0.1)] transition duration-[250ms] hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_44px_rgba(75,104,133,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            key={tool.path}
            style={{ backgroundColor: tool.backgroundColor }}
            to={tool.path}
          >
            <img
              alt=""
              aria-hidden="true"
              className="mb-4 h-[60px] w-[60px] object-contain transition duration-[250ms] group-hover:scale-105 md:h-[72px] md:w-[72px]"
              src={tool.imageUrl}
            />
            <span className="text-base font-semibold leading-[1.4] text-[#29415D] md:text-lg">
              {tool.title}
            </span>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default UsefulToolsSection;
