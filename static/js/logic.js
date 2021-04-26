// Create a map object
var myMap = L.map("mapid", {
    center: [37.09024, -95.712891],
    zoom: 3
});
  
//   Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   tileSize: 512,
   maxZoom: 18,
   zoomOffset: -1,
   id: "mapbox/streets-v11",
   accessToken: API_KEY
}).addTo(myMap);
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//create function
function earthquake(response){
    var circlemarkers= []
    console.log(response)
    var location=response.features

    //code to set up earthquake color based on coordinates
    for (var i=0; i<location.length; i++){
        
        if(location[i].geometry.coordinates[2]< 10 &&  location[i].geometry.coordinates[2] > -10){
           var color_= "green" 
        }
        else if (location[i].geometry.coordinates[2]< 30 &&  location[i].geometry.coordinates[2] > 10){
            var color_= "#7FFF00" 
        }
        else if (location[i].geometry.coordinates[2]< 50 &&  location[i].geometry.coordinates[2] > 30){
            var color_= "yellow" 
        }
        else if (location[i].geometry.coordinates[2]< 70 &&  location[i].geometry.coordinates[2] > 50){
            var color_= "#DEB887" 
        }
        else if (location[i].geometry.coordinates[2]< 90 &&  location[i].geometry.coordinates[2] > 70){
            var color_= "orange" 
        }
        else {
            var color_= "red"
        }
    
      // Place variable includes latitude and longitude
      var place= [location[i].geometry.coordinates[1],location[i].geometry.coordinates[0]]
      var circle= L.circle(place,{
        fillOpacity: 0.75,
        color: color_,
        fillColor: color_,
        radius: (location[i].properties.mag*1000)
      }).bindPopup("<h3>Title: " + location[i].properties.title + "<h3><h3>Magnitude: " + location[i].properties.mag+ "</h3>")
      .addTo(myMap)
     
  
    };


var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake</h4>";
  div.innerHTML += '<i style="background: green"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #7FFF00"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #DEB887"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';
//   div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  

  return div;
};

legend.addTo(myMap);

    
  
};

 d3.json(url).then(earthquake); 
