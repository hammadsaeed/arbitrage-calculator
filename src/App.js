import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import PriceCalculator from './Components/price';

function App() {
  const [loading, setLoading] = useState(true);
  const handleLoading = () => {
    setLoading(false);
  }
  return (
    <div className="App">
      <header className="App-header">
      <PriceCalculator handleLoading={handleLoading}/>
        {loading && <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;
