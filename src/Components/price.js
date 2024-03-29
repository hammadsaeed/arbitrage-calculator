import React, {useEffect, useState} from 'react';
import GetPrice from '../Services/get-response';

const BitMartURL = 'https://api-cloud.bitmart.com/spot/v1/ticker';
const PancakeURL = 'https://api.pancakeswap.info/api/v2/tokens';

const PriceCalculator = (props) => {
  const {handleLoading} = props;
  const [bitMartPrice, setBitmartPrice] = useState([]);
  const [pancakePrice, setPacncakePrice] = useState([]);

  const [diffPrice, setDiffPrice] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const response = await GetPrice.getBitmart(BitMartURL);
        setBitmartPrice(response.filterData);

      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [])

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
    if(bitMartPrice.length && pancakePrice.length) {
      const matches = [];
      const higherDiff = [];
      // eslint-disable-next-line array-callback-return
      pancakePrice.map((pancakeItem) => {
        for(let i = 0; i < bitMartPrice.length; i++) {          
          // if(bitMartPrice[i].symbol.includes(pancakeItem.symbol.toUpperCase())) {
          if(pancakeItem.symbol.toUpperCase() === bitMartPrice[i].symbol.split('_')[0] && bitMartPrice[i].symbol.split('_')[0] !== 'DIA') {
            const panCakePriceItem = parseFloat(pancakeItem.price);
            const bitMartPriceItem = parseFloat(bitMartPrice[i]['last_price']);
            const percentageDiff = ((bitMartPriceItem/panCakePriceItem) * 100) - 100;
            matches.push({
              name: pancakeItem.name,
              symbol: pancakeItem.symbol,
              pancakePrice: parseFloat(pancakeItem.price),
              bitmartPrice: parseFloat(bitMartPrice[i]['last_price']),
              percentageDiff,
            });
            if(percentageDiff > 8) {
              higherDiff.push({
                name: pancakeItem.name,
                symbol: pancakeItem.symbol,
                pancakePrice: parseFloat(pancakeItem.price),
                bitmartPrice: parseFloat(bitMartPrice[i]['last_price']),
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
  }, [bitMartPrice, pancakePrice])

  if(diffPrice.length) {
    handleLoading();
    return (
      <>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h6 style={{margin: 10, width: '15vw'}}>Name</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Pancake price</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Bitmart price</h6>
            <h6 style={{margin: 10, width: '15vw'}}>Percentage Diff</h6>
          </div>
        {diffPrice.map((item) => {
          return(
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h6 style={{margin: 10, width: '15vw'}}>{item.name}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.pancakePrice}</h6>
            <h6 style={{margin: 10, width: '15vw'}}>{item.bitmartPrice}</h6>
            <h6 style={{margin: 10, width: '15vw', color: `${item.percentageDiff >= 50 ? '#5fff0d' : 'white'}`}}>{parseInt(item.percentageDiff)}%</h6>
          </div>
          )
        })}
      </>
    )
  }
  return <></>;
}

export default PriceCalculator;
