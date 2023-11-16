const exp = require("constants");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
// const { userInfo } = require("os");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const DBPath = "./DB.json";

app.get("/", (req, res) => {
  console.log("here");
  res.send("hi");
});

app.get("/listUsers", function (req, res) {
  res.send(data);
  res.end(data);
});

app.post("/addUsers", function (req, res) {
  try {
    let newUser = req.body;
    const userDetails = taskView();
    const id = userDetails[userDetails.length - 1].userId + 1;
    newUser.userId = id;
    userDetails.push(newUser);
    addToDB(userDetails);
    console.log(req.body);
    console.log("Data received successfully");
    res.send("Data received successfully");
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.post("/view", function (req, res) {
  try {
    let viewUserId = req.body;
    const id = viewUserId.userId;
    const userDetails = taskView();
    const viewUser = userDetails.find((user) => user.userId === id);
    if (viewUser) {
      res.send(JSON.stringify(viewUser));
      console.log("my", JSON.stringify(viewUser));
    } else {
      res.send("no data");
    }
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.post("/update/:id", function (req, res) {
  try {
    let newUser = req.body; //{userId:1}
    console.log(newUser);
    const id = newUser.userId;
    console.log(id);
    const userDetails = taskView();
    console.log(userDetails);
    const viewUser = userDetails.find((user) => user.userId === id);
    if (viewUser) {
      res.send(JSON.stringify(viewUser));
      console.log("my", JSON.stringify(viewUser));
    } else {
      res.send("no user");
    }
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.post("/deleteUser", function (req, res) {
  try {
    let deleteUserId = req.body;
    const id = deleteUserId.userId;
    const userDetails = taskView();
    const remainingUser = userDetails.filter((user) => user.userId !== id);
    addToDB(remainingUser);
    if (remainingUser) {
      res.send("user data deleted successfully");
    } else {
      res.send("no user");
    }
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

function taskView() {
  const data = fs.readFileSync(DBPath, "utf8");
  return JSON.parse(data);
}

function addToDB(userInfo) {
  fs.writeFileSync(DBPath, JSON.stringify(userInfo));
}

app.listen(3000);
