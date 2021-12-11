import React, {useEffect, useState} from 'react';
import GetPrice from '../Services/get-response';

const PancakeURL = 'https://api.pancakeswap.info/api/v2/tokens';
const kucoinURL = 'https://api.kucoin.com/api/v1/market/allTickers';

const Kucoin = (props) => {
  const {handleLoading, diff} = props;
  const [pancakePrice, setPacncakePrice] = useState([]);
  const [kucoinPrice, setKucoinPrice] = useState([]);

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
        const response = await GetPrice.getKucoin(kucoinURL);
        console.log(response);
        setKucoinPrice(response.filterData);

      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    if(kucoinPrice.length && pancakePrice.length) {
      const higherDiff = [];
      // eslint-disable-next-line array-callback-return
      pancakePrice.map((pancakeItem) => {
        for(let i = 0; i < kucoinPrice.length; i++) {      
          if(pancakeItem.symbol.toUpperCase() === kucoinPrice[i].symbol.split('-USDT')[0] ) {
            const panCakePriceItem = parseFloat(pancakeItem.price);
            const kucoinPriceItem = parseFloat(kucoinPrice[i]['buy']);
            const percentageDiff = ((kucoinPriceItem/panCakePriceItem) * 100) - 100;
            const percentageDiffInverse = ((panCakePriceItem/kucoinPriceItem) * 100) - 100;

            console.log(panCakePriceItem, kucoinPriceItem, percentageDiff)
            if(percentageDiff > diff || percentageDiffInverse > diff) {
              higherDiff.push({
                name: pancakeItem.name,
                otherSymbol: kucoinPrice[i].symbol,
                symbol: pancakeItem.symbol,
                pancakePrice: parseFloat(pancakeItem.price),
                kucoinPrice: parseFloat(kucoinPrice[i]['buy']),
                percentageDiff: percentageDiff > diff ? percentageDiff : -percentageDiffInverse,
              });
            }
            break
          }

        }
      })
      console.log(higherDiff)
      higherDiff.sort(function(a, b) {
        return b.percentageDiff - a.percentageDiff;
      });
      setDiffPrice(higherDiff);
    }
  }, [kucoinPrice, pancakePrice, diff])

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
            <h6 style={{margin: 10, width: '15vw'}}>{item.kucoinPrice}</h6>
            <h6 style={{margin: 10, width: '15vw', color: `${item.percentageDiff >= 50 ? '#5fff0d' : 'white'}`}}>{parseInt(item.percentageDiff)}%</h6>
          </div>
          )
        })}
      </>
    )
  }
  return <></>;
}

export default Kucoin;
