import { useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  LockPasswordIcon,
  Login03Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import {
  AuthCard,
  AuthDivider,
  AuthFooterLink,
  AuthLayout,
  AuthTextField,
  SocialAuthButtons,
} from '../../components/auth/AuthLayout';
import { loginIllustrationUrl } from '../auth/authAssets';

type LoginErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(email: string, password: string) {
  const nextErrors: LoginErrors = {};

  if (!emailPattern.test(email)) {
    nextErrors.email = 'Email không hợp lệ.';
  }

  if (password.length < 8) {
    nextErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự.';
  }

  return nextErrors;
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
  };

  return (
    <AuthLayout illustrationAlt="Minh họa đăng nhập Mẹ Có Biết" illustrationUrl={loginIllustrationUrl}>
      <AuthCard subtitle="Chào mừng bạn quay trở lại!" title="Đăng nhập">
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

          <AuthTextField
            autoComplete="current-password"
            error={errors.password}
            icon={LockPasswordIcon}
            label="Mật khẩu"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
          />

          <div className="flex flex-col gap-3 text-sm font-semibold text-[#5B6B7A] sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2">
              <input
                checked={rememberLogin}
                className="h-4 w-4 rounded border-[#E8EEF6] text-[#5AAEFF] focus:ring-[#5AAEFF]"
                onChange={(event) => setRememberLogin(event.target.checked)}
                type="checkbox"
              />
              Ghi nhớ đăng nhập
            </label>

            <NavLink
              className="font-bold text-[#5AAEFF] transition duration-[250ms] hover:text-[#FF8FB8]"
              to="/forgot-password"
            >
              Quên mật khẩu?
            </NavLink>
          </div>

          <button
            className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#5AAEFF] px-5 text-base font-semibold text-white shadow-lg shadow-sky-200/80 transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#3B82F6]"
            type="submit"
          >
            <HugeiconsIcon icon={Login03Icon} size={20} strokeWidth={1.7} />
            Đăng nhập
          </button>
        </form>

        <AuthDivider />
        <SocialAuthButtons facebookLabel="Đăng nhập với Facebook" googleLabel="Đăng nhập với Google" />
        <AuthFooterLink label="Chưa có tài khoản?" linkLabel="Đăng ký ngay" to="/register" />
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
