var datatable1 =[];
for(let key in data){
  datatable1.push({key : data[key]});
}
for (let i = 2; i < datatable1.length; i++) {
data_array.push({key : datatable1[i].key});
}  
putget_array.push(data.current[0]);
if (putget_array.length > 20) {
  putget_array.splice(0,1);
}
if (data_array.length > 120) {
  data_array.splice(0,6);
}
const bubble_x_table =[];
const bubble_y_table =[];
const bubble_position = [];
for (let i = 0; i < data_array.length; i++) {
  bubble_x_table.push(data_array[i].key[1]);          
}
for (let i = 0; i < data_array.length; i++) {
  bubble_y_table.push(data_array[0].key[0]);          
}
if (data_array.length > 120) {
  data_array.splice(0,6);
}
// console.log(putget_array.map(row=>row));
if (bubble_x_table.length > 120) {
  bubble_x_table.splice(0,6);
  bubble_y_table.splice(0,6);
}
for (let i = 0; i < bubble_x_table.length; i++) {
  bubble_position.push(
    {x_pos: bubble_x_table[i], y_pos: bubble_y_table[i]}
  )          
}
const datasets = [];
for (let i = 0; i < putget_array.length; i++) {
    let dataPoints = [];
    for (let index = 6 * i; index < 6*i + 6; index++) {
        dataPoints.push({ x: bubble_x_table[index], y: bubble_y_table[index], r: 5 });
    }

    datasets.push({
        label: putget_array[i],
        data: dataPoints
    });
}
console.log( datasets);
// data_array += datatable1;
// console.log(data_array.map(row => row.key[1]));
// console.log(data_array);
// const bubble_data = {
//   datasets : [
//     {
//       yAxisID : 'yAxis',
//       label : 'bubble chart 1',
//       data : {
//         x : data_array.map(row=>row.key[1]),
//         y : ge
//       }
//     }
//   ]
// };
new Chart(
  document.getElementById('myChart1'),
  {
    type: 'scatter',
    data: {
      // labels: 'bubble chart',
      labels: putget_array,
      datasets: datasets,
    },
    options: {
      indexAxis: 'y',
      scales : {
        xAxes: [{ ticks: { min: -5, max: 5 } }],
        yAxes: [{
          ticks: {
            min: 4500, // Set your desired minimum value
            max: 5400, // Set your desired maximum value
            callback: function(value, index, values) {
              // Calculate the center value of the y-axis
              const centerValue = (values[values.length - 1].value + values[0].value) / 2;
              if (value === centerValue) {
                return ''; // Return empty string to hide the center value
              }
              return value;
            }
          }
        }],
        // yAxis : {
        //   position: {
        //     y: 'center'
        //   },
        //   ticks : {
        //     align: 'center',
        //     autoSkipPadding : 10
        //   }
        // },
        y: {
            beginAtZero: true,
            suggestedMin: 5000,
            suggestedMax: 5500
          },
        x: {
            grid: {
              display: true
            },
            beginAtZero: true,
            suggestedMin: -100,
            suggestedMax: 100
          }
      },
      plugins: {
        customCanvasBackgroundColor: {
          color: 'black',
        }
      },
      devicePixelRatio: 2,
      elements: {
        bar: {
          borderRadius: 20,
          inflateamount: 1,
          width: 10
        }
      },
      layout: {
        padding : {
          top : 30,
          bottom : 30,
          left: 30,
          right: 30
        }
      },
    }
  }
);




<script>

const ctx = document.getElementById('myChart');
const plugin = {
  id: 'myChart',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

new Chart(ctx, {
  type: 'bubble',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, -5, -2, 3],
      borderColor: '#FF6384',
      backgroundColor: function(context) {
        const index = context.raw;
        // console.log(context)
        return index < 0 ? '#FFB1C1' : 'blue'; // Set color based on index position
      },
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true
      }
    },
    
    plugins: {
      beforeDraw: function(chart) {
        const ctx = chart.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#FFEEDD'; // Change background color here
        ctx.fillRect(1600, 800, chart.width, chart.height);
        ctx.restore();
      }
    }
  }
});

  
</script>


