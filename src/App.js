import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import PriceCalculator from './Components/price';
import BinanceCalculator from './Components/binanceCalculator';


const secondList = ['Bitmart', 'Binance']
const firstList = ['Pancake'];

function App() {
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState('Pancake');
  const [second, setSecond] = useState('Bitmart');


  const handleLoading = () => {
    setLoading(false);
  }
  console.log(second)

  return (
    <div className="App">
      <header className="App-header">
      <div style={{display: 'flex', flexDirection: 'row', height: '3vh'}}>
        <select onChange={e => setFirst(e.target.value)}>
          {firstList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <h6 style={{margin: 0}}> -> </h6>
        <select onChange={e => setSecond(e.target.value)}>
          {secondList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      {second === 'Bitmart' ? <PriceCalculator handleLoading={handleLoading} /> : <BinanceCalculator handleLoading={handleLoading} />}

        {loading && <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;
