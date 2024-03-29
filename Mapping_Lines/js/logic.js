// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([36.1733, -120.1794], 4);

// Coordinates for each point to be used in the line.
let line = [{
    Location:[33.9416, -118.4085],
    name:'LAX'
},
{
    Location:[37.6213, -122.3790],
    name:'SFO'
},
{
    Location:[40.7899, -111.9791],
    name:'Salt'
},
{
    Location:[47.4502, -122.3088],
    name:'Seattle'
},
  ];
var coordinates =[]

line.forEach(route=>{
    coordinates.push(route.Location),
L.marker(route.Location)
.bindPopup("<h2>" + route.name + "</h2>")
.addTo(map);

});

// let coordinates = [
//     line[0].Location,
//     line[1].Location,
//     line[2].Location,
//     line[3].Location,
// ]

L.polyline(coordinates, {
            color: "yellow"
          }).addTo(map);
// Create a polyline using the line coordinates and make the line red.
// line.forEach(function(route){
//     console.log(route);
//     L.polyline(route.Location, {
//         color: "yellow"
//       }).addTo(map);
    
// })

  
  // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city);
//     L.circleMarker(city.location,{
//         color:'orange',
//         weight:4,
//         radius:city.population/100000,
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker(line)
// .bindPopup().addTo(map);

// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

// L.circleMarker([34.0522, -118.2437],{
//     color:'black',
//     fillColor:'yellow',
//     radius:300
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/satellite-streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);