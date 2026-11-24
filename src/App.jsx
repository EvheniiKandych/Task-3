import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { DataProvider } from './context/DataProvider';
import { AboutPage } from './pages/AboutPage';
import { MissionCreatePage } from './pages/MissionCreatePage';
import { MissionDetailsPage } from './pages/MissionDetailsPage';
import { MissionEditPage } from './pages/MissionEditPage';
import { MissionsPage } from './pages/MissionsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MissionsPage /> },
      { path: 'items', element: <Navigate to="/" replace /> },
      { path: 'items/new', element: <MissionCreatePage /> },
      { path: 'items/:id', element: <MissionDetailsPage /> },
      { path: 'items/:id/edit', element: <MissionEditPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
