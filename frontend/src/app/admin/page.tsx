'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Import modern dashboard components
import StatCard from '@/components/admin/dashboard/StatCard';
import SystemHealth from '@/components/admin/dashboard/SystemHealth';
import ActivityFeed from '@/components/admin/dashboard/ActivityFeed';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';

// Icons
import {
  Users,
  DollarSign,
  Download,
  Activity,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi
} from 'lucide-react';

// Types
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalDownloads: number;
  revenueToday: number;
  newUsersToday: number;
  downloadsToday: number;
  systemStatus: 'healthy' | 'warning' | 'error';
  serverUptime: string;
  userGrowth: number;
  revenueGrowth: number;
  downloadGrowth: number;
}

interface SystemService {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  responseTime?: number;
  uptime?: number;
  lastCheck?: string;
}

interface SystemResource {
  name: string;
  used: number;
  total: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ActivityItem {
  id: string;
  type: 'user_register' | 'download' | 'payment' | 'system' | 'error' | 'success';
  title: string;
  description?: string;
  timestamp: string;
  user?: {
    name?: string;
    email: string;
    avatar?: string;
  };
}

export default function AdminDashboard() {
  // State management
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [services, setServices] = useState<SystemService[]>([]);
  const [resources, setResources] = useState<SystemResource[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API calls with mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats(generateMockStats());
      setServices(generateMockServices());
      setResources(generateMockResources());
      setActivities(generateMockActivities());
      setLastUpdated(new Date());

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Không thể tải dữ liệu dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setIsRefreshing(false);
    toast.success('Dữ liệu đã được cập nhật');
  }, [fetchDashboardData]);

  // Mock data generators
  const generateMockStats = (): DashboardStats => ({
    totalUsers: 1247,
    activeUsers: 892,
    totalDownloads: 15420,
    revenueToday: 2450000,
    newUsersToday: 23,
    downloadsToday: 156,
    systemStatus: 'healthy',
    serverUptime: '15 ngày 4 giờ',
    userGrowth: 12.5,
    revenueGrowth: 8.3,
    downloadGrowth: 15.2
  });

  const generateMockServices = (): SystemService[] => [
    {
      name: 'API Server',
      status: 'online',
      responseTime: 45,
      uptime: 99.9,
      lastCheck: new Date().toISOString()
    },
    {
      name: 'Database',
      status: 'online',
      responseTime: 12,
      uptime: 99.8,
      lastCheck: new Date().toISOString()
    },
    {
      name: 'YouTube Service',
      status: 'online',
      responseTime: 120,
      uptime: 98.5,
      lastCheck: new Date().toISOString()
    },
    {
      name: 'Storage',
      status: 'degraded',
      responseTime: 200,
      uptime: 95.2,
      lastCheck: new Date().toISOString()
    }
  ];

  const generateMockResources = (): SystemResource[] => [
    {
      name: 'CPU Usage',
      used: 45,
      total: 100,
      unit: '%',
      icon: Cpu
    },
    {
      name: 'Memory',
      used: 6.2,
      total: 16,
      unit: 'GB',
      icon: MemoryStick
    },
    {
      name: 'Storage',
      used: 750,
      total: 1000,
      unit: 'GB',
      icon: HardDrive
    },
    {
      name: 'Network',
      used: 125,
      total: 1000,
      unit: 'Mbps',
      icon: Wifi
    }
  ];

  const generateMockActivities = (): ActivityItem[] => [
    {
      id: '1',
      type: 'user_register',
      title: 'Người dùng mới đăng ký',
      description: 'Tài khoản premium được tạo',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: {
        name: 'Nguyễn Văn A',
        email: 'user@example.com',
        avatar: '/avatars/user1.jpg'
      }
    },
    {
      id: '2',
      type: 'download',
      title: 'Video YouTube được tải xuống',
      description: '4K video - 250MB',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'payment',
      title: 'Thanh toán Premium thành công',
      description: 'Gói 1 tháng - 99,000 VNĐ',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      user: {
        name: 'Trần Thị B',
        email: 'premium@example.com',
        avatar: '/avatars/user2.jpg'
      }
    },
    {
      id: '4',
      type: 'system',
      title: 'Hệ thống được cập nhật',
      description: 'Version 2.1.0 deployed',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      type: 'success',
      title: 'Backup hoàn thành',
      description: 'Database backup thành công',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    }
  ];

