import Fastify from "fastify";
import got from "got";
import axios from "axios";

const port = process.env.PORT || 80;

const fastify = Fastify({
  logger: true,
  requestTimeout: 30000,
});

fastify.listen({ port: port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Fastify is listening on port: ${address}`);
});

fastify.get("/", function (request, reply) {
  reply.send("Hello World");
});

fastify.get("/welcome", function (request, reply) {
  reply.send("Welcome");
});

fastify.get("/ftoc/:temp", function (request, reply) {
  const { temp } = request.params;
  //console.log(temp)
  ///console.log(user)
  const tempincelcius = (temp - 32) / 1.8;
  reply.send(tempincelcius);
});
fastify.get("/ctof/:temp", function (request, reply) {
  console.log(request);
  const { temp } = request.params;
  const tempinFahrenheit = temp * 1.8 + 32;
  reply.send(tempinFahrenheit);
});

fastify.get("/weatherv2/:city", async function (request, reply) {

  const apiKey = "d29300a88f0ef96ff3588b6c3e5ec09d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });

});

fastify.get("/weather/:city", async function (request, reply) {

  try {
    const { city } = request.params;
    console.log("City name is " & city);
    var apiToCall =
      "https://api.openweathermap.org/data/2.5/weather?q=" &
      city &
      "&appid=d29300a88f0ef96ff3588b6c3e5ec09d";

    axios({
      "method": "GET",
      "url": "https://community-open-weather-map.p.rapidapi.com/weather",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "[your rapidapi key]"
      }, "params": {
        "q": "London%2Cuk"
      }
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    //const {data} = await got.get(apiToCall);
    // reply.send(JSON.stringify(data));
    /* axios
      .post(apiToCall)
      .then(function (response) {
        // handle success
        reply.send(response);
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        // handle error
        reply.send(error);
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); */
  } catch (e) {
    reply.send(JSON.stringify(e))
  }
});
