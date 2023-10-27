import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';

interface IData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

interface ICoinId {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IData[]>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(`${coinId}`),
    refetchInterval: 5000,
  });
  const price = data?.map(
    (price) => new Date(price.time_close * 1000)
  );
  console.log(price);
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close * 1000)
                    .toLocaleDateString()
                    .slice(2, 12),
                  y: [
                    price.open,
                    price.high,
                    price.low,
                    price.close,
                  ],
                })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            xaxis: {
              labels: {
                style: {
                  colors: 'skyblue',
                  fontWeight: 'bold',
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: 'skyblue',
                  fontWeight: 'bold',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
