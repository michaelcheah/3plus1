//----------------------------------------------------------------------------
// The confidential and proprietary information contained in this file may
// only be used by a person authorised under and to the extent permitted
// by a subsisting licensing agreement from ARM Limited or its affiliates.
//
// (C) COPYRIGHT 2016 ARM Limited or its affiliates.
// ALL RIGHTS RESERVED
//
// This entire notice must be reproduced on all copies of this file
// and copies of this file may only be made by a person if such person is
// permitted to do so under the terms of a subsisting license agreement
// from ARM Limited or its affiliates.
//----------------------------------------------------------------------------
#include "mbed.h"
#include "C12832.h"
#include "OdinWiFiInterface.h"
#include "http_request.h"
#include "Sht31.h"


// GLOBAL VARIABLES HERE

OdinWiFiInterface wifi;
C12832  lcd(PE_14, PE_12, PD_12, PD_11, PE_9);
Sht31 temp_sensor(PF_0, PF_1);


// FUNCTION DEFINITIONS HERE

InterruptIn post_button(PF_2);
InterruptIn get_put_button(PG_4);
volatile bool post_clicked = false;
volatile bool get_clicked = false;

void send_post() {
    post_clicked = true;
}
 
void send_get_put() {
    get_clicked = true;
}

void lcd_print(const char* message) {
    lcd.cls();
    lcd.locate(0, 3);
    lcd.printf(message);
}

string read_temp() {
    float t = temp_sensor.readTemperature();
    float h = temp_sensor.readHumidity();
    char val[32];
    sprintf(val, "TEMP: %3.2fC, HUM: %3.2f%%", t, h);
    lcd_print(val);
    return val;
}

void send_request(const char * body){
    NetworkInterface* net = &wifi;
    HttpRequest* request = new HttpRequest(net, HTTP_GET, "http://10.248.153.33:5000/test");
    request->set_header("Content-Type", "application/json");
    //const char body[] = "{\"get\":\"request\",\"test\":\"output\"}";
    //const char * body = read_temp().c_str();
    HttpResponse* response = request->send(body, strlen(body));
    lcd_print(response->get_body_as_string().c_str());
    delete request;
}



int main() {

    // MAIN CODE HERE
    
    lcd_print("Connecting...");
    int ret = wifi.connect(MBED_CONF_APP_WIFI_SSID, MBED_CONF_APP_WIFI_PASSWORD, NSAPI_SECURITY_WPA_WPA2);
    if (ret != 0) {
        lcd_print("Connection error.");
        return -1;
    }
    lcd_print("Successfully connected!");
    
    post_button.rise(&send_post);
    get_put_button.rise(&send_get_put);
    while (true) {
        // WHILE LOOP CODE HERE
        
        if (get_clicked) {
            get_clicked = false;
            send_request(read_temp().c_str());
        }
        
        send_request(read_temp().c_str());
        
        wait(0.5);
         
        //wait_ms(2000);
         
        /*if (put_clicked) {
            put_clicked = false;
            NetworkInterface* net = &wifi;
            HttpRequest* request = new HttpRequest(net, HTTP_PUT, "http://10.248.153.33:8080");
            request->set_header("Content-Type", "application/json");
            const char body[] = "{\"put\":\"request\"}";
            HttpResponse* response = request->send(body, strlen(body));
            lcd_print(response->get_body_as_string().c_str());
            delete request;
        }
        */
        
     
    }


}
