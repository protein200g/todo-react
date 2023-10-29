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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
