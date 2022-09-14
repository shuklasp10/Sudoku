import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    min:Number,
    sec:Number,
});

const User = mongoose.model('User',userSchema);

export default User;