import type { CSSProperties } from 'react';
import heroBannerDesktopUrl from '../../../assets/hero-banner-desktop.png';
import heroBannerMobileUrl from '../../../assets/hero-banner-mobile.png';

const heroStyle = {
  '--hero-banner-desktop': `url(${heroBannerDesktopUrl})`,
  '--hero-banner-mobile': `url(${heroBannerMobileUrl})`,
} as CSSProperties;

function HeroBanner() {
  return (
    <section
      aria-label="Đồng hành cùng mẹ trên hành trình nuôi con hạnh phúc"
      className="hero-banner flex h-[420px] items-start justify-center px-6 pt-12 text-center md:h-[500px] md:items-center md:justify-start md:px-12 md:pt-0 md:text-left lg:h-[540px] lg:px-0 lg:pl-20 xl:h-[560px] xl:pl-24"
      style={heroStyle}
    >
      <h1 className="hero-banner__title max-w-[620px] text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] md:max-w-[44%] md:text-[46px] lg:text-[56px] xl:text-[60px]">
        Đồng hành cùng mẹ trên hành trình nuôi con hạnh phúc
      </h1>
    </section>
  );
}

export default HeroBanner;
