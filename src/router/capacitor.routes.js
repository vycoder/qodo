export const routes = [
  {
    path: '/',
    component: () => import('layouts/TasksLayout'),
    children: [
      { name: 'Your Tasks', path: '', component: () => import('pages/Tasks') }
    ]
  },
  {
    path: '/o', // parent container, to create simple way to separate parent layout
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { name: 'Projects', path: 'projects', component: () => import('pages/Projects') },
      { name: 'Prioritize', path: 'eisenhower', component: () => import('pages/Eisenhower') },
      { name: 'Reports', path: 'reports', component: () => import('pages/Reports') }
    ]
  }
]
