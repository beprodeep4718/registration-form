require('dotenv').config();
const express = require("express");
const {engine} = require("express-handlebars");
const app = express();

const connectDB = require('./utils/db');
const Product = require('./models/product');


const port = process.env.PORT || 3000;

// Middlewares ------->>>
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// Handlebars
app.engine("hbs", engine({
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts",
  extname: ".hbs"
}));
app.set("view engine", "hbs");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.post('/', async (req, res) => {
  try {
    const {name, address, email, phone} = req.body;
    const data = await Product.create({name, address, email, phone});
    res.status(200).send(`<h2>SUCCESSFULL</h2>`);
  } catch (error) {
    console.log(error);
  }

})

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.....`);
    });
    connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();