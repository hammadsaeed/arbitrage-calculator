import React, {useEffect, useState} from 'react';
import GetPrice from '../Services/get-response';

const PancakeURL = 'https://api.pancakeswap.info/api/v2/tokens';
const BinanceURL = 'https://api.binance.com/api/v3/ticker/price';

const BinanceCalculator = (props) => {
  const {handleLoading} = props;
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

  // useEffect(() => {
  //   if(bitMartPrice.length && pancakePrice.length) {
  //     const matches = [];
  //     const higherDiff = [];
  //     pancakePrice.map((pancakeItem) => {
  //       for(let i = 0; i < bitMartPrice.length; i++) {          
  //         // if(bitMartPrice[i].symbol.includes(pancakeItem.symbol.toUpperCase())) {
  //         if(pancakeItem.symbol.toUpperCase() === bitMartPrice[i].symbol.split('_')[0] && bitMartPrice[i].symbol.split('_')[0] !== 'DIA') {
  //           const panCakePriceItem = parseFloat(pancakeItem.price);
  //           const bitMartPriceItem = parseFloat(bitMartPrice[i]['last_price']);
  //           const percentageDiff = ((bitMartPriceItem/panCakePriceItem) * 100) - 100;
  //           matches.push({
  //             name: pancakeItem.name,
  //             symbol: pancakeItem.symbol,
  //             pancakePrice: parseFloat(pancakeItem.price),
  //             bitmartPrice: parseFloat(bitMartPrice[i]['last_price']),
  //             percentageDiff,
  //           });
  //           if(percentageDiff > 8) {
  //             higherDiff.push({
  //               name: pancakeItem.name,
  //               symbol: pancakeItem.symbol,
  //               pancakePrice: parseFloat(pancakeItem.price),
  //               bitmartPrice: parseFloat(bitMartPrice[i]['last_price']),
  //               percentageDiff,
  //             });
  //           }
  //           break
  //         }

  //       }
  //     })
  //     setDiffPrice(higherDiff);
  //   }
  // }, [bitMartPrice, pancakePrice])

  useEffect(() => {
    if(binancePrice.length && pancakePrice.length) {
      const higherDiff = [];
      pancakePrice.map((pancakeItem) => {
        for(let i = 0; i < binancePrice.length; i++) {          
          if(pancakeItem.symbol.toUpperCase() === binancePrice[i].symbol.split('USD')[0] ) {
            const panCakePriceItem = parseFloat(pancakeItem.price);
            const binancePriceItem = parseFloat(binancePrice[i]['price']);
            const percentageDiff = ((binancePriceItem/panCakePriceItem) * 100) - 100;
            console.log(binancePrice[i])
            if(percentageDiff > 8) {
              higherDiff.push({
                name: pancakeItem.name,
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
      setDiffPrice(higherDiff);
      console.log(higherDiff);
    }
  }, [binancePrice, pancakePrice])

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
            <h6 style={{margin: 10, width: '15vw'}}>{item.name}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.pancakePrice}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.bitmartPrice ? item.bitmartPrice : item.binancePrice}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{parseInt(item.percentageDiff)}%</h6>
          </div>
          )
        })}
      </>
    )
  }
  return <></>;
}

export default BinanceCalculator;
