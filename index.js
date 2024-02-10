const server = require("./src/app");
const { conn } = require("./src/db");

const PORT = process.env.PORT;

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor escuchando en el puerto:", PORT);
  });
});