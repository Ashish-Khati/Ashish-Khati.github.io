// All selectors are here
const weekDay=['Sun','Mon','Tue','Wed','Thru','Fri','Sat'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const unitsArray=['metric','imperial']
const timeField= document.getElementById("time");
const AmPmField=document.getElementById("am-pm");
const dateField=document.getElementById("date");
const timezoneField=document.getElementById("time-zone")
const humidityField=document.getElementById('humid')
const pressureField=document.getElementById("pressure")
const windSpeedField=document.getElementById('wind-speed')
const sunriseField=document.getElementById('sun-rise')
const sunsetField=document.getElementById('sun-set')
const dayField=document.getElementsByClassName('day');
const currentTempField=document.getElementById("current-temp");
const otherDayTempField=document.getElementById("weather-forecast");
const inputDataField=document.getElementById("search")
const searchBtnField=document.getElementById("search-btn")
const WeatherAPI='f441bb1e2efa67d5c72b2d3e8cf10147';
// const countryWeatherURL='api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
console.log(inputDataField,searchBtnField)


// All functions are here
function getDateAndTime()
{
   setInterval(()=>{
    const getDateAndTime=new Date();
    const day=getDateAndTime.getDay();
    const date=getDateAndTime.getDate();
    const month=getDateAndTime.getMonth();
    const getHour=getDateAndTime.getHours();
    const hour=hoursConvertor(getHour);
    const getMin=getDateAndTime.getMinutes();
    const getsec=getDateAndTime.getSeconds();
    const sec=minuteConvertor(getsec);
    const min=minuteConvertor(getMin);
    const amPm=amPmSetter(getHour);
      timeField.innerHTML=`<div class="time" id="time">${hour}:${min}:${sec}<span id="am-pm">${amPm}</span></div>`;
      dateField.textContent=`${weekDay[day]},${date} ${months[month]}`
   },1000)
      return getDateAndTime;
}
// 2
function hoursConvertor(hour)
{
   return hour>12?`${hour}`-12:hour;
}
//3
function minuteConvertor(min)
{
   return min<=9?`0${min}`:min;
}
// 4
function amPmSetter(hour)
{
   return (hour>12)?'PM':'AM';
}
// 5
function getWeather()
{
   navigator.geolocation.getCurrentPosition((success,reject)=>
   {
      if(reject)
      {
         function reject(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
      }
   }
      // console.log(success)
      console.log(success.coords)
      const {longitude,latitude}=success.coords;
      console.log(longitude,latitude)
      longLati(longitude,latitude)
   })
}

//6
function longLati(long=77.2167,lati=28.6667,otherWeatherURL=0)
{
   console.log(long,lati,otherWeatherURL)
      const dataFetchURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${WeatherAPI}`
      fetch(dataFetchURL)
      .then(res=>res.json())
      .then(data=>{
         console.log(data)
         showWeather(data);

      }) 
}
//7
function showWeather(data)
{
   // const day=getDateAndTime().getDay();
   // console.log(weekDay[day])
   timezoneField.textContent=data.timezone;
   console.log(data.timezone)
   const {humidity,pressure,wind_speed,sunrise,sunset}=data.current;
   humidityField.textContent=`${humidity}%`;
   pressureField.textContent=`${pressure} hPa`;
   windSpeedField.textContent=`${wind_speed}%`;
   sunriseField.textContent=`${window.moment(sunrise *1000).format('HH:mm a')}`
   sunsetField.textContent=`${window.moment(sunset *1000).format('HH:mm a')}`
     let otheDayForecase='';
   data.daily.forEach((day,index)=>
   {
    
      if(index==0)
      {
        
         currentTempField.innerHTML=
      `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="icon">
         <div class="other">
          <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
          <div class="desc">${day.weather[0].description}</div>
          <div class="temp"><i class="fa-solid fa-moon"></i>:${day.temp.night}°C </div>
          <div class="temp"><i class="fa-solid fa-sun"></i>:${day.temp.day}°C</div>
         </div>`
      }
      else
      {
          otheDayForecase +=  `
         <div class="weather-forecast-item">
             <div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="icon">
             <div class="desc">${day.weather[0].description}</div>
             <div class="temp"><i class="fa-solid fa-moon"></i>:${day.temp.night}°C </div>
             <div class="temp"><i class="fa-solid fa-sun"></i>:${day.temp.day}°C</div>
         </div>
         `
      }
      otherDayTempField.innerHTML=otheDayForecase
   })
}

//8
function getSearchedData()
{
   const data=inputDataField.value;
  // const countryWeatherAPI=`api.openweathermap.org/data/2.5/weather?q=${data}&appid=${WeatherAPI}`;
   const countryWeatherAPI=`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${WeatherAPI}`;
   console.log(data)
   fetch(countryWeatherAPI)
   .then((res)=>res.json())
   .then((data)=>{
      console.log(data)
      if(inputDataField.value!=data.name)
      {
         console.log(data.message="Hello")
         
      }
      else{
         console.log(Object.values(data.coord))
         console.log(typeof data.coord)
         const [longitude,latitude]=Object.values(data.coord)
         longLati(longitude,latitude,countryWeatherAPI)
         
      }
   })
     
}

// function call are here
getDateAndTime()
getWeather()



//EventListeners

searchBtnField.addEventListener('click',()=>
{
   if(inputDataField.value=="")
      {
         setTimeout(()=>{alert("Please fill search box first")},1000)
      }

   getSearchedData();
})














// lat=${latitude}&lon=${longitude}