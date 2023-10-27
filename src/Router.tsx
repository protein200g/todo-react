import {
  Routes,
  Route,
  createBrowserRouter,
} from 'react-router-dom';
import Coins from './screens/Coins';
import Coin from './screens/Coin';
import App from './App';
import Chart from './routes/Chart';
import Price from './routes/Price';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    children: [
      {
        path: '',
        element: <Coins />,
      },
      {
        path: ':id',
        element: <Coin />,
        children: [
          {
            path: 'chart',
            element: <Chart />,
          },
          { path: 'price', element: <Price /> },
        ],
      },
      // {
      //   path: 'users/:id',
      //   element: <User />,
      //   children: [
      //     {
      //       path: 'followers',
      //       element: <Followers />,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
