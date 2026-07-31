import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  FileEditIcon,
  Logout03Icon,
  Menu01Icon,
  ProfileIcon,
  Settings02Icon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons';
import logoUrl from '../assets/Logo.png';

type TopBarProps = {
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

type MenuItem = {
  label: string;
  path: string;
};

type UserMenuItem = {
  label: string;
  path?: string;
  icon: typeof ProfileIcon;
  onClick?: () => void;
};

const mainMenuItems: MenuItem[] = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Góc mẹ biết', path: '/goc-me-biet' },
  { label: 'Công cụ', path: '/cong-cu' },
  { label: 'Cẩm nang', path: '/cam-nang' },
  { label: 'Cộng đồng', path: '/cong-dong' },
];

const authLinks: MenuItem[] = [
  { label: 'Đăng nhập', path: '/login' },
  { label: 'Đăng ký', path: '/register' },
];

const getUserMenuItems = (onLogout?: () => void): UserMenuItem[] => [
  { label: 'Hồ sơ', path: '/ho-so', icon: ProfileIcon },
  { label: 'Bài viết của tôi', path: '/bai-viet-cua-toi', icon: FileEditIcon },
  { label: 'Cài đặt', path: '/cai-dat', icon: Settings02Icon },
  { label: 'Đăng xuất', icon: Logout03Icon, onClick: onLogout },
];

function Brand() {
  return (
    <NavLink
      aria-label="Mẹ Có Biết"
      className="flex min-w-0 items-center gap-3 rounded-lg outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-sky-300"
      to="/"
    >
      <img
        alt="Logo Mẹ Có Biết"
        className="h-11 w-11 shrink-0 rounded-2xl object-contain sm:h-12 sm:w-12"
        src={logoUrl}
      />
      <span className="max-w-[118px] text-base font-extrabold leading-tight text-slate-800 sm:max-w-none sm:text-lg">
        Mẹ Có Biết
      </span>
    </NavLink>
  );
}

function DesktopMenu() {
  return (
    <nav aria-label="Menu chính" className="hidden items-center justify-center gap-1 lg:flex">
      {mainMenuItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            [
              'group relative rounded-lg px-4 py-2 text-sm font-bold transition duration-200',
              'text-slate-600 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300',
              isActive ? 'text-sky-600' : '',
            ].join(' ')
          }
          key={item.path}
          to={item.path}
        >
          {({ isActive }) => (
            <>
              {item.label}
              <span
                className={[
                  'absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-pink-300 transition duration-200',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                ].join(' ')}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function AuthActions() {
  return (
    <div className="flex items-center gap-2">
      {authLinks.map((item) => (
        <NavLink
          className={({ isActive }) =>
            [
              'rounded-lg px-3 py-2 text-sm font-extrabold transition duration-200',
              item.path === '/register'
                ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600',
              isActive ? 'ring-2 ring-sky-200' : '',
            ].join(' ')
          }
          key={item.path}
          to={item.path}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

function UserDropdown({ onLogout }: Pick<TopBarProps, 'onLogout'>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownId = useId();
  const menuItems = getUserMenuItems(onLogout);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-controls={dropdownId}
        aria-expanded={isOpen}
        aria-label="Mở menu tài khoản"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-600 shadow-sm transition duration-200 hover:bg-pink-50 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <HugeiconsIcon icon={UserCircleIcon} size={25} strokeWidth={1.7} />
      </button>

      <div
        className={[
          'absolute right-0 top-[calc(100%+12px)] z-50 w-56 rounded-lg border border-sky-100 bg-white p-2 shadow-xl shadow-sky-100/70 transition duration-200',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ].join(' ')}
        id={dropdownId}
      >
        {menuItems.map((item) =>
          item.path ? (
            <NavLink
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition duration-200 hover:bg-sky-50 hover:text-sky-600"
              key={item.label}
              onClick={() => setIsOpen(false)}
              to={item.path}
            >
              <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.7} />
              {item.label}
            </NavLink>
          ) : (
            <button
              className="flex w-full items-center gap-3 rounded-lg bg-transparent px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition duration-200 hover:bg-pink-50 hover:text-pink-600"
              key={item.label}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              type="button"
            >
              <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.7} />
              {item.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function MobileDrawer({
  isAuthenticated,
  isOpen,
  onClose,
  onLogout,
}: TopBarProps & {
  isOpen: boolean;
  onClose: () => void;
}) {
  const userMenuItems = getUserMenuItems(onLogout);

  return (
    <div
      aria-hidden={!isOpen}
      className={[
        'fixed inset-0 z-50 lg:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <button
        aria-label="Đóng menu"
        className={[
          'absolute inset-0 h-full w-full bg-slate-900/25 transition duration-200',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={onClose}
        type="button"
      />

      <aside
        aria-label="Menu di động"
        className={[
          'relative h-full w-[min(84vw,340px)] overflow-y-auto border-r border-sky-100 bg-white p-5 shadow-2xl shadow-sky-100 transition duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <Brand />
          <button
            aria-label="Đóng menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition duration-200 hover:bg-pink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
            onClick={onClose}
            type="button"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.7} />
          </button>
        </div>

        <nav aria-label="Menu chính trên mobile" className="grid gap-2">
          {mainMenuItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  'rounded-lg px-4 py-3 text-base font-extrabold transition duration-200',
                  isActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600',
                ].join(' ')
              }
              key={item.path}
              onClick={onClose}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-7 border-t border-sky-100 pt-5">
          {isAuthenticated ? (
            <div className="grid gap-2">
              {userMenuItems.map((item) =>
                item.path ? (
                  <NavLink
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-slate-700 transition duration-200 hover:bg-sky-50 hover:text-sky-600"
                    key={item.label}
                    onClick={onClose}
                    to={item.path}
                  >
                    <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.7} />
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    className="flex w-full items-center gap-3 rounded-lg bg-transparent px-4 py-3 text-left text-sm font-bold text-slate-700 transition duration-200 hover:bg-pink-50 hover:text-pink-600"
                    key={item.label}
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    type="button"
                  >
                    <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.7} />
                    {item.label}
                  </button>
                ),
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {authLinks.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-center text-sm font-extrabold transition duration-200',
                      item.path === '/register'
                        ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                        : 'bg-sky-50 text-sky-600 hover:bg-sky-100',
                      isActive ? 'ring-2 ring-sky-200' : '',
                    ].join(' ')
                  }
                  key={item.path}
                  onClick={onClose}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function TopBar({ isAuthenticated = false, onLogout }: TopBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 shadow-sm shadow-sky-100/70 backdrop-blur">
        <div className="mx-auto grid h-[68px] w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:h-[72px] sm:px-6 lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] lg:px-8">
          <Brand />
          <DesktopMenu />

          <div className="hidden justify-self-end lg:block">
            {isAuthenticated ? <UserDropdown onLogout={onLogout} /> : <AuthActions />}
          </div>

          <button
            aria-expanded={isDrawerOpen}
            aria-label="Mở menu"
            className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full bg-sky-50 text-sky-600 transition duration-200 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
            type="button"
          >
            <HugeiconsIcon icon={Menu01Icon} size={24} strokeWidth={1.7} />
          </button>
        </div>
      </header>

      <MobileDrawer
        isAuthenticated={isAuthenticated}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={onLogout}
      />
    </>
  );
}

export default TopBar;
