const getBitmart = async (url) => {
  const response = await fetch(url, {
    method: 'GET',

  });
  
  if (!response.ok) {
    if (response.status !== 404) {
      throw new Error('Invalid response');
    }
    return null;
  }

  const json = await response.json();
  const data = json.data.tickers;
  const filterData = data.filter((item) => item.symbol.includes('USDT'))
  return { filterData };
};

const getPancake = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });  

  if (!response.ok) {
    if (response.status !== 404) {
      throw new Error('Invalid response');
    }
    return null;
  }

  const json = await response.json();
  const data = [];
  Object.keys(json.data).map((item) => data.push(json.data[item]));
  return { data };
};

const getBinance = async (url) => {
  const response = await fetch(url, {
    method: 'GET',

  });
  if (!response.ok) {
    if (response.status !== 404) {
      throw new Error('Invalid response');
    }
    return null;
  }

  const json = await response.json();
  const filterData = json.filter((item) => item.symbol.includes('USDT'))
  return { filterData };
};

const getKucoin = async (url) => {
  const response = await fetch(url, {
    method: 'GET',

  });
  if (!response.ok) {
    if (response.status !== 404) {
      throw new Error('Invalid response');
    }
    return null;
  }

  const json = await response.json();
  const filterData = json.data.ticker.filter((item) => item.symbol.includes('USDT'))
  return { filterData };
};

const GetPrice = { getBitmart,getPancake, getBinance, getKucoin };

export default GetPrice;
