var ctx;
var myChart;

var times = [];

var timeRange = 50;


/**
  Generate array of time labels
*/
function makeTimeLabel(dataLength,interval,isforward){
  timeArray = [];
  for (i=0; i<= dataLength; i++){
          if (i % interval === 0){
            timeArray.push(i);
          } else {
            timeArray.push('');
          }
  }

  if (isforward === false){
    timeArrayNegative = timeArray.map(
      (x) => (x === '')?'':x*-1
    );
    return timeArrayNegative.reverse();

  } else {
    return timeArray
  }
}

/**
  Return a number formatted to have two decimal places
*/
function twoDec(num) {
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    return with2Decimals;
}




    
    


function generateData(result){
    var array1 = result.data;
    var arrayLength = array1.length;
    var temp = [];
    for (var i = 0; i < arrayLength; i++){
        temp.push(array1[i][0]);
    }
    //console.log(output1);
    return temp;
}

var output1_plot = {};

var output1 = [];    


//console.log(output1);




window.onload = function(){
    
  ctx = document.getElementById('myChart').getContext('2d');
    
    var myRequest = new Request('/static/out.csv');

    fetch(myRequest)
      .then(function(response) { return response.text(); })
      .then(function(csv) {   
        Papa.parse(csv, {
            complete: function(results) {
                console.log(results);
                output1 = generateData(results);
                output1_plot = {
                  data: output1,
                  label: "BTC Price",
                  borderColor: "#f0ad4e",
                  fill: false,
                }
                
                timeRange=output1.length
    
    
                  myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels: makeTimeLabel(timeRange,10,false),
                      datasets: [
                        output1_plot,
                      ],
                    }
                  });
                
            }
        });
    });

  
};