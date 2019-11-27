const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
//call server
const server = jsonServer.create();
//route
const router = jsonServer.router("./db.json");
//read and JSON parse the users.json file which you first need to create. This file acts like a table for registered users
const { users } = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));
//set default
server.use(jsonServer.defaults());
//middlewares
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
//config
const SECRET_KEY = "123456";
const expiresIn = "1h";

// Check if the user exists in database return json of user,if not return undefined
const isUserExist = ({ username, email, password }) => {
  return users.find(
    user =>
      (user.username === username || user.email === email) &&
      user.password === password
  );
};

//user login
server.post("/auth/login", (req, res) => {
  console.log(req.body);
  try {
    if (isUserExist(req.body)) {
      const token = jwt.sign(req.body, SECRET_KEY, { expiresIn });
      //jsonp cookie
      res.cookie("access_token", token, {
        //time exprire
        maxAge: 500000,
        //Flags the cookie to be accessible only by the web server
        httpOnly: true
      });
      console.log("login successful");
      res.status(200).jsonp({ message: "Login successful" });
    } else {
      res.status(400).jsonp({ message: "username or password invalid" });
      throw new Error("username or password invalid");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

//user register
server.post("/auth/register", (req, res) => {
  //check if user doesn't exist
  console.log(req.body);
  if (isUserExist(req.body)) {
    res.status(409).jsonp({ message: "username already exist" });
  }
  try {
    const { username, email, password } = req.body;
    fs.readFile("./db.json", "utf-8", (err, jsonDb) => {
      const db = JSON.parse(jsonDb.toString());
      const users = db.users;
      const newData = {
        users: [
          ...users,
          {
            id: users.length + 1,
            username,
            email,
            password
          }
        ]
      };
      fs.writeFile("./db.json", JSON.stringify(newData), err => {
        res.status(201).jsonp({ message: "create success" });
      });
    });
  } catch (err) {
    res.status(500).jsonp(err.toString());
  }
});

server.use(router);
server.listen(3002, console.log("run server on port 3002.."));

