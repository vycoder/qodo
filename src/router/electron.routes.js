export const routes = [
  {
    path: '/',
    component: () => import('layouts/desktop/RootLayout.vue'),
    children: [
      { name: 'Your Tasks', path: '', component: () => import('pages/desktop/Tasks') },
      { name: 'Projects', path: '/projects', component: () => import('pages/desktop/Projects') },
      { name: 'Eisenhower Matrix', path: '/eisenhower', component: () => import('pages/desktop/Eisenhower') },
      { name: 'Reports', path: '/reports', component: () => import('pages/desktop/Reports') }
    ]
  }
]
