import type { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CallIcon,
  Facebook01Icon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  TiktokIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons';
import footerDesktopUrl from '../assets/bg-footer.png';
import footerMobileUrl from '../assets/bg-footer-mb.png';
import logoUrl from '../assets/Logo.png';

type FooterLink = {
  label: string;
  path: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: typeof Facebook01Icon;
};

type ContactItem = {
  label: string;
  icon: typeof Mail01Icon;
};

const footerStyle = {
  '--footer-bg-desktop': `url(${footerDesktopUrl})`,
  '--footer-bg-mobile': `url(${footerMobileUrl})`,
} as CSSProperties;

const aboutLinks: FooterLink[] = [
  { label: 'Giới thiệu', path: '/gioi-thieu' },
  { label: 'Đội ngũ chuyên gia', path: '/doi-ngu-chuyen-gia' },
  { label: 'Điều khoản sử dụng', path: '/dieu-khoan-su-dung' },
  { label: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' },
];

const categoryLinks: FooterLink[] = [
  { label: 'Mang thai', path: '/mang-thai' },
  { label: 'Sau sinh', path: '/sau-sinh' },
  { label: 'Chăm sóc bé', path: '/cham-soc-be' },
  { label: 'Dinh dưỡng', path: '/dinh-duong' },
  { label: 'Sức khỏe', path: '/suc-khoe' },
  { label: 'Hỏi đáp', path: '/hoi-dap' },
];

const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook01Icon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
  { label: 'TikTok', href: 'https://tiktok.com', icon: TiktokIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
];

const contactItems: ContactItem[] = [
  { label: 'hello@mecobiet.vn', icon: Mail01Icon },
  { label: '0123 456 789', icon: CallIcon },
  { label: 'Việt Nam', icon: Location01Icon },
];

function FooterLinkList({
  links,
  motion = 'underline',
}: {
  links: FooterLink[];
  motion?: 'shift' | 'underline';
}) {
  return (
    <ul className="grid gap-3">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            className={[
              'inline-block text-base font-medium text-[#5B6B7A] transition duration-[250ms] hover:text-[#5AAEFF]',
              motion === 'shift'
                ? 'hover:translate-x-1'
                : 'underline-offset-4 hover:underline',
            ].join(' ')}
            to={link.path}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="site-footer px-6 pb-6 pt-14 md:px-20 md:pb-8 md:pt-20" style={footerStyle}>
      <div className="mx-auto w-full max-w-[420px] md:max-w-7xl">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center md:gap-12 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <NavLink
              aria-label="Mẹ Có Biết"
              className="mb-5 flex items-center justify-center gap-3 rounded-lg outline-none transition duration-[250ms] focus-visible:ring-4 focus-visible:ring-sky-200 md:justify-start"
              to="/"
            >
              <img
                alt="Logo Mẹ Có Biết"
                className="h-14 w-14 rounded-2xl object-contain"
                src={logoUrl}
              />
              <span className="text-xl font-extrabold leading-tight text-[#27415C]">
                Mẹ Có Biết
              </span>
            </NavLink>

            <p className="mb-5 max-w-[280px] text-[15px] leading-[1.8] text-[#5B6B7A]">
              Đồng hành cùng mẹ trên hành trình nuôi con hạnh phúc.
            </p>

            <div className="flex items-center justify-center gap-3 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-100/80 bg-white/70 text-[#5B6B7A] shadow-sm shadow-sky-100/70 backdrop-blur transition duration-[250ms] hover:scale-[1.08] hover:border-[#5AAEFF]/50 hover:text-[#5AAEFF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                  href={social.href}
                  key={social.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <HugeiconsIcon icon={social.icon} size={21} strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold text-[#27415C]">Về chúng tôi</h2>
            <FooterLinkList links={aboutLinks} />
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold text-[#27415C]">Chuyên mục</h2>
            <FooterLinkList links={categoryLinks} motion="shift" />
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold text-[#27415C]">Liên hệ</h2>
            <ul className="grid gap-3">
              {contactItems.map((item) => (
                <li
                  className="flex items-center justify-center gap-3 text-base font-medium text-[#5B6B7A] md:justify-start"
                  key={item.label}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-100 bg-white/70 text-[#FF8FB8] shadow-sm shadow-pink-100/60 backdrop-blur">
                    <HugeiconsIcon icon={item.icon} size={19} strokeWidth={1.7} />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[rgba(232,238,246,.8)] pt-6 text-center text-sm font-medium text-[#5B6B7A] md:mt-14 md:flex-row md:text-left">
          <p className="m-0">© 2026 Mẹ Có Biết. All Rights Reserved.</p>
          <p className="m-0">Made with ❤ for Moms & Babies</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
