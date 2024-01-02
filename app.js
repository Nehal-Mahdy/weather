const express =require ("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req , res)
{
   res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req , res){

    
    const query = req.body.cityName;
    const apikey = "6ab5ccf2c3f0c0f5a5722a16106352d2";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
          
      const weatherData =  JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconurl ="http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      
      console.log(weatherDescription);
     
      console.log(iconurl);
     

      res.write( "<p>the weather is currently " + weatherDescription +"<p>");
      res.write("<h1> The temperature in "+ query+" is "+ temp + " degrees Celcius</h1>");
      res.write("<img src="+ iconurl +">");
      res.send();
    });
} );})



app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});