const getData = async () => {
  const res = await fetch('data.csv');
  const resp = await res.text();
  //   console.log(resp);
  const cdata = resp.split('\n').map((row) => {
    const [datetime, open, high, low, close, volume] = row.split(',');
    return {
      datetime: new Date(`${datetime}`).getTime() / 1000,
      open: open * 1,
      high: high * 1,
      low: low * 1,
      close: close * 1,
      volume: volume * 1,
    };
  });
  return cdata;
  //   console.log(cdata);
};

// getData();

const displayChart = async () => {
  const chartProperties = {
    width: 1500,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
  };

  const domElement = document.getElementById('tvchart');
  const chart = LightweightCharts.createChart(domElement, chartProperties);
  const candleseries = chart.addCandlestickSeries();
  const klinedata = await getData();
  candleseries.setData(klinedata);
};

displayChart();
