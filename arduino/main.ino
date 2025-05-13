#include <DHT.h>

#define DHTPIN    2       
#define DHTTYPE   DHT11
#define ACT_PIN   8       

DHT dht(DHTPIN, DHTTYPE);

float setpoint = 25.0;    

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(ACT_PIN, OUTPUT);
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("ERR");
  } else {

    bool on = (t >= setpoint);
    digitalWrite(ACT_PIN, on ? HIGH : LOW);


    Serial.print(t); Serial.print(",");
    Serial.print(h); Serial.print(",");
    Serial.println(on ? 1 : 0);
  }


  if (Serial.available()) {
    String line = Serial.readStringUntil('\n');
    if (line.startsWith("SP=")) {
      float sp = line.substring(3).toFloat();
      if (sp > 0) setpoint = sp;
    }
  }

  delay(2000);
}
