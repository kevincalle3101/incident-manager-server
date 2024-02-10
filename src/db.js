require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const CommentModel = require("./models/Comment");
const IncidenceModel = require("./models/Incidence");
const UserModel = require("./models/User");
const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

IncidenceModel(sequelize);
CommentModel(sequelize);
UserModel(sequelize);

const { User, Incidence, Comment } = sequelize.models;

User.hasMany(Incidence);
Incidence.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Incidence.hasMany(Comment);
Comment.belongsTo(Incidence);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
