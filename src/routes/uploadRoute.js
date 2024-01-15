// src/index.js
const fastify = require('fastify')();
const fastifyMultipart = require('fastify-multipart');

const PORT = process.env.PORT || 3001;

fastify.register(fastifyMultipart);


fastify.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${PORT}`);
});
