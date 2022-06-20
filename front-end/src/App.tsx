import React, { useEffect, useState } from 'react';

import useSWR from 'swr';

import { CoinCard } from './components';

import './App.css';

function App() {
  const [_data, setData] = useState(new Array(8).fill(''))
  const [_selectedCard, setSelectedCard] = useState<number>();
  const { data, isValidating } = useSWR("http://localhost:3001/getCoins", (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    if (data && !isValidating) {
      setData(data?.result);
    }
  }, [data, isValidating])

  console.log(data);

  return (
    <div className="min-h-[100vh] bg-app-background flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-row p-5 sm:p-0 w-4/5 sm:w-[90%] flex-wrap">
        <div className="w-full flex flex-row items-center gap-2 mb-5">
          <img src="assets/oracle_logo.png" className="w-6 h-6 lg:w-8 lg:h-8" alt="oracle" />
          <span className="text-primary text-xl font-bold font-primary lg:text-2xl">Oracle</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full w-full gap-10">
          {
            _data.map((item, index) => (
              <CoinCard key={item.id || index.toString()} {...item} onClick={() => setSelectedCard(index)} active={index === _selectedCard}  />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
