const exp = require("constants");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const DBPath = "./DB.json";

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/addUser", function (req, res) {
  try {
    const newUser = req.body;
    const userDetails = taskView();
    const id = userDetails[userDetails.length - 1].userId + 1;
    newUser.userId = id;
    const age = findAge(newUser.userDOB);
    newUser.userAge = age;
    userDetails.push(newUser);
    addToDB(userDetails);
    console.log(req.body);
    console.log("Data received successfully");
    res.send("Data received successfully");
  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.post("/viewUser", function (req, res) {
  try {
    let viewUserId = req.body;
    const id = viewUserId.userId;
    const userDetails = taskView();
    const viewUser = userDetails.find((user) => user.userId === id);

    if (viewUser) {
      res.send(viewUser);
      console.log(viewUser);
    } else {
      res.send("no data");
    }

  } catch (error) {
    console.error("Error in handling POST request:", error.message);
  }
});

app.post("/updateUser", function (req, res) {
  try {
    let updateUser = req.body; 
    const id = updateUser.userId;
    const userDetails = taskView();
    const user = userDetails.find((user) => user.userId === id);
    const age=findAge(updateUser.userDOB)
    if (user) {
      user.userId=updateUser.userId;
      user.userName=updateUser.userName;
      user.userDOB=updateUser.userDOB;
      user.userDepartment=updateUser.userDepartment;
      user.userAge=age
      addToDB(userDetails);
      res.send("updated successfully")
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

function findAge(dob) {
  const dobArray = dob.split("/");
  const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

app.listen(3000);
