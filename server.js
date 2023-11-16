const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const storeDataPath = "./storeData.json";
const userDetails = takeUsersData();

app.get("/listUsers", (req, res) => {
  res.send(userDetails);
});

app.post("/addUser", function (req, res) {
  const newUser = req.body;
  newUser.userId = uuid.v4();
  newUser.userAge = getAge(newUser.userDOB);
  userDetails.push(newUser);
  addDetails(userDetails);
  res.send("Data received successfully");
});

app.get("/:id", function (req, res) {
  const id = req.params.id;
  const viewUser = userDetails.find((user) => user.userId === id);

  if (viewUser) {
    res.send(viewUser);
    return;
  }
  res.send("user doesn't exist");
});

app.put("/updateUser/:id", function (req, res) {
  const updatedUser = req.body;
  const id = req.params.id;
  const user = userDetails.find((user) => user.userId === id);
  const age = getAge(updatedUser.userDOB);

  if (user) {
    user.userId = id;
    user.userName = updatedUser.userName;
    user.userDOB = updatedUser.userDOB;
    user.userDepartment = updatedUser.userDepartment;
    user.userAge = age;
    addDetails(userDetails);
    res.send("user updated successfully");
    return;
  }
  res.send("user doesn't exist");
});

app.delete("/deleteUser/:id", function (req, res) {
  const id = req.params.id;
  const userIndex = userDetails.findIndex((user) => user.userId === id);

  if (userIndex !== -1) {
    userDetails.splice(userIndex, 1);
    addDetails(userDetails);
    res.send("user deleted successfully");
    return;
  }
  res.send("user doesn't exist");
});

function takeUsersData() {
  const data = fs.readFileSync(storeDataPath, "utf8");
  return JSON.parse(data);
}

function addDetails(userDetails) {
  fs.writeFileSync(storeDataPath, JSON.stringify(userDetails));
}

function getAge(dob) {
  const dobArray = dob.split("/");
  const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

app.listen(3000);
