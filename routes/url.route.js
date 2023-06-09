const express = require("express")
const urlRouter = express.Router()
const url = require("../models/urlmodel");
const authenticate = require("../middelwares/authentication");

urlRouter.post("/assign", async(req, res)=>{
    try {
        const {longurl, id} = req.body;
        if (!longurl) return res.json({msg: "Please Provide URL"})
        
        const newurl = new url({longurl, author: id})
        
        // console.log(res.locals)
        await newurl.save()
        res.send(newurl)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

urlRouter.get("/:id", async(req, res)=>{
    try {
        const userUrls = await url.find({author: req.params.id})
        res.json(userUrls)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

urlRouter.get("/delete/:id", async(req, res)=>{
    try {
        await url.findOneAndDelete({_id: req.params.id})
        res.json({msg: "URL Deleted"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

urlRouter.get("/", async(req, res)=>{
    try {
        const totalUrls = await url.find({})
        res.json(totalUrls)
    } catch (error) {
        console.log(error)
    }
})





module.exports = urlRouter