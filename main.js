var city_bar_list = document.getElementsByClassName('city-item')
var input_bar = document.getElementsByClassName('search-input')[0]
var button_search = document.getElementsByClassName('search-icon')[0]
var cityName = document.getElementsByClassName('city')[0]
var degree = document.getElementsByClassName('degree')[0]
var time = document.getElementsByClassName('time')[0]
var weather = document.getElementsByClassName('weather')[0]
var weatherDetails = document.getElementsByClassName('item___param')
var backGround = document.getElementsByClassName('content')[0]
var currentIcon = document.querySelector('.content__icon .fa-cloud-showers-heavy');
console.log(currentIcon)
// set background
function setBackground(weather)
{
    var newIcon = document.createElement('i');
    switch(weather)
    {
        case 'Clouds':
            backGround.style.backgroundImage ="url('/assest/img/cloudy.png')"
            
            newIcon.classList.add('fa-solid', 'fa-cloud');
            
            break
        case 'Rain':
            backGround.style.backgroundImage ="url('/assest/img/rainy.png')"
            newIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy');
            
            break
        case 'Drizzle':
            backGround.style.backgroundImage ="url('/assest/img/rainy.png')"
            newIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy');
            
            break
        case 'Clear':
            backGround.style.backgroundImage ="url('/assest/img/clear.jpg')"
            newIcon.classList.add('fa-solid', 'fa-sun');
            
            break
        
    }
    currentIcon.replaceWith(newIcon);
       
    
}
var Month = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};
var DaysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};
for( var i = 0; i<city_bar_list.length;i++)
{
    city_bar_list[i].addEventListener('click', e => {
        
        var selectedCity = event.target.textContent;

        input_bar.value = selectedCity
        
    });
}
var urlCity=""
var city =""

async function getCity (url) {
    url = `http://api.openweathermap.org/geo/1.0/direct?q=`+city+`&appid=2aab36d6a8850635beb25e04974e9f96`
    return data = await fetch(url)
                    .then((res) => res.json())
                    .then((data)=>  {return data})

     
}
async function getWeather( lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=`+lat+`&lon=`+lon+`&appid=2aab36d6a8850635beb25e04974e9f96`
    
    return data = await fetch(url)
                    .then((res) => res.json())
                    .then((data)=>  {return data})
}
button_search.addEventListener('click', e => {
        
    city = input_bar.value
    urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=`+city+`&appid=2aab36d6a8850635beb25e04974e9f96`    
    var data = getCity(urlCity)
    var lat =''
    var lon =''
    data
    .then(data => {
        cityName.innerText = data[0].name
        lat = data[0].lat
        lon = data[0].lon
        return getWeather(lat, lon)
    })
    .then(weatherData => {
        
        weather.innerText = weatherData.weather[0].main
        var currentTime = new Date();
        var Time = {
            year : currentTime.getFullYear(), // Năm
            month : currentTime.getMonth() + 1, // Tháng (chú ý: tháng bắt đầu từ 0)
            day : currentTime.getDate(), // Ngày
            hour : currentTime.getHours(), // Giờ
            minute : currentTime.getMinutes(), // Phút
            date : currentTime.getDay()
        }
        time.innerText = `${Time.hour}:${Time.minute} -  ${DaysOfWeek[Time.date]}, ${Time.day} ${Month[Time.month]} ${Time.year}`
        weatherDetails[0].innerText = weatherData.clouds.all+'%'
        weatherDetails[1].innerText = weatherData.main.humidity+'%'
        weatherDetails[2].innerText = `${weatherData.wind.speed}km/h`
        setBackground(weather.innerText)
        console.log(weather.innerText)
        
    })
    
    // 
    // console.log(urlWeather)
    // var dataW = getWeather(urlWeather)
    // 
})

    

//         getW(url)
//         .then(data => {
//             resolve(data)
//         })
//         .catch((error) => {
//             reject(error); 
//         });
//         })

// function getW(url)
// {
//     return fetch(url)
//                     .then((res) => res.json())
//                     .then((data) => {
//                         return data;
//                     })
              
       
// }

   




