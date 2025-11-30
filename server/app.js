import express from "express";
import dotenv from "dotenv";
import { readDB, writeDB } from "./utils/helper.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/getallusers", async (req, res)=>{
    try {
        let DB = await readDB();
        res.status(200).json(DB);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
});

app.get("/getuser/:id", async (req, res)=>{
    try {
        let DB = await readDB();
        let user = DB.find((x)=> x.id == Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
});

app.post("/adduser", async (req, res)=>{
    try {
        let DB = await readDB();
        let prevId = DB.length;
        let {name, age, mobile} = req.body;
        let user = {
            id: prevId + 1,
            name,
            age,
            mobile
        };
        DB.push(user);
        await writeDB(DB);
        res.status(201).json({msg:`Data with ${user} was added to the database successfully`});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on: http://127.0.0.1:${port}`);
});