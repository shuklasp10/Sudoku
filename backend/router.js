import express from 'express';
import User from './modal.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const data = await User.find({});
        return res.status(200).send(data);
    }
    catch(e){
        res.status(404).send("Error in getting data");
    }
});

router.post('/add',async(req,res)=>{
    const {name,min,sec} = req.body;
    try{
        const newData = User({name,min,sec});
        const data = await newData.save();
        return res.status(201).send(data);
    }catch(e){
        return res.status(404).send("error in updating data");
    }
});

export default router;