import React, {useEffect, useState} from 'react';
import GetPrice from '../Services/get-response';

const PancakeURL = 'https://api.pancakeswap.info/api/v2/tokens';
const BinanceURL = 'https://api.binance.com/api/v3/ticker/price';

const BinanceCalculator = (props) => {
  const {handleLoading, diff} = props;
  const [pancakePrice, setPacncakePrice] = useState([]);
  const [binancePrice, setBinancePrice] = useState([]);

  const [diffPrice, setDiffPrice] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const response = await GetPrice.getPancake(PancakeURL);
        setPacncakePrice(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    async function getData() {
      try {
        const response = await GetPrice.getBinance(BinanceURL);
        setBinancePrice(response.filterData);

      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    if(binancePrice.length && pancakePrice.length) {
      const higherDiff = [];
      // eslint-disable-next-line array-callback-return
      pancakePrice.map((pancakeItem) => {
        for(let i = 0; i < binancePrice.length; i++) {          
          if(pancakeItem.symbol.toUpperCase() === binancePrice[i].symbol.split('USD')[0] ) {
            const panCakePriceItem = parseFloat(pancakeItem.price);
            const binancePriceItem = parseFloat(binancePrice[i]['price']);
            const percentageDiff = ((binancePriceItem/panCakePriceItem) * 100) - 100;
            if(percentageDiff > diff) {
              higherDiff.push({
                name: pancakeItem.name,
                otherSymbol: binancePrice[i].symbol,
                symbol: pancakeItem.symbol,
                pancakePrice: parseFloat(pancakeItem.price),
                binancePrice: parseFloat(binancePrice[i]['price']),
                percentageDiff,
              });
            }
            break
          }

        }
      })
      higherDiff.sort(function(a, b) {
        return b.percentageDiff - a.percentageDiff;
      });
      setDiffPrice(higherDiff);
    }
  }, [binancePrice, pancakePrice, diff])

  if(diffPrice.length) {
    handleLoading();
    return (
      <>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h6 style={{margin: 10, width: '15vw'}}>Name</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Pancake price</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Binance price</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Percentage Diff</h6>
          </div>
        {diffPrice.map((item) => {
          return(
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h6 style={{margin: 10, width: '25vw'}}>{item.name}({item.symbol} | {item.otherSymbol})</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.pancakePrice}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.binancePrice}</h6>
            <h6 style={{margin: 10, width: '15vw', color: `${item.percentageDiff >= 50 ? '#5fff0d' : 'white'}`}}>{parseInt(item.percentageDiff)}%</h6>
          </div>
          )
        })}
      </>
    )
  }
  return <></>;
}

export default BinanceCalculator;
