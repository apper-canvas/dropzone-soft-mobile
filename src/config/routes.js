import HomePage from '@/components/pages/HomePage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'DropZone Pro',
    path: '/home',
    icon: 'Upload',
    component: HomePage
  },
  notFound: {
    id: 'notFound',
    label: 'Page Not Found',
    path: '*',
    component: NotFoundPage
  }
};

export const routeArray = Object.values(routes).filter(route => route.path !== '*');