$(function() {

  function regularCall() {
    fetch(maxChangeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.timestamp != time_compare) {
      let flag = 0;

      for (let index = 0; index < flag_array.length; index++) {
        if (data.current[0] == flag_array[index]) {
          flag = 1;
          break;
        }
      }

      if (flag === 0) {
        flag_array.push(data.current[0]);
        if (flag_array.length > 21) {
          flag_array.splice(0, 1);
        }

        console.log(data.timestamp);
        console.log(time_compare);
        time_compare = data.timestamp;

        const datatable = [
          { x: data.current[1], y: data.current[0] },
          { x: data.one[1], y: data.current[0] },
          { x: data.five[1], y: data.current[0] },
          { x: data.ten[1], y: data.current[0] },
          { x: data.fifteen[1], y: data.current[0] },
          { x: data.thirty[1], y: data.current[0] }
        ];

        putget_array_item.push({ item: data.current });

        for (let i = 0; i < datatable.length; i++) {
          datatable1.push(datatable[i]);
        }

        if (datatable1.length > 120) {
          datatable1.splice(0, 6);
        }

        if (putget_array_item.length > 20) {
          putget_array_item.splice(0, 1);
        }

        // console.log(putget_array_item.map(key => key.item[1]));

        document.getElementById('myChart1').remove();
        document.getElementById('parent_canas').innerHTML = '<canvas id="myChart1" style="background-color: #292929; width : 1672px; height : 836px;"></canvas>';

        new Chart(
          document.getElementById('myChart1'),
          {
            type: 'bar',
            data: {
              labels : putget_array_item.map(row => row.item[0]),
              datasets: [
                {
                label: 'scatter Chart',
                xAxesID : 'x2',
                pointRadius: 5,
                data: datatable1,
                pointBackgroundColor: ['white', 'brown', 'blue', 'yellow', 'grey', 'pink'],
                type : 'scatter'
              },
              {
                label: 'Acquisitions by year',
                yAxisID : 'y-axis-1',
                data: putget_array_item.map(row => row.item[1]),
                backgroundColor: function(context) {
                  const index = context.raw;
                  return index < 0 ? 'red' : 'lightgreen'; // Set color based on index position
                },
                barThickness : 10
              }
            ]
            },
            options: {
              responsive : true,
              indexAxis: 'y',
              legend: { display: true },
              scales: {
                x: { 
                  id : 'x-axis-1',
                  display: true,
                  beginAtZero : true,
                  ticks: {
                    min: -100, // Set your desired minimum value
                    max: 100, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  }
                 },
                x2: { 
                  beginAtZero : true,
                  ticks: {
                    min: -100, // Set your desired minimum value
                    max: 100, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  },
                  labels: putget_array_item.map(key => key.item[0]),
                  offset: false,
                  display: false
                 },
                y: {
                  id: 'y-axis-1',
                  beginAtZero : true,
                  display : true,
                  ticks: {
                    min: -100, // Set your desired minimum value
                    max: 100, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  }
                },
                // x2: {
                //   labels: putget_array_item.map(key => key.item[0]),
                //   offset: false,
                //   display: false
                // }
              },
              elements: {
                bar: {
                  borderRadius: 20,
                  inflateamount: 1,
                  width: 10
                }
              },
            }
          }
        );
      } else {
        console.log('put Gex is not changed.');
      }
    }else{
      console.log('The price of stroke is not changed.')
    }
  })
  .catch((error) => {
    // Handle error
    console.error('Error:', error);
  });
}






