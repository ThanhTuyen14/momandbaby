import { useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle02Icon,
  Mail01Icon,
  MailSend02Icon,
} from '@hugeicons/core-free-icons';
import {
  AuthCard,
  AuthFooterLink,
  AuthLayout,
  AuthTextField,
} from '../../components/auth/AuthLayout';
import { forgotIllustrationUrl } from '../auth/authAssets';

type ForgotPasswordErrors = {
  email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForgotPassword(email: string) {
  const nextErrors: ForgotPasswordErrors = {};

  if (!emailPattern.test(email)) {
    nextErrors.email = 'Email không hợp lệ.';
  }

  return nextErrors;
}

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForgotPassword(email);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSent(true);
    }
  };

  return (
    <AuthLayout illustrationAlt="Minh họa quên mật khẩu Mẹ Có Biết" illustrationUrl={forgotIllustrationUrl}>
      <AuthCard
        subtitle="Nhập email để nhận liên kết khôi phục mật khẩu."
        title="Quên mật khẩu"
      >
        {isSent ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF9F2] text-[#3BB273]">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={38} strokeWidth={1.7} />
            </div>

            <h2 className="text-xl font-bold text-[#27415C]">Liên kết khôi phục đã được gửi.</h2>
            <p className="mt-3 text-base leading-relaxed text-[#5B6B7A]">
              Vui lòng kiểm tra Email của bạn.
            </p>

            <NavLink
              className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#5AAEFF] px-5 text-base font-semibold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6]"
              to="/login"
            >
              Quay lại đăng nhập
            </NavLink>
          </div>
        ) : (
          <>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <AuthTextField
                autoComplete="email"
                error={errors.email}
                icon={Mail01Icon}
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="me@example.com"
                type="email"
                value={email}
              />

              <button
                className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#5AAEFF] px-5 text-base font-semibold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6]"
                type="submit"
              >
                <HugeiconsIcon icon={MailSend02Icon} size={20} strokeWidth={1.7} />
                Gửi liên kết khôi phục
              </button>
            </form>

            <AuthFooterLink label="Nhớ mật khẩu rồi?" linkLabel="Quay lại đăng nhập" to="/login" />
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
