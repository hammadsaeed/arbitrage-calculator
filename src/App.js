import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import PriceCalculator from './Components/price';
import BinanceCalculator from './Components/binanceCalculator';
import Kucoin from './Components/kucoin';

const secondList = ['Bitmart', 'Binance', 'Kucoin']
const firstList = ['Pancake'];

function App() {
  const [loading, setLoading] = useState(true);
  const [setFirst] = useState('Pancake');
  const [second, setSecond] = useState('Bitmart');
  const [diff, setDiff] = useState(8);

  const handleLoading = () => {
    setLoading(false);
  }


  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex', flexDirection: 'row', margin: '1em'}}>
          <h6 style={{margin: 2}}>Difference</h6>
          <input type="text" onChange={(e) => setDiff(e.target.value)} value={diff}/>
        </div>
      <div style={{display: 'flex', flexDirection: 'row', height: '3vh'}}>
        <select onChange={e => setFirst(parseInt(e.target.value))}>
          {firstList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <h6 style={{margin: 0}}> -> </h6>
        <select onChange={e => {
          setSecond(e.target.value)
          setLoading(true);
          }}>
          {secondList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
          {second === 'Bitmart' ? <PriceCalculator handleLoading={handleLoading} diff={diff} /> : <BinanceCalculator handleLoading={handleLoading} diff={diff} />}
          {second === 'Kucoin' && <Kucoin  handleLoading={handleLoading} diff={diff} />}
        {loading && <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;
