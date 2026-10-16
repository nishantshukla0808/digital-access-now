// Only plain serializable data — no icon imports here.
// Icons are resolved inside PortalShell on the client side.

export const adminNavItems = [
  { href: '/portal/admin/dashboard',   label: 'Dashboard'            },
  { href: '/portal/admin/users',       label: 'User Management'      },
  { href: '/portal/admin/approvals',   label: 'Pending Approvals'    },
  { href: '/portal/admin/team',        label: 'Team Members'         },
  { href: '/portal/admin/performance', label: 'Volunteer Performance' },
  { href: '/portal/admin/donations',   label: 'Donations'            },
  { href: '/portal/admin/impact',      label: 'Impact Metrics'       },
]

export const chapterNavItems = [
  { href: '/portal/chapter/dashboard',       label: 'Dashboard'      },
  { href: '/portal/chapter/submit-report',   label: 'Submit Report'  },
  { href: '/portal/chapter/submit-event',    label: 'Submit Event'   },
  { href: '/portal/chapter/my-submissions',  label: 'My Submissions' },
]

export const volunteerNavItems = [
  { href: '/portal/volunteer/dashboard',        label: 'Dashboard'        },
  { href: '/portal/volunteer/submit-resource',  label: 'Submit Resource'  },
  { href: '/portal/volunteer/submit-vlog',      label: 'Submit Vlog'      },
  { href: '/portal/volunteer/log-hours',        label: 'Log Hours'        },
  { href: '/portal/volunteer/my-performance',   label: 'My Performance'   },
]

export const adminContentLinks = [
  { href: '/portal/admin/team',       label: 'Team page management'          },
  { href: '/portal/admin/impact',     label: 'Impact and homepage stats'     },
  { href: '/portal/admin/donations',  label: 'Donation stats and campaigns'  },
]