//graph funtion
$(function() {

  function regularCall() {
    fetch(maxChangeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.timestamp != time_compare) {
      let flag = 0;

      for (let index = 0; index < flag_array.length; index++) {
        if (data.current[0] == flag_array[index]) {
          flag = 1;
          break;
        }
      }

      if (flag === 0) {
        flag_array.push(data.current[0]);
        if (flag_array.length > 21) {
          flag_array.splice(0, 1);
        }
        time_compare = data.timestamp;

        const datatable = [
          { x: data.current[1], y: data.current[0] },
          { x: data.one[1], y: data.current[0] },
          { x: data.five[1], y: data.current[0] },
          { x: data.ten[1], y: data.current[0] },
          { x: data.fifteen[1], y: data.current[0] },
          { x: data.thirty[1], y: data.current[0] }
        ];

        putget_array_item.push({ item: data.current });

        for (let i = 0; i < datatable.length; i++) {
          datatable1.push(datatable[i]);
        }

        if (datatable1.length > 120) {
          datatable1.splice(0, 6);
        }

        if (putget_array_item.length > 20) {
          putget_array_item.splice(0, 1);
        }

        // console.log(putget_array_item.map(key => key.item[1]));

        document.getElementById('myChart1').remove();
        document.getElementById('parent_canas').innerHTML = '<canvas id="myChart1" style="background-color: #292929; width : 1672px; height : 836px;"></canvas>';

        new Chart(
          document.getElementById('myChart1'),
          {
            type: 'bar',
            data: {
              labels : putget_array_item.map(row => row.item[0]),
              datasets: [
                {
                label: 'scatter Chart',
                xAxesID : 'x2',
                pointRadius: 5,
                data: datatable1,
                pointBackgroundColor: ['white', 'brown', 'blue', 'yellow', 'grey', 'pink'],
                type : 'scatter'
              },
              {
                label: 'Acquisitions by year',
                yAxisID : 'y-axis-1',
                data: putget_array_item.map(row => row.item[1]),
                backgroundColor: function(context) {
                  const index = context.raw;
                  return index < 0 ? 'red' : 'lightgreen'; // Set color based on index position
                },
                barThickness : 10
              }
            ]
            },
            options: {
              responsive : true,
              indexAxis: 'y',
              legend: { display: true },
              scales: {
                x: { 
                  id : 'x-axis-1',
                  display: true,
                  beginAtZero : true,
                  suggestedMin: -6,
                  suggestedMax: 6,
                  ticks: {
                    min: -6, // Set your desired minimum value
                    max: 6, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  }
                 },
                x2: { 
                  beginAtZero : true,
                  ticks: {
                    min: -100, // Set your desired minimum value
                    max: 100, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  },
                  labels: putget_array_item.map(key => key.item[0]),
                  offset: false,
                  display: false
                 },
                y: {
                  id: 'y-axis-1',
                  beginAtZero : true,
                  display : true,
                  ticks: {
                    min: -100, // Set your desired minimum value
                    max: 100, // Set your desired maximum value
                    callback: function(value, index, values) {
                      // Calculate the center value of the y-axis
                      const centerValue = (values[values.length - 1].value + values[0].value) / 2;
                      if (value === centerValue) {
                        return ''; // Return empty string to hide the center value
                      }
                      return value;
                    }
                  }
                },
                // x2: {
                //   labels: putget_array_item.map(key => key.item[0]),
                //   offset: false,
                //   display: false
                // }
              },
              layout : {
                autoPadding : true
              },
              elements: {
                bar: {
                  borderRadius: 20,
                  inflateamount: 2,
                  width: 10
                }
              },
            }
          }
        );
      } else {
        console.log('put Gex is not changed.');
      }
    }else{
      console.log('The price of stroke is not changed.')
    }
  })
  .catch((error) => {
    // Handle error
    console.error('Error:', error);
  });

  }
  setInterval(regularCall, 3000); // Time in milliseconds
  fetch(maxChangeUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      var datatable1 =[];
      for(let key in data){
        datatable1.push({key : data[key]});
      }
      new Chart(
        document.getElementById('myChart1'),
        {
          type: 'bar',
          options: {
            indexAxis: 'y',
            scale: {
              position: {
                y: 'center'
              }
            }
          },
          data: {
            labels: datatable1.map(row => row.key[0]),
            datasets: [
              {
                label: 'Acquisitions by year',
                axis: 'y',
                data: datatable1.map(row => row.key[1]),
                backgroundColor: function(context) {
                  const index = context.raw;
                  return index < 0 ? 'red' : 'lightgreen'; // Set color based on index position
                },
              }
            ]
          }
        }
      );
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
    });
})




              // {
              //   name: 'MajorPosVol',
              //   xAxis: 0,
              //   yAxis: roundedMajorPosVol.toString(),
              //   lineStyle: {
              //     color: 'rgb(3, 255, 53)',
              //     type: 'dashed',
              //   },
              //   symbol: 'circle',
              //   symbolSize: 10,
              //   label: {
              //     show: true,
              //     formatter: `Major Posiive\n Volume \n${majorPosVol}`,
              //     backgroundColor: ' rgb(3, 255, 53)',
              //     color: '#fff',
              //     padding: [5, 10],
              //     position: 'middle',
              //   },
              // },
              // {
              //   name: 'MajorPosOi',
              //   xAxis: 0,
              //   yAxis: roundedMajorPosOi.toString(),
              //   lineStyle: {
              //     color: 'rgb(232, 121, 249)',
              //     type: 'dashed',
              //   },
              //   symbol: 'circle',
              //   symbolSize: 10,
              //   label: {
              //     show: true,
              //     formatter: `Major Positive\n Oi \n${majorPosOi}`,
              //     backgroundColor: 'rgb(232, 121, 249)',
              //     color: '#fff',
              //     padding: [5, 10],
              //     position: 'start',
              //   },
              // },
              // {
              //   name: 'MajorNegVol',
              //   xAxis: 0,
              //   yAxis: roundedMajorNegVol.toString(),
              //   lineStyle: {
              //     color: 'rgb(61, 138, 68)',
              //     type: 'dashed',
              //   },
              //   symbol: 'circle',
              //   symbolSize: 10,
              //   label: {
              //     show: true,
              //     formatter: `Major Negative\n Vol \n${majorNegVol}`,
              //     backgroundColor: 'rgb(61, 138, 68)',
              //     color: '#fff',
              //     padding: [5, 10],
              //   },
              // },
              // {
              //   name: 'MajorNegOi',
              //   xAxis: 0,
              //   yAxis: roundedMajorNegOi.toString(),
              //   lineStyle: {
              //     color: 'rgb(162, 28, 175)',
              //     type: 'dashed',
              //   },
              //   symbol: 'circle',
              //   symbolSize: 10,
              //   label: {
              //     show: true,
              //     formatter: `Major Negative\n Oi \n${majorNegOi}`,
              //     backgroundColor: 'rgb(162, 28, 175)',
              //     color: '#fff',
              //     padding: [5, 10],
              //     position: 'middle',
              //   },
              // },