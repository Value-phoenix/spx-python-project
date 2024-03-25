/**
 * Stuff related to SPX
 */
const BASE_URL = 'https://api.gexbot.com/spx';
const url = `${BASE_URL}/gex/all?key=${apiKey}`;
const maxChangeUrl = `${BASE_URL}/gex/all/maxchange?key=${apiKey}`;
const data = 0;

fetch(maxChangeUrl)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('max-change-1-a').textContent = data.one[0].toFixed(2);
    document.getElementById('max-change-1-b').textContent = data.one[1].toFixed(2) + 'Bn';
    document.getElementById('max-change-5-a').textContent = data.five[0].toFixed(2);
    document.getElementById('max-change-5-b').textContent = data.five[1].toFixed(2) + 'Bn';
    document.getElementById('max-change-10-a').textContent = data.ten[0].toFixed(2);
    document.getElementById('max-change-10-b').textContent = data.ten[1].toFixed(2) + 'Bn';
    document.getElementById('max-change-15-a').textContent = data.fifteen[0].toFixed(2);
    document.getElementById('max-change-15-b').textContent = data.fifteen[1].toFixed(2) + 'Bn';
    document.getElementById('max-change-30-a').textContent = data.thirty[0].toFixed(2);
    document.getElementById('max-change-30-b').textContent = data.thirty[1].toFixed(2) + 'Bn';
    console.log(data);
  })
  .catch((error) => {
    // Handle error
    console.error('Error:', error);
  });

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    /** Prepare the data */
    console.log(data);
    const strikes = data.strikes.map((strike) => strike.strike);
    const gexVolData = data.strikes.map((strike) => ({
      value: strike.gex_vol,
      label: 'labelRight',
    }));
    const gexOiData = data.strikes.map((strike) => ({
      value: strike.gex_oi,
      label: 'labelLeft',
    }));
    const zeroGamma = data.zero_gamma;
    const roundedZeroGamma = Math.round(zeroGamma / 5) * 5;
    const spot = data.spot;
    const majorPosVol = data.major_pos_vol;
    const majorPosOi = data.major_pos_oi;
    const majorNegVol = data.major_neg_vol;
    const majorNegOi = data.major_neg_oi;
    const roundedSpot = Math.round(data.spot / 5) * 5;
    const roundedMajorPosVol = Math.round(data.major_pos_vol / 5) * 5;
    const roundedMajorPosOi = Math.round(data.major_pos_oi / 5) * 5;
    const roundedMajorNegVol = Math.round(data.major_neg_vol / 5) * 5;
    const roundedMajorNegOi = Math.round(data.major_neg_oi / 5) * 5;
    /**
     * Rendering the date and time
     */
    const timestamp = data.timestamp;
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('date-p').innerHTML = formattedDate;
    document.getElementById('time-p').innerHTML = formattedTime;
    /**
     * Rendering Spot
     */
    document.getElementById('spot-p').innerHTML = spot;
    /**
     * Rendering Zero Gamma
     */
    document.getElementById('zero-gamma-p').innerHTML = zeroGamma;
    /**
     * Rendering Major Positive Volume
     */
    document.getElementById('major-positive-volume-p').innerHTML = majorPosVol;
    /**
     * Rendering Major Negative Volume
     */
    document.getElementById('major-negative-volume-p').innerHTML = majorNegVol;
    /**
     * Rendering Major Positive OI
     */
    document.getElementById('major-positive-oi-p').innerHTML = majorPosOi;
    /**
     * Rendering Major Negative OI
     */
    document.getElementById('major-negative-oi-p').innerHTML = majorNegOi;
    /**
     * Rendering Net Gex
     */
    let net_gex_vol = 0;
    let net_gex_oi = 0;
    for (const strike of data.strikes) {
      net_gex_vol += strike.gex_vol;
      net_gex_oi += strike.gex_oi;
    }
    document.getElementById('net-gex-volume-p').textContent =
      net_gex_vol.toFixed(3);
    document.getElementById('net-gex-oi-p').textContent = net_gex_oi.toFixed(3);

    var dom = document.getElementById('chart-container');
     echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var app = {};
    var option;
    const labelLeft = {
      position: 'left',
    };
    const labelRight = {
      position: 'right',
    };

    option = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'center',
        top: 'middle',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: 80,
        bottom: 30,
        left: 350,
      },
      xAxis: {
        type: 'value',
        position: 'bottom',
        splitLine: { show: false },
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
        },
        axisTick: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        minorTick: { show: false },
        label: {
          show: true,
          align: 'center',
        },
        onZero: true,
        onZeroAxisIndex: 1,
        data: strikes,
      },
      series: [
        {
          name: 'GEX By Vol',
          type: 'bar',

          markLine: {
            data: [
              {
                name: 'Spot',
                xAxis: 0,
                yAxis: roundedSpot.toString(),
                lineStyle: {
                  color: 'yello',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Spot \n${spot}`,
                  backgroundColor: 'rgba(255, 255, 0, 0.7)',
                  color: '#fff',
                  padding: [5, 10],
                  position: 'start',
                },
              },
              {
                name: 'Zero Gamma',
                xAxis: 0,
                yAxis: roundedZeroGamma.toString(),
                lineStyle: {
                  color: ' rgb(252, 177, 3)',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Zero Gamma \n${zeroGamma}`,
                  backgroundColor: 'rgb(252, 177, 3)',
                  color: '#fff',
                  padding: [5, 10],
                },
              },

              {
                name: 'MajorPosVol',
                xAxis: 0,
                yAxis: roundedMajorPosVol.toString(),
                lineStyle: {
                  color: 'rgb(3, 255, 53)',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Major Posiive\n Volume \n${majorPosVol}`,
                  backgroundColor: ' rgb(3, 255, 53)',
                  color: '#fff',
                  padding: [5, 10],
                  position: 'middle',
                },
              },
              {
                name: 'MajorPosOi',
                xAxis: 0,
                yAxis: roundedMajorPosOi.toString(),
                lineStyle: {
                  color: 'rgb(232, 121, 249)',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Major Positive\n Oi \n${majorPosOi}`,
                  backgroundColor: 'rgb(232, 121, 249)',
                  color: '#fff',
                  padding: [5, 10],
                  position: 'start',
                },
              },
              {
                name: 'MajorNegVol',
                xAxis: 0,
                yAxis: roundedMajorNegVol.toString(),
                lineStyle: {
                  color: 'rgb(61, 138, 68)',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Major Negative\n Vol \n${majorNegVol}`,
                  backgroundColor: 'rgb(61, 138, 68)',
                  color: '#fff',
                  padding: [5, 10],
                },
              },
              {
                name: 'MajorNegOi',
                xAxis: 0,
                yAxis: roundedMajorNegOi.toString(),
                lineStyle: {
                  color: 'rgb(162, 28, 175)',
                  type: 'dashed',
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Major Negative\n Oi \n${majorNegOi}`,
                  backgroundColor: 'rgb(162, 28, 175)',
                  color: '#fff',
                  padding: [5, 10],
                  position: 'middle',
                },
              },
            ],
          },

          label: {
            show: false,
            position: function (params) {
              return params.value >= 0 ? labelRight : labelLeft;
            },
            align: 'center',
          },
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: function (params) {
                var colorList = ['#8ef6e4', '#9896f1', '#F198C1'];
                return colorList[params.dataIndex % 3];
              },
            },
            emphasis: {
              barBorderRadius: 10,
            },
          },
          barWidth: 8,
          barCategoryGap: '0%',
          data: gexVolData,
        },

        {
          name: 'GEX By OI',
          type: 'bar',

          label: {
            show: false,
            position: function (params) {
              return params.value >= 0 ? labelRight : labelLeft;
            },
            align: 'center',
          },
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: function (params) {
                var colorList = ['#8ef6e4', '#F198C1', '#9896f1'];
                return colorList[params.dataIndex % 3];
              },
            },
            emphasis: {
              barBorderRadius: 10,
            },
          },
          barWidth: 8,
          barCategoryGap: '0%',
          data: gexOiData,
        },
      ],
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
  })
  .catch((error) => {
    console.error(error);
  });

/**
 * Stuff related to echarts
 */
