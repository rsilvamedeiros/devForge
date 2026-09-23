import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '../layout/app-shell';
import { AnalyticsPage } from '../pages/analytics-page';
import { DashboardPage } from '../pages/dashboard-page';
import { NotFoundPage } from '../pages/not-found-page';
import { LearningPage } from '../pages/learning-page';
import { DocumentationPage } from '../pages/documentation-page';
import { TicketDetailPage } from '../pages/ticket-detail-page';
import { TicketsPage } from '../pages/tickets-page';
import { CurriculumPage } from '../pages/curriculum-page';

const router = createBrowserRouter([{
  path: '/',
  element: <AppShell/>,
  children: [
    { index: true, element: <DashboardPage/> },
    { path: 'tickets', element: <TicketsPage/> },
    { path: 'tickets/:id', element: <TicketDetailPage/> },
    { path: 'analytics', element: <AnalyticsPage/> },
    { path: 'learning', element: <LearningPage/> },
    { path: 'documentation', element: <DocumentationPage/> },
    { path: 'curriculum', element: <CurriculumPage/> },
    { path: '*', element: <NotFoundPage/> },
  ],
}]);

export function App() { return <RouterProvider router={router}/>; }
