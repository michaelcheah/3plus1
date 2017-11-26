var ctx;
var myChart;

var times = [];

var timeRange = 50;

var output1_coeff = 1;
var retweetCoefs = [1,1];
var favCoefs = [1,1];

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


function updateIndicator(){
    var output1_temp = [];
    var output2_temp = [];
    var output3_temp = [];
    var output4_temp = [];
    var output5_temp = [];
    var output6_temp = [];
    var output7_temp = [];
  for(var t = 0; t <  output1.length; t = t + 1){
            output1_temp.push( output1_coeff * output1[t]);
            output2_temp.push( output2_coeff * output2[t]);
            output3_temp.push( output3_coeff * output3[t]);
            output4_temp.push( output4_coeff * output4[t]);
            output5_temp.push( output5_coeff * output5[t]);
            output6_temp.push( output6_coeff * output6[t]);
            output7_temp.push( output7_coeff * output7[t]);
  }  
    
    //output1 = output1_temp;
  myChart.data.datasets[0].data = output1_temp;
  myChart.data.datasets[1].data = output2_temp;
  myChart.data.datasets[2].data = output3_temp;
  myChart.data.datasets[3].data = output4_temp;
  myChart.data.datasets[4].data = output5_temp;
  myChart.data.datasets[5].data = output6_temp;
  myChart.data.datasets[6].data = output7_temp;

  myChart.update();

  document.getElementById('output1_coeff').value = output1_coeff;
  document.getElementById('output2_coeff').value = output2_coeff;
  document.getElementById('output3_coeff').value = output3_coeff;   
  document.getElementById('output4_coeff').value = output4_coeff;
  document.getElementById('output5_coeff').value = output5_coeff;
  document.getElementById('output6_coeff').value = output6_coeff;
  document.getElementById('output7_coeff').value = output7_coeff;
}

    
    

function generateData(result){
    var array1 = result.data;
    var arrayLength = array1.length;
    var temp = [];
    for (var i = 1; i < arrayLength; i++){
	time.push(array1[i][0]);
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

    var time = [];
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



function plotRawGraph(filename){
    
    ctx = document.getElementById('myChart').getContext('2d');
    
    var myRequest = new Request(filename);

    fetch(myRequest)
      .then(function(response) { return response.text(); })
      .then(function(csv) {   
        Papa.parse(csv, {
            complete: function(results) {
               //console.log(results);
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
                
                timeRange=output1.length
    
                  myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels:time,
                      datasets: [
                        output1_plot,output2_plot,output3_plot,output4_plot,output5_plot,output6_plot,output7_plot],
                    }
                  });
                                
            }
        });
    });
    
};


function plotLandlordGraph(filename){
    
    
    
    
}

window.onload = function(){
    
    var file = '/static/kevin.csv';
    
    plotRawGraph(file);
    
    document.getElementById('output1_coeff').value = 1;
      document.getElementById('output2_coeff').value = 1;
      document.getElementById('output3_coeff').value = 1;   
      document.getElementById('output4_coeff').value = 1;
      document.getElementById('output5_coeff').value = 1;
      document.getElementById('output6_coeff').value = 1;
      document.getElementById('output7_coeff').value = 1;
    
    
    
    updateIndicator();

    
  
};


function plotLandlordTempWeekly(){
    console.log(output1);

    output1.length=0;
    output2.length=0;
    output3.length=0;
    output4.length=0;
    output5.length=0;
    output6.length=0;
    output7.length=0;
    myChart.destroy();
    
    var filename = '/static/landLord.csv';
    ctx = document.getElementById('myChart').getContext('2d');
    
    var myRequest = new Request(filename);

    fetch(myRequest)
      .then(function(response) { return response.text(); })
      .then(function(csv) {   
        Papa.parse(csv, {
            complete: function(results) {
                //console.log(results);
                generateData(results);
                var output1_plot = {
                  data: output1,
                  label: "Temperature",
                  borderColor: "#f0ad4e",
                  fill: false,
                }
		var output2_plot = {
                  data: output2,
                  label: "Humidity",
                  borderColor: "#0052C2",
                  fill: false,
                }
		var output3_plot = {
                  data: output3,
                  label: "Visible",
                  borderColor: "#003b8f",
                  fill: false,
                }
		var output4_plot = {
                  data: output4,
                  label: "Infra-red",
                  borderColor: "#4794ff",
                  fill: false,
                }
		var output5_plot = {
                  data: output5,
                  label: "Acceleration_x",
                  borderColor: "#9500cb",
                  fill: false,
                }
		var output6_plot = {
                  data: output6,
                  label: "Acceleration_y",
                  borderColor: "#5cb85c",
                  fill: false,
                }
		var output7_plot = {
                  data: output7,
                  label: "Acceleration_z",
                  borderColor: "#e27fef",
                  fill: false,
                }
                
                var x=0;
                while(output1[x]!=""){
                    x++;
                }
        
                var time_len=x;
                console.log(output1);
                console.log(x);
                  myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels:Array.apply(null, Array(time_len)).map(function (_, i) {return i;}),
                      datasets: [
                        output1_plot,output2_plot,output3_plot,output4_plot,output5_plot,output6_plot,output7_plot],
                    }
                  });
                                
            }
        });
    });
    
}



