import { useState } from 'react';
import type { FormEvent } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  LockPasswordIcon,
  Mail01Icon,
  UserAdd01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import {
  AuthCard,
  AuthDivider,
  AuthFooterLink,
  AuthLayout,
  AuthTextField,
  SocialAuthButtons,
} from '../../components/auth/AuthLayout';
import { registerIllustrationUrl } from '../auth/authAssets';

type RegisterErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean,
) {
  const nextErrors: RegisterErrors = {};

  if (fullName.trim().length < 2) {
    nextErrors.fullName = 'Vui lòng nhập họ và tên.';
  }

  if (!emailPattern.test(email)) {
    nextErrors.email = 'Email không hợp lệ.';
  }

  if (password.length < 8) {
    nextErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự.';
  }

  if (confirmPassword !== password) {
    nextErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
  }

  if (!termsAccepted) {
    nextErrors.termsAccepted = 'Vui lòng đồng ý với điều khoản sử dụng.';
  }

  return nextErrors;
}

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateRegister(fullName, email, password, confirmPassword, termsAccepted);
    setErrors(nextErrors);
  };

  return (
    <AuthLayout illustrationAlt="Minh họa đăng ký Mẹ Có Biết" illustrationUrl={registerIllustrationUrl}>
      <AuthCard subtitle="Tạo tài khoản mới" title="Đăng ký">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <AuthTextField
            autoComplete="name"
            error={errors.fullName}
            icon={UserIcon}
            label="Họ và tên"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Tên của bạn"
            value={fullName}
          />

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

          <AuthTextField
            autoComplete="new-password"
            error={errors.password}
            icon={LockPasswordIcon}
            label="Mật khẩu"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Tối thiểu 8 ký tự"
            type="password"
            value={password}
          />

          <AuthTextField
            autoComplete="new-password"
            error={errors.confirmPassword}
            icon={LockPasswordIcon}
            label="Nhập lại mật khẩu"
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Nhập lại mật khẩu"
            type="password"
            value={confirmPassword}
          />

          <label className="grid gap-2 text-sm font-semibold text-[#5B6B7A]">
            <span className="flex items-start gap-3">
              <input
                checked={termsAccepted}
                className="mt-1 h-4 w-4 rounded border-[#E8EEF6] text-[#5AAEFF] focus:ring-[#5AAEFF]"
                onChange={(event) => setTermsAccepted(event.target.checked)}
                type="checkbox"
              />
              <span>Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật.</span>
            </span>
            {errors.termsAccepted ? (
              <span className="pl-7 text-sm font-semibold text-[#E45F8C]">{errors.termsAccepted}</span>
            ) : null}
          </label>

          <button
            className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#5AAEFF] px-5 text-base font-semibold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6]"
            type="submit"
          >
            <HugeiconsIcon icon={UserAdd01Icon} size={20} strokeWidth={1.7} />
            Đăng ký
          </button>
        </form>

        <AuthDivider />
        <SocialAuthButtons facebookLabel="Đăng ký với Facebook" googleLabel="Đăng ký với Google" />
        <AuthFooterLink label="Đã có tài khoản?" linkLabel="Đăng nhập" to="/login" />
      </AuthCard>
    </AuthLayout>
  );
}

export default RegisterPage;
