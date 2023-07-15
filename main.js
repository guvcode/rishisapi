import Fastify from "fastify";
import got from "got";
import axios from "axios";

const port = process.env.PORT || 3000;

const fastify = Fastify({
  logger: true,
  requestTimeout: 30000,
});

fastify.listen({ port }, function (err, address) {
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

fastify.get("/weather/:city", async function (request, reply) {
  const { city } = request.params;
  console.log("City name" & city);
  var apiToCall =
    "https://api.openweathermap.org/data/2.5/weather?q=" &
    city &
    "&appid=d29300a88f0ef96ff3588b6c3e5ec09d";

  axios
    .get(apiToCall)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});
