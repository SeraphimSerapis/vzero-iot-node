#include "application.h"
#include "LiquidCrystal/LiquidCrystal.h"

// CHANNEL        RS, EN, D4, D5, D6, D7
// LCD             4,  6, 14, 13, 12, 11
LiquidCrystal lcd(D0, D1, D5, D4, D3, D2);

void setup() {
  lcd.begin(20, 4);
  lcd.print("Braintree vzero");

  Spark.function("pay", handlePayment);
}

void loop() {
}

int handlePayment(String payload) {
  lcd.clear();
  lcd.setCursor(0,0);

  int index = payload.indexOf(",");
  if (index == -1) {
    lcd.print("Error!");
    return -1;
  }

  lcd.print("Received Payment");

  String amount = payload.substring(0, index);
  lcd.setCursor(0,2);
  lcd.print("Amount: " + amount + " USD");

  String type = payload.substring(index + 1);
  lcd.setCursor(0,3);
  lcd.print("Via " + type);

  return 1;
}
