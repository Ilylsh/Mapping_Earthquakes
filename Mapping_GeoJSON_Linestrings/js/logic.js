// Add console.log to check to see if our code is working.
console.log("working");


// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5],4);


// We create the tile layer that will be the background of our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'navigation-preview-night-v4',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Night: night,
    Day: day
  };



// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    // use this method instead of setView() because we want to set the default layer as streets;
    layers: [night]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
let toronto = "https://raw.githubusercontent.com/Ilylsh/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "yellow",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(toronto).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    style:myStyle,
    onEachFeature:function(feature,layer){
        console.log(feature);
        layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: "+feature.properties.dst + "</h3>")
    }
  }).addTo(map);
});

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data, add bindPopup using pointToLayer;
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>"+feature.properties.city + ", "+feature.properties.country+ "</h3>")
//     }

//   }).addTo(map);


// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(feature);
//       layer.bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2> <hr> <h3> Airport name: "+feature.properties.name + "</h3>")
//       .addTo(map);
//      }
// });

// // Coordinates for each point to be used in the line.
// let line = [{
//     Location:[33.9416, -118.4085],
//     name:'LAX'
// },
// {
//     Location:[37.6213, -122.3790],
//     name:'SFO'
// },
// {
//     Location:[40.7899, -111.9791],
//     name:'Salt'
// },
// {
//     Location:[47.4502, -122.3088],
//     name:'Seattle'
// },
//   ];
// var coordinates =[]

// line.forEach(route=>{
//     coordinates.push(route.Location),
// L.marker(route.Location)
// .bindPopup("<h2>" + route.name + "</h2>")
// .addTo(map);

// });

// // let coordinates = [
// //     line[0].Location,
// //     line[1].Location,
// //     line[2].Location,
// //     line[3].Location,
// // ]

// L.polyline(coordinates, {
//             color: "yellow"
//           }).addTo(map);
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

