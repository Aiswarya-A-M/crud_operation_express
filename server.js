const exp = require("constants");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const storeDataPath = "./storeData.json";

app.get("/listUsers", (req, res) => {
  const userDetails = takeUsersData();
  res.send(userDetails);
});

app.post("/addUser", function (req, res) {
  try {
    const newUser = req.body;
    const userDetails = takeUsersData();
    const id = userDetails[userDetails.length - 1].userId + 1;
    newUser.userId = id;
    const age = findAge(newUser.userDOB);
    newUser.userAge = age;
    userDetails.push(newUser);
    addData(userDetails);
    res.send("Data received successfully");
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.get("/:id", function (req, res) {
  try {
    const id = Number(req.params.id);
    const userDetails = takeUsersData();
    const viewUser = userDetails.find((user) => user.userId === id);

    if (viewUser) {
      res.send(viewUser);
      console.log(viewUser);
    }
    res.send("user doesn't exist");
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.put("/updateUser/:id", function (req, res) {
  try {
    const updatedUser = req.body;
    const userDetails = takeUsersData();
    const id = Number(req.params.id);
    const user = userDetails.find((user) => user.userId === id);
    const age = findAge(updatedUser.userDOB);

    if (user) {
      user.userId = id;
      user.userName = updatedUser.userName;
      user.userDOB = updatedUser.userDOB;
      user.userDepartment = updatedUser.userDepartment;
      user.userAge = age;
      addData(userDetails);
      res.send("user updated successfully");
    }
    res.send("user doesn't exist");
  } catch (error) {
    console.error("Error in handling PUT request:", error.message);
  }
});

app.delete("/deleteUser/:id", function (req, res) {
  try {
    const id = Number(req.params.id);
    const userDetails = takeUsersData();
    const userIndex = userDetails.findIndex((user) => user.userId === id);

    if (userIndex !== -1) {
      userDetails.splice(userIndex, 1);
      addData(userDetails);
      res.send("user deleted successfully");
    }
    res.send("user doesn't exist");
  } catch (error) {
    console.error("Error in handling DELETE request:", error.message);
  }
});

function takeUsersData() {
  const data = fs.readFileSync(storeDataPath, "utf8");
  return JSON.parse(data);
}

function addData(userDetails) {
  fs.writeFileSync(storeDataPath, JSON.stringify(userDetails));
}

function findAge(dob) {
  const dobArray = dob.split("/");
  const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

app.listen(3000);
