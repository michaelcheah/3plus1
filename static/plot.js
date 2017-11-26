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
    for (var i = 1; i < arrayLength; i++){
        output1.push(array1[i][1]);
	output2.push(array1[i][2]);
	output3.push(array1[i][5]);
	output4.push(array1[i][6]);
	output5.push(array1[i][7]);
	output6.push(array1[i][8]);
	output7.push(array1[i][9]);
    }
    //console.log(output1);
    //return temp;
}


//console.log(output1);

    var output1 = [];
    var output1_plot = {};   
    var output2 = [];  
    var output2_plot = {};
    var output3 = [];  
    var output3_plot = {};
    var output4 = [];  
    var output4_plot = {};
    var output5 = [];  
    var output5_plot = {};
    var output6 = [];  
    var output6_plot = {};
    var output7 = [];  
    var output7_plot = {};

window.onload = function(){
    
  ctx = document.getElementById('myChart').getContext('2d');
    
    var myRequest = new Request('/static/michael.csv');
    

    fetch(myRequest)
      .then(function(response) { return response.text(); })
      .then(function(csv) {   
        Papa.parse(csv, {
            complete: function(results) {
                console.log(results);
                generateData(results);
                output1_plot = {
                  data: output1,
                  label: "Temperature",
                  borderColor: "#f0ad4e",
                  fill: false,
                }
		output2_plot = {
                  data: output2,
                  label: "Humidity",
                  borderColor: "#0052C2",
                  fill: false,
                }
		output3_plot = {
                  data: output3,
                  label: "Visible",
                  borderColor: "#003b8f",
                  fill: false,
                }
		output4_plot = {
                  data: output4,
                  label: "Infra-red",
                  borderColor: "#4794ff",
                  fill: false,
                }
		output5_plot = {
                  data: output5,
                  label: "Acceleration_x",
                  borderColor: "#9500cb",
                  fill: false,
                }
		output6_plot = {
                  data: output6,
                  label: "Acceleration_y",
                  borderColor: "#5cb85c",
                  fill: false,
                }
		output7_plot = {
                  data: output7,
                  label: "Acceleration_z",
                  borderColor: "#e27fef",
                  fill: false,
                }
console.log(output1)
console.log(output2)
                
                timeRange=output1.length
    
    
                  myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels:Array.apply(null, Array(timeRange)).map(function (_, i) {return i;}),
                      datasets: [
                        output1_plot,output2_plot,output3_plot,output4_plot,output5_plot,output6_plot,output7_plot],
                    }
                  });
                
            }
        });
    });

  
};