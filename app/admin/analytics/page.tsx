'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  LogIn, 
  UserPlus, 
  Mail, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye,
  RefreshCw,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnalyticsStats {
  overview: {
    today: any
    yesterday: any
    last7Days: any
    last30Days: any
  }
  dailyBreakdown: Array<{
    date: string
    pageViews: number
    signUps: number
    signIns: number
    emailsGenerated: number
    checkoutsCompleted: number
  }>
  events: any
  revenue: {
    today: number
    yesterday: number
    last7Days: number
    last30Days: number
    total: number
  }
  generatedAt: string
}

export default function AnalyticsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    
    // Check if user is admin via metadata or email
    const isAdmin = user?.publicMetadata?.isAdmin === true || 
                    user?.primaryEmailAddress?.emailAddress === 'aylen@bossyemail.com'
    
    if (!user || !isAdmin) {
      router.push('/dashboard')
      return
    }

    fetchStats()
  }, [user, isLoaded, router])

  const fetchStats = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/analytics/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'text-[#161616]' 
  }: { 
    title: string
    value: string | number
    change?: string
    icon: any
    color?: string
  }) => (
    <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">
          {title}
        </h3>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-normal text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
          {typeof value === 'number' ? formatNumber(value) : value}
        </p>
        {change && (
          <span className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  )

  if (!isLoaded || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-[#505050]">No analytics data available</p>
      </div>
    )
  }

  const today = stats.overview.today
  const yesterday = stats.overview.yesterday

  const calculateChange = (todayVal: number, yesterdayVal: number) => {
    if (yesterdayVal === 0) return todayVal > 0 ? '+100%' : '0%'
    const change = ((todayVal - yesterdayVal) / yesterdayVal) * 100
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#161616] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="display-6 text-[#161616] dark:text-white mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              Analytics Dashboard
            </h1>
            <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]">
              Last updated: {new Date(stats.generatedAt).toLocaleString()}
            </p>
          </div>
          <Button
            onClick={fetchStats}
            disabled={refreshing}
            className="bg-[#161616] hover:bg-[#292929] text-white px-6 py-3 rounded-none"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Today's Stats */}
        <div className="mb-8">
          <h2 className="display-5 text-[#161616] dark:text-white mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Page Views"
              value={today.pageViews}
              change={calculateChange(today.pageViews, yesterday.pageViews)}
              icon={Eye}
            />
            <StatCard
              title="Sign Ups"
              value={today.signUps}
              change={calculateChange(today.signUps, yesterday.signUps)}
              icon={UserPlus}
              color="text-blue-600"
            />
            <StatCard
              title="Sign Ins"
              value={today.signIns}
              change={calculateChange(today.signIns, yesterday.signIns)}
              icon={LogIn}
              color="text-green-600"
            />
            <StatCard
              title="Emails Generated"
              value={today.emailsGenerated}
              change={calculateChange(today.emailsGenerated, yesterday.emailsGenerated)}
              icon={Mail}
              color="text-purple-600"
            />
          </div>
        </div>

        {/* Revenue & Conversions */}
        <div className="mb-8">
          <h2 className="display-5 text-[#161616] dark:text-white mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Revenue & Conversions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Revenue Today"
              value={formatCurrency(stats.revenue.today)}
              change={calculateChange(stats.revenue.today, stats.revenue.yesterday)}
              icon={DollarSign}
              color="text-green-600"
            />
            <StatCard
              title="Checkouts Started"
              value={today.checkoutsStarted}
              change={calculateChange(today.checkoutsStarted, yesterday.checkoutsStarted)}
              icon={ShoppingCart}
              color="text-orange-600"
            />
            <StatCard
              title="Checkouts Completed"
              value={today.checkoutsCompleted}
              change={calculateChange(today.checkoutsCompleted, yesterday.checkoutsCompleted)}
              icon={TrendingUp}
              color="text-green-600"
            />
            <StatCard
              title="Conversion Rate"
              value={
                today.checkoutsStarted > 0
                  ? `${((today.checkoutsCompleted / today.checkoutsStarted) * 100).toFixed(1)}%`
                  : '0%'
              }
              icon={TrendingUp}
              color="text-blue-600"
            />
          </div>
        </div>

        {/* Period Comparison */}
        <div className="mb-8">
          <h2 className="display-5 text-[#161616] dark:text-white mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Period Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
              <h3 className="text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide mb-4">
                Last 7 Days
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Sign Ups</span>
                  <span className="text-[#161616] dark:text-white font-medium">{stats.overview.last7Days.signUps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Revenue</span>
                  <span className="text-[#161616] dark:text-white font-medium">{formatCurrency(stats.revenue.last7Days)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Emails</span>
                  <span className="text-[#161616] dark:text-white font-medium">{stats.overview.last7Days.emailsGenerated}</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
              <h3 className="text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide mb-4">
                Last 30 Days
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Sign Ups</span>
                  <span className="text-[#161616] dark:text-white font-medium">{stats.overview.last30Days.signUps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Revenue</span>
                  <span className="text-[#161616] dark:text-white font-medium">{formatCurrency(stats.revenue.last30Days)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Emails</span>
                  <span className="text-[#161616] dark:text-white font-medium">{stats.overview.last30Days.emailsGenerated}</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
              <h3 className="text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide mb-4">
                Total Revenue
              </h3>
              <p className="text-3xl font-normal text-green-600" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                {formatCurrency(stats.revenue.total)}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
              <h3 className="text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide mb-4">
                All Time Events
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Total Sign Ups</span>
                  <span className="text-[#161616] dark:text-white font-medium">{formatNumber(stats.events.signUps)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Total Emails</span>
                  <span className="text-[#161616] dark:text-white font-medium">{formatNumber(stats.events.emailsGenerated)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#505050] dark:text-[#ABABAB]">Subscriptions</span>
                  <span className="text-[#161616] dark:text-white font-medium">{formatNumber(stats.events.subscriptionsStarted)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Breakdown Chart */}
        <div className="mb-8">
          <h2 className="display-5 text-[#161616] dark:text-white mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Last 7 Days Trend
          </h2>
          <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E3E3E3] dark:border-[#292929]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Page Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Sign Ups</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Sign Ins</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Emails</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#505050] dark:text-[#ABABAB] uppercase tracking-wide">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.dailyBreakdown.map((day, idx) => (
                    <tr key={idx} className="border-b border-[#E3E3E3] dark:border-[#292929] last:border-0">
                      <td className="py-3 px-4 text-[#161616] dark:text-white">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-right text-[#161616] dark:text-white">{formatNumber(day.pageViews)}</td>
                      <td className="py-3 px-4 text-right text-[#161616] dark:text-white">{formatNumber(day.signUps)}</td>
                      <td className="py-3 px-4 text-right text-[#161616] dark:text-white">{formatNumber(day.signIns)}</td>
                      <td className="py-3 px-4 text-right text-[#161616] dark:text-white">{formatNumber(day.emailsGenerated)}</td>
                      <td className="py-3 px-4 text-right text-green-600 font-medium">{formatNumber(day.checkoutsCompleted)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
