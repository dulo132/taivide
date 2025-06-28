'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/styles/admin-dashboard.css';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  toggleSidebar,
  handleBodyScrollLock,
  setupResizeListener,
  handleNavItemClick
} from '@/utils/sidebarUtils';
import {
  LayoutDashboard,
  Users,
  Settings,
  Cookie,
  LogOut,
  Menu,
  X,
  Shield,
  Loader2,
  Bell,
  User,
  ChevronDown,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface AdminUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle sidebar behavior and body scroll lock
  useEffect(() => {
    handleBodyScrollLock(isSidebarOpen);
  }, [isSidebarOpen]);

  // Setup resize listener
  useEffect(() => {
    const cleanup = setupResizeListener(isSidebarOpen, setIsSidebarOpen);
    return cleanup;
  }, [isSidebarOpen]);

  // Check if current page is a login page (should not require authentication)
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Skip auth check for login pages
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    checkAdminAuth();
  }, [isLoginPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // Verify token with backend
      const response = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setAdminUser(data.admin || {
          id: '1',
          email: 'admin@taivideonhanh.vn',
          role: 'super_admin',
          permissions: ['all']
        });
      } else {
        console.error('Admin auth verification failed:', response.status, response.statusText);
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminUser(null);
    toast.success('Đã đăng xuất thành công');
    router.push('/admin/login');
  };

  // For login pages, render children directly without authentication check
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
            <p className="text-sm text-muted-foreground">Đang xác thực...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin',
      badge: null
    },
    {
      name: 'Quản lý người dùng',
      href: '/admin/users',
      icon: Users,
      current: pathname === '/admin/users',
      badge: null
    },
    {
      name: 'Cookie YouTube',
      href: '/admin/cookie',
      icon: Cookie,
      current: pathname === '/admin/cookie',
      badge: null
    },
    {
      name: 'Cài đặt',
      href: '/admin/settings',
      icon: Settings,
      current: pathname === '/admin/settings',
      badge: null
    }
  ];

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Dashboard', href: '/admin', icon: Home }];

    if (segments.length > 1) {
      const currentNav = navigation.find(nav => nav.href === pathname);
      if (currentNav) {
        breadcrumbs.push({ name: currentNav.name, href: pathname, icon: currentNav.icon });
      }
    }

    return breadcrumbs;
  };

  return (
    <div className="admin-layout">
      {/* Mobile sidebar overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={() => setIsSidebarOpen(toggleSidebar(isSidebarOpen))}
      />

      {/* Sidebar */}
      <aside className={`sidebar sidebar--mobile ${isSidebarOpen ? 'sidebar--open' : ''} sidebar--desktop`}>
        {/* Sidebar Header */}
        <header className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__brand-icon">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="sidebar__brand-text">
              <h1 className="sidebar__brand-title">Admin Panel</h1>
              <p className="sidebar__brand-subtitle">Tải Video Nhanh</p>
            </div>
          </div>
          <button
            className="sidebar__close-btn"
            onClick={() => setIsSidebarOpen(toggleSidebar(isSidebarOpen))}
            aria-label="Đóng menu"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <ul className="sidebar__nav-list">
            {navigation.map((item) => {
              const isActive = item.current;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
                    onClick={() => handleNavItemClick(setIsSidebarOpen)}
                  >
                    <div className="sidebar__nav-item-content">
                      <item.icon className="sidebar__nav-item-icon" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="sidebar__nav-item-badge">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator className="my-6" />

          {/* Admin User Info */}
          <div className="px-4 py-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {adminUser?.email?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {adminUser?.email || 'admin@taivideonhanh.vn'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {adminUser?.role?.replace('_', ' ') || 'Super Admin'}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Top header */}
        <header className="main-header">
          <div className="main-header__content">
            <div className="main-header__left">
              <button
                className="main-header__menu-btn"
                onClick={() => setIsSidebarOpen(toggleSidebar(isSidebarOpen))}
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumbs */}
              <nav className="hidden lg:flex items-center space-x-2 text-sm">
                {getBreadcrumbs().map((breadcrumb, index) => (
                  <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    <Link
                      href={breadcrumb.href}
                      className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                        index === getBreadcrumbs().length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                      {breadcrumb.name}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </Button>

              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Online
                </div>

                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                    {adminUser?.email?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-layout-main bg-gray-50">
          <div className="admin-content-wrapper">
            {children}
          </div>
        </main>
      </main>
    </div>
  );
}
