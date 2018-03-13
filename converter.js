var CurrencyConverter = (function () {
'use strict';

  var apiKey = "L6AALMMI4PBH7IY8",
      intervalRef = null;

  var convert = function (from,to) {
    var url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='
    + from + '&to_currency=' + to + '&apikey=' + apiKey;

    return $.getJSON(url);
  };

  var EURtoUSD = function(interval) {
    return convert("EUR", "USD");
  }
  
  var USDtoCHF = function(interval) {
    return convert("USD", "CHF");
  }

  var USDtoJPY = function(interval) {
    return convert("USD", "JPY");
  }

  var convertAll = function(interval) {
    return $.when(EURtoUSD(), USDtoCHF(), USDtoJPY())
      .done(function(data1, data2, data3) {
        $("#EURUSD").html(data1[0]["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        $("#USDCHF").html(data2[0]["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        $("#USDJPY").html(data3[0]["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        intervalRef = setTimeout(function() {
          convertAll(interval);
        }, interval * 1000);
      });
  }

  var stopRefresh = function() {
    clearTimeout(intervalRef);
  }
  
  return {
    convertAll: convertAll,
    stopRefresh: stopRefresh
  };

})();

$(function() {
  $("#converter").click(function() {
    var interval = Number($("#interval").val());
    if(!interval) {
      alert("Please enter a valid refresh interval in seconds!");
    } else {
      CurrencyConverter.convertAll(interval);
    }
  });

  $("#stop-converter").click(function() {
    CurrencyConverter.stopRefresh();
  });
});