  // Stat cards configuration
  const statCards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: 'Tổng người dùng',
        value: stats.totalUsers,
        change: stats.userGrowth,
        changeLabel: 'so với tháng trước',
        icon: Users,
        color: 'blue' as const,
        onClick: () => window.open('/admin/users', '_blank')
      },
      {
        title: 'Người dùng hoạt động',
        value: stats.activeUsers,
        change: stats.userGrowth * 0.8,
        changeLabel: 'so với tháng trước',
        icon: Activity,
        color: 'green' as const
      },
      {
        title: 'Tổng lượt tải',
        value: stats.totalDownloads,
        change: stats.downloadGrowth,
        changeLabel: 'so với tháng trước',
        icon: Download,
        color: 'purple' as const
      },
      {
        title: 'Doanh thu hôm nay',
        value: stats.revenueToday,
        change: stats.revenueGrowth,
        changeLabel: 'so với hôm qua',
        icon: DollarSign,
        color: 'orange' as const,
        format: 'currency'
      }
    ];
  }, [stats]);

  if (isLoading) {
    return (
      <AdminPageWrapper spacing="normal" maxWidth="7xl">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <StatCard
              key={i}
              title=""
              value={0}
              icon={Users}
              color="blue"
              isLoading={true}
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SystemHealth
              services={[]}
              resources={[]}
              isLoading={true}
            />
          </div>
          <div className="space-y-6">
            <ActivityFeed
              activities={[]}
              isLoading={true}
              maxItems={8}
            />
            <QuickActions
              isLoading={true}
            />
          </div>
        </div>
      </AdminPageWrapper>
    );
  }



  return (
    <AdminPageWrapper spacing="normal" maxWidth="7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.
          </p>
          <p className="text-xs text-gray-500">
            Cập nhật lần cuối: {lastUpdated.toLocaleString('vi-VN')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="gap-2"
            aria-label="Làm mới dữ liệu dashboard"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Đang tải...' : 'Làm mới'}
          </Button>
        </div>
      </div>

      {/* System Status Alert */}
      {stats && (
        <Alert className={
          stats.systemStatus === 'healthy'
            ? 'border-green-200 bg-green-50'
            : stats.systemStatus === 'warning'
            ? 'border-yellow-200 bg-yellow-50'
            : 'border-red-200 bg-red-50'
        }>
          {stats.systemStatus === 'healthy' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          )}
          <AlertDescription className={
            stats.systemStatus === 'healthy'
              ? 'text-green-800'
              : stats.systemStatus === 'warning'
              ? 'text-yellow-800'
              : 'text-red-800'
          }>
            {stats.systemStatus === 'healthy'
              ? `Hệ thống đang hoạt động bình thường. Uptime: ${stats.serverUptime}`
              : stats.systemStatus === 'warning'
              ? 'Hệ thống có một số vấn đề cần chú ý.'
              : 'Hệ thống đang gặp sự cố nghiêm trọng.'
            }
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            changeLabel={card.changeLabel}
            icon={card.icon}
            color={card.color}
            onClick={card.onClick}
            aria-label={`${card.title}: ${card.value}`}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - System Health */}
        <div className="lg:col-span-2 space-y-6">
          <SystemHealth
            services={services}
            resources={resources}
            isLoading={false}
          />
        </div>

        {/* Right Column - Activity and Quick Actions */}
        <div className="space-y-6">
          <ActivityFeed
            activities={activities}
            isLoading={false}
            maxItems={8}
          />

          <QuickActions
            isLoading={false}
          />
        </div>
      </div>
    </AdminPageWrapper>
  );
}
