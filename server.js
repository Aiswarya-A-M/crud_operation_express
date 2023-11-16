const exp = require("constants");
const express =require("express");
const fs =require('fs');
const bodyParser=require('body-parser');
const { userInfo } = require("os");

const app =express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const DBPath = "./DB.json";


app.get("/",(req,res)=>{
    console.log("here");
    res.send("hi");
})



app.get('/listUsers',  function (req, res) {
    res.send( data );
    res.end( data );
})

app.post('/listUsers', function (req, res) {
    try {
        let newUser=req.body;
        const userDetails=taskView();
        const id=userDetails[userDetails.length-1].userId+1;
        newUser.userId=id;
        userDetails.push(newUser);
        addToDB(userDetails);
        console.log(req.body);
        res.send('Data received successfully');
    } catch (error) {
        console.error('Error in handling POST request:', error.message); 
    }
    
})

app.post('/getId', function (req, res) {
    try {
        let newUser=req.body;         //{userId:1}
        const id=newUser.userId;
        const userDetails=taskView();
        const viewUser = userDetails.find(
            (user) => user.userId === id
          );
        res.send(viewUser);
        console.log(viewUser)
        // newUser.userId=id;
        // userDetails.push(newUser);
        // addToDB(userDetails);
        // console.log(req.body);
        // res.send('Data received successfully');
    } catch (error) {
        console.error('Error in handling POST request:', error.message); 
    }
    
})


function taskView(){
    const data = fs.readFileSync(DBPath, "utf8");
    return JSON.parse(data);
}

function addToDB(userInfo){
    fs.writeFileSync(DBPath, JSON.stringify(userInfo));
}

app.listen(3000);