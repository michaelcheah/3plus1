from flask import Flask,render_template,request,Response,json
import sys
app = Flask(__name__)

tempHum_list = []



def parse_temp(input_binary_string):
    #convert to string
    input = input_binary_string.decode('ascii')
    temp_string = input[input.find("TEMP: ")+len("TEMP: "):input.find("C,")]

    hum_string = input[input.find("HUM: ")+len("HUM: "):input.find("%")]

    
    return float(temp_string),float(hum_string)

@app.route("/")
def hello():
    #return page1
    return render_template("index.html")

@app.route('/test' , methods=['GET'])
def hello2():
    
    print(request.data, file=sys.stdout)
    temp,humidity = parse_temp(request.data)

    tempHum_list.append((temp,humidity))

    
    content = b"GET: Hello, Mbed!"
    resp = Response(content)
    resp.headers['Content-type'] = 'text/plain'
    resp.headers['Content-Length'] = len(content)    
    return resp

@app.route('/result')
def output_result():
    content = "<html><body><table>"
    for i in tempHum_list:
        content += ("<tr><td>"+str(i[0])+"</td><td>"+str(i[1])+"</td></tr>")
    content+="</table></body></html>"
    return content

if __name__ == '__main__':
    #app = create_app()
    app.run(host="10.248.153.33")
