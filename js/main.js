//  function to return http://erikflowers.github.io/weather-icons/ icon class based on yahoo condition code cheers to you: https://gist.github.com/Kepro/9ea2a918fd6f0a58b474
function setWeatherIcon(condid) {
  var icon = '';
      switch(condid) {
        case '0': icon  = 'wi-tornado';
          break;
        case '1': icon = 'wi-storm-showers';
          break;
        case '2': icon = 'wi-tornado';
          break;
        case '3': icon = 'wi-thunderstorm';
          break;
        case '4': icon = 'wi-thunderstorm';
          break;
        case '5': icon = 'wi-snow';
          break;
        case '6': icon = 'wi-rain-mix';
          break;
        case '7': icon = 'wi-rain-mix';
          break;
        case '8': icon = 'wi-sprinkle';
          break;
        case '9': icon = 'wi-sprinkle';
          break;
        case '10': icon = 'wi-hail';
          break;
        case '11': icon = 'wi-showers';
          break;
        case '12': icon = 'wi-showers';
          break;
        case '13': icon = 'wi-snow';
          break;
        case '14': icon = 'wi-storm-showers';
          break;
        case '15': icon = 'wi-snow';
          break;
        case '16': icon = 'wi-snow';
          break;
        case '17': icon = 'wi-hail';
          break;
        case '18': icon = 'wi-hail';
          break;
        case '19': icon = 'wi-cloudy-gusts';
          break;
        case '20': icon = 'wi-fog';
          break;
        case '21': icon = 'wi-fog';
          break;
        case '22': icon = 'wi-fog';
          break;
        case '23': icon = 'wi-cloudy-gusts';
          break;
        case '24': icon = 'wi-cloudy-windy';
          break;
        case '25': icon = 'wi-thermometer';
          break;
        case '26': icon = 'wi-cloudy';
          break;
        case '27': icon = 'wi-night-cloudy';
          break;
        case '28': icon = 'wi-day-cloudy';
          break;
        case '29': icon = 'wi-night-cloudy';
          break;
        case '30': icon = 'wi-day-cloudy';
          break;
        case '31': icon = 'wi-night-clear';
          break;
        case '32': icon = 'wi-day-sunny';
          break;
        case '33': icon = 'wi-night-clear';
          break;
        case '34': icon = 'wi-day-sunny-overcast';
          break;
        case '35': icon = 'wi-hail';
          break;
        case '36': icon = 'wi-day-sunny';
          break;
        case '37': icon = 'wi-thunderstorm';
          break;
        case '38': icon = 'wi-thunderstorm';
          break;
        case '39': icon = 'wi-thunderstorm';
          break;
        case '40': icon = 'wi-storm-showers';
          break;
        case '41': icon = 'wi-snow';
          break;
        case '42': icon = 'wi-snow';
          break;
        case '43': icon = 'wi-snow';
          break;
        case '44': icon = 'wi-cloudy';
          break;
        case '45': icon = 'wi-lightning';
          break;
        case '46': icon = 'wi-snow';
          break;
        case '47': icon = 'wi-thunderstorm';
          break;
        case '3200': icon = 'wi-cloud';
          break;
        default: icon = 'wi-cloud';
          break;
      }

      return icon;
}

$(document).ready(function () {

    //declare some variables to store weather details in
    var todaysCondtionCode;
    var todaysHighF;
    var todaysDescription;
    var tomorrowsCondtionCode;
    var tomorrowsHighF;
    var tomorrowsDescription;
    var alarmTime;
    var hasAlarmed = false;

    // Use jQuery getJSON function to get Melbourne's weather forcast from the yahoo weather API - https://developer.yahoo.com/weather/
    // You can put this link in your browser and view the data
    // Check the documentation for any limits on API usage
    $.getJSON( "https://query.yahooapis.com/v1/public/yql?q=SELECT%20item.forecast%20FROM%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22melbourne%2C%20au%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function( data ) {

        //This is the success function which runs after the data has been successfully loaded

        //assign each variable with appropriate data from JSON object

        todaysCondtionCode = data.query.results.channel[0].item.forecast.code;
        //console.log(todaysCondtionCode); //for testing

        todaysHighF = data.query.results.channel[0].item.forecast.high;
        //console.log(todaysHighF); //for testing

        todaysDescription = data.query.results.channel[0].item.forecast.text;
        //console.log(todaysDescription); //for testing

        tomorrowsCondtionCode = data.query.results.channel[1].item.forecast.code;
        //console.log(tomorrowsCondtionCode); //for testing

        tomorrowsHighF = data.query.results.channel[1].item.forecast.high;
        //console.log(tomorrowsHighF); //for testing

        tomorrowsDescription = data.query.results.channel[1].item.forecast.text;
        //console.log(tomorrowsDescription); //for testing

    }).done(function (){

        //you can add a done function to run after success function completes
        //use maths to convert Farenheit value to Celsius
        var todaysHighC = (todaysHighF-32)*5/9;
        //use JavaScript toFixed() function to round to one decimal place
        todaysHighC = todaysHighC.toFixed(1);
        //same for tomorrow's high
        var tomorrowsHighC = (tomorrowsHighF-32)*5/9;
        tomorrowsHighC = tomorrowsHighC.toFixed(1);
        //use jQuery append function to add temperature and descriptions
        $('.today p').append('<span>'+todaysHighC+'</span> degrees C <br>'+todaysDescription);
        $('.tomorrow p').append('<span>'+tomorrowsHighC+'</span> degrees C <br>'+tomorrowsDescription);

        //
        var iconClass = setWeatherIcon(todaysCondtionCode);
        $('.today .wi').addClass(iconClass);

        iconClass = setWeatherIcon(tomorrowsCondtionCode);
        $('.tomorrow .wi').addClass(iconClass);
    });

    //adding the clock displaying time on the page
    //create div then jquery to put it into the dom.

    function myTime(){
      var Time = moment().format('LTS');
      $(".currentTime").html(Time);
      var nowTime = moment().valueOf();
      console.log(nowTime);
      console.log(alarmTime);
      if (nowTime >= alarmTime){
        // request below url
         $.getJSON("https:api.spotify.com/v1/search?q=" + tomorrowsDescription + "&type=track", function(data){
           var imageUrl = data.tracks.items[0].album.images[0].url
           var $img = $('<img />')
           $img.attr('src', imageUrl);
           $('.albumContainer').append($img)
         });
        clearInterval(interval)
      }
    }

    var interval = setInterval(myTime, 1000);

    //Get the input values
    // 1. Give each input a class
    // 2. Save input values into variables
    // 3. Get epoch time from those values
    $(".setAlarm").click(function(){
      var hr = $(".hr").val();
      var min = $(".min").val();
      var meridien = $(".am_pm").val();
      console.log(meridien);
      if (meridien == 'am'){
        var epoch = moment({hour: hr, minute: min});    //Convert those values to epoch time
      }
      else{
        var epoch = moment({hour: parseInt(hr) + 12, minute: min});    //Convert those values to epoch time
        console.log(hr);
        console.log(parseInt(hr) + 12);
      }
      alarmTime = epoch.valueOf()
    })

});

//authentication in spotify
//get song name by id
//use a switch case to change the song via key words
