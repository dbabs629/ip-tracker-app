let formInput = document.getElementById("form-input");
let formBtn = document.getElementById('form-btn');
let ipAddress = document.getElementById('ip-address-result');
let ipLocation = document.getElementById('location-result');
let ipTimeZone = document.getElementById('time-zone-result');
let ipIsp = document.getElementById('isp-result');
let ipInput;
let domainInput;
let ipInfo;
let latitude;
let longitude;
let map;

window.onload = () => {
    let request = new XMLHttpRequest();
    request.open('GET','https://geo.ipify.org/api/v1?apiKey=at_isFItRIkLNAyaf7wk4g3OF6InupoF', true);
    request.onload = function () {
        ipInfo = JSON.parse(this.response);
        ipAddress.innerHTML = ipInfo.ip;
        ipLocation.innerHTML = ipInfo.location.city + ", " + ipInfo.location.region + " " + ipInfo.location.postalCode;
        ipTimeZone.innerHTML = ipInfo.location.timezone;
        ipIsp.innerHTML = ipInfo.isp;
        ipName = ipInfo.as.name;
        latitude = ipInfo.location.lat;
        longitude = ipInfo.location.lng;
        console.log(ipInfo);
        console.log(ipName);
        formInput.value = "";
        mapFunction();
    }
    request.send();
};

formBtn.addEventListener("click", function (e) {
    ipInput = formInput.value;
    domainInput = formInput.value;
    if (Number.isInteger(formInput.value)) {
        userInput = '&ipAddress=' + ipInput;
    } else {
        userInput = '&domain=' + domainInput;
    }
    let request = new XMLHttpRequest();
    request.open('GET','https://geo.ipify.org/api/v1?apiKey=at_isFItRIkLNAyaf7wk4g3OF6InupoF' + userInput, true);
    request.onload = function () {
        ipInfo = JSON.parse(this.response);
        ipAddress.innerHTML = ipInfo.ip;
        ipLocation.innerHTML = ipInfo.location.city + ", " + ipInfo.location.region + " " + ipInfo.location.postalCode;
        ipTimeZone.innerHTML = ipInfo.location.timezone;
        ipIsp.innerHTML = ipInfo.isp;
        ipName = ipInfo.as.name;
        latitude = ipInfo.location.lat;
        longitude = ipInfo.location.lng;
        formInput.value = "";
        console.log(ipInfo);
        newMap();
    }
    request.send();
});

 let mapFunction = () => {
    map = L.map('map-container').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(ipInfo.ip)
        .openPopup();
}
let newMap = () => {
    map.setView([latitude, longitude], 13);
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(ipInfo.ip)
        .openPopup();
}