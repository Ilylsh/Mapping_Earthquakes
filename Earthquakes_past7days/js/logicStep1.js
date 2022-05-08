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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'satellite-streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Satellite": satelliteStreets,
    "Streets": streets
  };

// Create the earthquake overlayer for our map.
let earthquakes = new L.LayerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  "Earthquakes": earthquakes
};



// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    // use this method instead of setView() because we want to set the default layer as streets;
    layers: [streets]
})

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// // Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
let past7day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a style for the lines.
// let myStyle = {
//   color: "blue",
//   weight: 1,
//   fillColor:'yellow',
// }


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  // passed the argument feature to reference each object's features
  return {
    opacity: 1,
    fillOpacity: 1,
    // fillColor: "#ffae42",
    fillColor:getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
};

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
};
// Grabbing our GeoJSON data.
d3.json(past7day).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    pointToLayer:function(feature,latlng){
      console.log(feature);
      return L.circleMarker(latlng)},
        // layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>")
      style:styleInfo,
      // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }
  ).addTo(earthquakes);
  earthquakes.addTo(map);
  // have the Earthquakes overlay button "on,"
  });

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;
};

legend.addTo(map);

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

