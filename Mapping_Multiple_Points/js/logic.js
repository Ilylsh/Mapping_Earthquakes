// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 4);

// Get data from cities.js
let cityData = cities;

  // Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location,{
        color:'orange',
        weight:4,
        radius:city.population/100000,
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

// L.circleMarker([34.0522, -118.2437],{
//     color:'black',
//     fillColor:'yellow',
//     radius:300
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/dark-v10',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);