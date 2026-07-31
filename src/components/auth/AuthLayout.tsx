import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  Facebook01Icon,
  GoogleIcon,
} from '@hugeicons/core-free-icons';

type AuthLayoutProps = {
  children: ReactNode;
  illustrationAlt: string;
  illustrationUrl: string;
};

type AuthCardProps = {
  children: ReactNode;
  subtitle: string;
  title: string;
};

type AuthTextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  error?: string;
  icon: typeof AlertCircleIcon;
  label: string;
};

type AuthDividerProps = {
  label?: string;
};

type SocialAuthButtonsProps = {
  facebookLabel: string;
  googleLabel: string;
};

type AuthFooterLinkProps = {
  label: string;
  linkLabel: string;
  to: string;
};

function AuthLayout({ children, illustrationAlt, illustrationUrl }: AuthLayoutProps) {
  const layoutStyle = {
    '--auth-illustration': `url(${illustrationUrl})`,
  } as CSSProperties;

  return (
    <section
      className="auth-page-enter relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-[#F9FCFF]"
      style={layoutStyle}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[image:var(--auth-illustration)] bg-contain bg-center bg-no-repeat opacity-10 md:hidden"
      />

      <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-16">
        <div className="hidden min-h-[520px] bg-[image:var(--auth-illustration)] bg-contain bg-center bg-no-repeat md:block">
          <span className="sr-only">{illustrationAlt}</span>
        </div>

        <div className="flex justify-center md:justify-end">
          {children}
        </div>
      </div>
    </section>
  );
}

function AuthCard({ children, subtitle, title }: AuthCardProps) {
  return (
    <div className="w-full max-w-[460px] rounded-[28px] bg-white p-6 shadow-[0_24px_70px_rgba(65,105,140,0.12)] sm:p-10">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold leading-tight text-[#27415C] sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base font-normal leading-relaxed text-[#5B6B7A]">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

function AuthTextField({ error, icon, id, label, type = 'text', ...inputProps }: AuthTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  return (
    <label className="grid gap-2 text-sm font-bold text-[#27415C]" htmlFor={inputId}>
      {label}
      <div className="relative">
        <HugeiconsIcon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA0B5]"
          icon={icon}
          size={20}
          strokeWidth={1.7}
        />
        <input
          className={[
            'h-[52px] w-full rounded-2xl border bg-[#F8FCFF] py-3 pl-12 text-base font-medium text-[#27415C] outline-none transition duration-[250ms] placeholder:text-[#9DAAB8] focus:border-[#5AAEFF] focus:ring-4 focus:ring-sky-100',
            isPassword ? 'pr-20' : 'pr-12',
            error ? 'border-[#FF8FB8]' : 'border-[#E8EEF6]',
          ].join(' ')}
          id={inputId}
          type={inputType}
          {...inputProps}
        />
        {error ? (
          <HugeiconsIcon
            className={[
              'pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#FF7BA9]',
              isPassword ? 'right-12' : 'right-4',
            ].join(' ')}
            icon={AlertCircleIcon}
            size={18}
            strokeWidth={1.8}
          />
        ) : null}
        {isPassword ? (
          <button
            aria-label={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-[#8AA0B5] transition duration-[250ms] hover:bg-sky-50 hover:text-[#5AAEFF]"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            <HugeiconsIcon icon={isPasswordVisible ? EyeOffIcon : EyeIcon} size={20} strokeWidth={1.7} />
          </button>
        ) : null}
      </div>
      {error ? <span className="text-sm font-semibold text-[#E45F8C]">{error}</span> : null}
    </label>
  );
}

function AuthDivider({ label = 'Hoặc' }: AuthDividerProps) {
  return (
    <div className="my-6 flex items-center gap-4 text-sm font-semibold text-[#8AA0B5]">
      <span className="h-px flex-1 bg-[#E8EEF6]" />
      {label}
      <span className="h-px flex-1 bg-[#E8EEF6]" />
    </div>
  );
}

function SocialAuthButtons({ facebookLabel, googleLabel }: SocialAuthButtonsProps) {
  const providers = [
    {
      label: googleLabel,
      icon: GoogleIcon,
      color: 'text-[#4285F4]',
    },
    {
      label: facebookLabel,
      icon: Facebook01Icon,
      color: 'text-[#1877F2]',
    },
  ];

  return (
    <div className="grid gap-3">
      {providers.map((provider) => (
        <button
          className="relative flex h-12 w-full items-center justify-center rounded-2xl border border-[#E8EEF6] bg-white px-4 text-center text-base font-semibold text-[#27415C] transition duration-[250ms] hover:-translate-y-0.5 hover:border-sky-100 hover:bg-[#F8FCFF] hover:shadow-lg hover:shadow-sky-100/70"
          key={provider.label}
          type="button"
        >
          <HugeiconsIcon
            className={['absolute left-4', provider.color].join(' ')}
            icon={provider.icon}
            size={22}
            strokeWidth={1.7}
          />
          {provider.label}
        </button>
      ))}
    </div>
  );
}

function AuthFooterLink({ label, linkLabel, to }: AuthFooterLinkProps) {
  return (
    <p className="mt-7 text-center text-base font-medium text-[#5B6B7A]">
      {label}{' '}
      <NavLink className="font-bold text-[#5AAEFF] transition duration-[250ms] hover:text-[#FF8FB8]" to={to}>
        {linkLabel}
      </NavLink>
    </p>
  );
}

export {
  AuthCard,
  AuthDivider,
  AuthFooterLink,
  AuthLayout,
  AuthTextField,
  SocialAuthButtons,
};
