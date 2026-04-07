import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  FolderKanban,
  HandHelping,
  LayoutDashboard,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Trophy,
  Upload,
  Users,
  Video,
} from 'lucide-react'

export const adminNavItems = [
  { href: '/portal/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/admin/users', label: 'User Management', icon: Users },
  { href: '/portal/admin/approvals', label: 'Pending Approvals', icon: CheckCircle2 },
  { href: '/portal/admin/team', label: 'Team Members', icon: ShieldCheck },
  { href: '/portal/admin/performance', label: 'Volunteer Performance', icon: Trophy },
  { href: '/portal/admin/donations', label: 'Donations', icon: PiggyBank },
  { href: '/portal/admin/impact', label: 'Impact Metrics', icon: LineChart },
]

export const chapterNavItems = [
  { href: '/portal/chapter/dashboard', label: 'Dashboard', icon: FolderKanban },
  { href: '/portal/chapter/submit-report', label: 'Submit Report', icon: Upload },
  { href: '/portal/chapter/submit-event', label: 'Submit Event', icon: CalendarDays },
  { href: '/portal/chapter/my-submissions', label: 'My Submissions', icon: CheckCircle2 },
]

export const volunteerNavItems = [
  { href: '/portal/volunteer/dashboard', label: 'Dashboard', icon: HandHelping },
  { href: '/portal/volunteer/submit-resource', label: 'Submit Resource', icon: BookOpen },
  { href: '/portal/volunteer/submit-vlog', label: 'Submit Vlog', icon: Video },
  { href: '/portal/volunteer/log-hours', label: 'Log Hours', icon: Clock },
  { href: '/portal/volunteer/my-performance', label: 'My Performance', icon: BarChart3 },
]

export const adminContentLinks = [
  { href: '/portal/admin/team', label: 'Team page management', icon: Users },
  { href: '/portal/admin/impact', label: 'Impact and homepage stats', icon: LineChart },
  { href: '/portal/admin/donations', label: 'Donation stats and campaigns', icon: BarChart3 },
]