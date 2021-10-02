const cities = {
  456172: "Riga",
  620127: "Vitebsk",
  703448: "Kyiv",
  756135: "Warsaw",
};
const country = {
  456172: "LV",
  620127: "BY",
  703448: "UA",
  756135: "PL", 
};

const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "4609c777b1f7e79af1150ab179b73750",
  }

const weekDayTitle = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'TThursday', 'Friday', 'Saturday'];


// по загрузке создаем select and option
window.onload = createSelect();
function createSelect() {
  let label = document.querySelector(".header__label");
  let select = document.createElement("select");
  select.classList.add("choose-city");
  for (let key in cities) {
    let child = document.createElement("option");
    child.value = key;
    child.innerHTML = cities[key];
    select.appendChild(child);
  }
  label.appendChild(select);
}
// глобальная переменная Date
let date = new Date();

 // получаем текущее время
 function clock(){
  var date = new Date(),
      hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
      minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
      seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds;
}
setInterval(clock, 1000);
// для вывода времени на страницу без задержки 1c вызываем функцию
clock();

// получаем название дня из массива weekDayTitle вызов в getWeather()
 function weekDay() {
   document.getElementById('weekday').innerHTML = weekDayTitle[date.getDay()];
 }
 
// получаем обозначение страны в хэдэре
function countryTitle() {
  document.querySelector('.countries').innerHTML = country[document.querySelector('.choose-city').value];
  }


function getWeather() {
  let cityId = document.querySelector('.choose-city').value;
  	 fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(function(response) {return response.json()})
	.then(function(data) {
   showWeather(data);
   countryTitle();
   weekDay();
})
	.catch(function() {})
}
// градусы в направление ветра
function  degreesToDirectionWind(degree){
  if (degree>337.5) return 'Northerly';
  if (degree>292.5) return 'North Westerly';
  if(degree>247.5) return 'Westerly';
  if(degree>202.5) return 'South Westerly';
  if(degree>157.5) return 'Southerly';
  if(degree>122.5) return 'South Easterly';
  if(degree>67.5) return 'Easterly';
  if(degree>22.5){return 'North Easterly';}
  return 'Northerly';
}




function showWeather(data) {
  document.querySelector('.city-name').innerHTML = data.name;
	document.querySelector('.degree').innerHTML = Math.round(data.main.temp) + '&deg';
	document.querySelector('.weather').innerHTML = data.weather[0]['description'];
  let imgOut = document.querySelector('.imgOut');
  imgOut.innerHTML = `<img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}.png">`;
  let wind = document.querySelector('.wind');
    wind.innerHTML = 'Wind speed:' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + data.wind['speed'] + 'm/s';
	let direct = document.querySelector('.direct');
    direct.innerHTML = 'Wind direction:' + '&nbsp&nbsp&nbsp' + degreesToDirectionWind(data.wind['deg']);
	let hum = document.querySelector('.hum');
  // колхозный способ конечно, но знаний по верстке не достаточно, если получится по этому курсу получить сертификат, придется приобретать потом курс  по html
   hum.innerHTML = 'Humidity:' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + data.main.humidity + '%';
}

getWeather();
document.querySelector('.choose-city').onchange = getWeather;



  

