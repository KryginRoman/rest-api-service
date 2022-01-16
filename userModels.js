import mongoose from "mongoose";

const UserSheme = new mongoose.Schema({
	id: { type: Number, unique: true },
	username: String,
	password: String
});

export const User = mongoose.model("User", UserSheme);