from flask import Flask,render_template,request,Response,json
import sys
import numpy as np
import pandas as pd
import __future__
app = Flask(__name__)

data_list = []


def parse_temp(input_binary_string):
    #convert to string
    input = input_binary_string.decode('ascii')
    #temp_string = input[input.find("TEMP: ")+len("TEMP: "):input.find("C,")]
    #hum_string = input[input.find("HUM: ")+len("HUM: "):input.find("%")]
    mylist = input.split(',')
    mylist=[float(x) for x in mylist]
    return mylist

@app.route("/")
def hello():
    #return page1
    wfile_csv()
    return render_template("index.html")

@app.route("/landlord")
def landlord():
    #return page1
    #wfile_csv()
    return render_template("landlord.html")

@app.route("/rawData")
def rawData():
    #return page1
    #wfile_csv()
    return render_template("rawData.html")


@app.route('/test' , methods=['GET'])
def hello2():
    
    #print(request.data, file=sys.stdout)
    data_list.append(parse_temp(request.data))
    
    content = b"GET: Hello, Mbed!"
    resp = Response(content)
    resp.headers['Content-type'] = 'text/plain'
    resp.headers['Content-Length'] = len(content)    
    return resp

@app.route('/result')
def output_result():
    content = "<html><body><table>"
    for i in data_list:
        content += ("<tr><td>"+str(i[0])+"</td><td>"+str(i[1])+"</td></tr>")
    content+="</table></body></html>"
    return content

def wfile_csv():
    data=pd.DataFrame(data_list,columns=['Temp','Humid','Co2lvl','TVOC','Visible','Infrared','Acc_x','Acc_y','Acc_z'])
    data.to_csv('static/mydata.csv')
    return data

if __name__ == '__main__':
    #app = create_app()
    app.run(host="10.248.153.33")
