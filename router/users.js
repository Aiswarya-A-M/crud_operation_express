const express = require('express');
const router =express.Router();
const fs =require('fs');


router.get('/',(req,res)=>{
    res.send("user list");
})

router.get('/name',(req,res)=>{     /// /name is a static route it should placed above dynamic otherwise /name will consider name as id and wrk it checking will from top to bottom.
    res.send("user name");
})

router.post('/',(req,res)=>{
    res.send("create user")
})

router.route(":id")
.get((req,res)=>{
    console.log(req.user)
    res.send(`Get user with Id ${req.params.id}`)
})
.put((req,res)=>{
    res.send(`update user with Id ${req.params.id}`)
})
.delete((req,res)=>{
    res.send(`delete user with Id ${req.params.id}`)
})

// const users=[{name:"aiswarya"},{name:"amrutha"}]
// router.param("id",(req,res,next, id)=>{
//     req.user=users[id];
//     next()
// })


// router.get("/:id",(req,res)=>{
//     res.send(`Get user with Id ${req.params.id}`)
// })

// router.put("/:id",(req,res)=>{
//     res.send(`update user with Id ${req.params.id}`)
// })

// router.delete("/:id",(req,res)=>{
//     res.send(`delete user with Id ${req.params.id}`)
// })

module.exports=router;