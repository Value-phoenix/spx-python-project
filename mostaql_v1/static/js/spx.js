function displayData(option){
/**
 * Stuff related to SPX
 */
const BASE_URL = `https://api.gexbot.com/${option}`;
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
    const timestamp = data.timestamp;
    const date = timestamp.slice(0,10);
    const newDate = date.replace(/-/g, "/");
    const time = timestamp.slice(11,19);
    document.getElementById('date-p').innerHTML = newDate;
    document.getElementById('time-p').innerHTML = time;
  })
  .catch((error) => {
    // Handle error
    console.error('Error:', error);
  });

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    /** Prepare the data */
    const len = data.strikes.length;
    const t = data.strikes;
    // .slice(len-30, len+30);
    
    const scatterarray = [];
    for (let i = 0; i < t.length; i++) {
      for (let j = 0; j < t[i][3].length; j++) {
        scatterarray.push([
          t[i][3][j],t[i][0]
        ])        
      }      
    }
    const num  = scatterarray.length;
    const scatterarray1 = scatterarray.slice(1, len);
    const scatterarray2 = scatterarray.slice( len+1, len*2);
    const scatterarray3 = scatterarray.slice(len*2+1, len*3);
    const scatterarray4 = scatterarray.slice(len*3+1, len*4);
    const scatterarray5 = scatterarray.slice(len*4+1, len*5);
    // scatterarray.push(
    // scatterarray.push(
    //   t.map((strike) => {
    //     for (let index = 0; index < strike[3].length; index++) {
    //       return [strike[3][index], strike[0]];
    //     }
    //   })
    // )
    const strikes = t.map((strike) => strike[0]);
    const gexVolData = t.map((strike) => ({
      value: strike[1],
      label: 'labelRight',
    }));
    
    const gexOiData = t.map((strike) => ({
      value: strike[2],
      label: 'labelLeft',
    }));
    const zeroGamma = data.zero_gamma;
    const roundedZeroGamma = Math.round(zeroGamma/20)*20;
    const spot = data.spot;
    const majorPosVol = data.major_pos_vol;
    const majorPosOi = data.major_pos_oi;
    const majorNegVol = data.major_neg_vol;
    const majorNegOi = data.major_neg_oi;
    const roundedSpot = Math.round(data.spot/20)*20;
    const roundedMajorPosVol = Math.round(data.major_pos_vol/20)*20;
    const roundedMajorPosOi = Math.round(data.major_pos_oi/20)*20;
    const roundedMajorNegVol = Math.round(data.major_neg_vol/20)*20;
    const roundedMajorNegOi = Math.round(data.major_neg_oi/20)*20;
    
    const coorminvalue = strikes[0];
    const coormaxvalue = strikes[len-1];
    const up_compare = coormaxvalue-roundedSpot;
    const down_compare = roundedSpot-coorminvalue;
    if(down_compare != up_compare){
      if (down_compare > up_compare) {
        const diff = down_compare - up_compare;
        const addstrikes = [];
        for (let i = 0; i < diff; i++) {
          addstrikes.push(coormaxvalue+i+1);          
        }
        addstrikes.map(row => (
          strikes.push(row)
        ));
      }
    }
    console.log(strikes);
    /**
     * Rendering the date and time
     */
    // const timestamp = data.timestamp;
    // const dateObj = new Date(timestamp);
    // const year = dateObj.getFullYear();
    // const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    // const day = String(dateObj.getDate()).padStart(2, '0');
    // let hours = dateObj.getHours();
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12;
    // const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    // const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    // const formattedDate = `${month}/${day}/${year}`;
    // const formattedDate = `${month}/${day}/${year}`;
    // const formattedDate = `${month}/${day}/${year}`;
    // const formattedDate = `${month}/${day}/${year}`;
    // const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    
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
    let net_gex_vol =data.sum_gex_vol;
    let net_gex_oi = data.sum_gex_oi;
    // for (const strike of data.strikes) {
    //   net_gex_vol += strike.gex_vol;
    //   net_gex_oi += strike.gex_oi;
    // }
    document.getElementById('net-gex-volume-p').textContent =
      net_gex_vol.toFixed(3);
    document.getElementById('net-gex-oi-p').textContent = net_gex_oi.toFixed(3);

    var dom = document.getElementById('chart-container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    
    var option;
    const labelLeft = {
      position: 'left',
    };
    const labelRight = {
      position: 'right',
    };

    option = {
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'inside',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
      ],
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
        top: 10,
        bottom: 30,
        left: 100,
      },
      xAxis: {
        type: 'value',
        position: 'center',
        splitLine: { show: false },
        min: -100,
        max: 100,
        beginAtZero : true,
        axisPointer: {
          label: {
              show: true
          }
        },
        axisLabel: {
            interval: 20 // Set the interval for displaying labels on the x-axis
        }
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
        position: 'center',
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
                  color: 'rgb(255,255,255)',
                  type: 'line',
                  width : 3,
                },
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  formatter: `Spot value \n \n${spot}`,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#000',
                  padding: [10, 15],
                  position: 'middle',
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
                position: 'center',
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
              color: 'red',
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
              color : 'blue',
              // color: function (params) {
              //   var colorList = ['#F198C1'];
              //   return colorList[params.dataIndex % 3];
              // },
            },
            emphasis: {
              barBorderRadius: 10,
            },
          },
          barWidth: 8,
          barCategoryGap: '0%',
          data: gexOiData,
        },
        
        {
          name: 'point By key',
          xAxis: scatterarray.map(row => row[0]),
          yAxis: scatterarray.map(row => row[1]),
          type : 'scatter',
          symbol: 'circle',
          symbolSize : 10,
          data : scatterarray1.map(row => row[0]),
          itemStyle: {
            color : 'purple',
          }
        },
        {
          name: 'point By key',
          xAxis: scatterarray.map(row => row[0]),
          yAxis: scatterarray.map(row => row[1]),
          type : 'scatter',
          symbol: 'circle',
          symbolSize : 10,
          data : scatterarray2.map(row => row[0]),
          itemStyle: {
            color : 'brown',
          }
        },
        {
          name: 'point By key',
          xAxis: scatterarray.map(row => row[0]),
          yAxis: scatterarray.map(row => row[1]),
          type : 'scatter',
          symbol: 'circle',
          symbolSize : 10,
          data : scatterarray3.map(row => row[0]),
          itemStyle: {
            color : 'yellow',
          }
        },
        {
          name: 'point By key',
          xAxis: scatterarray.map(row => row[0]),
          yAxis: scatterarray.map(row => row[1]),
          type : 'scatter',
          symbol: 'circle',
          symbolSize : 10,
          data : scatterarray4.map(row => row[0]),
          itemStyle: {
            color : 'grey',
          }
        },
        {
          name: 'point By key',
          xAxis: scatterarray.map(row => row[0]),
          yAxis: scatterarray.map(row => row[1]),
          type : 'scatter',
          symbol: 'circle',
          symbolSize : 10,
          data : scatterarray5.map(row => row[0]),
          itemStyle: {
            color : 'green',
          }
        },
        // {
        //   name: 'point By key',
        //   type : 'scatter',
        //   data : scatterarray[0]
        // }
      ],
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }else{
      console.log('error');
    }

    window.addEventListener('resize', myChart.resize);
  //   window.addEventListener('resize', function() {
  //     myChart.resize();
  // });
  })
  .catch((error) => {
    console.error(error);
  });

/**
 * Stuff related to echarts
 */
}




