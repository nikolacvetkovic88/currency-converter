var CurrencyConverter = (function () {
  var apiKey = "L6AALMMI4PBH7IY8";

  var getData = function (from,to) {
    var url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='
    + from + '&to_currency=' + to + '&apikey=' + apiKey;

    return $.getJSON(url);
  };

  var convert = function (from, to) {
    return getData(from, to);
  };

  var EURtoUSD = function(interval) {
    return convert("EUR", "USD")
      .done(function(data) {
        $("#EURUSD").html(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        setTimeout(function() {
          return EURtoUSD();
        }, interval * 1000);
      });
  }
  
  var USDtoCHF = function(interval) {
    return convert("USD", "CHF")
      .done(function(data) {
        $("#USDCHF").html(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        setTimeout(function() {
          return USDtoCHF();
        }, interval * 1000);
      });
  }

  var USDtoJPY = function(interval) {
    return convert("USD", "JPY")
      .done(function(data) {
        $("#USDJPY").html(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        setTimeout(function() {
          return USDtoJPY();
        }, interval * 1000);
      });
  }
  
  return {
    EURtoUSD: EURtoUSD,
    USDtoCHF: USDtoCHF,
    USDtoJPY: USDtoJPY
  };

})();

$(function() {
  $("#converter").click(function() {
    var interval = Number($("#interval").val());
    if(!interval) {
      alert("Please enter a valid refresh interval in seconds!");
    } else {
      CurrencyConverter.EURtoUSD(interval);
      CurrencyConverter.USDtoCHF(interval);
      CurrencyConverter.USDtoJPY(interval);
    }
  });
});