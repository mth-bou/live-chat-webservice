import { Router } from "express";
import UserModel from "../models/User";

const router = Router();

router.post('/register', async (req, res) => {
	const { username } = req.body;
	const user = await UserModel.createUser(username);
	res.json(user);
});

router.get('/user/:username', async (req, res) => {
	const user = await UserModel.getUserByUsername(req.params.username);
	res.json(user);
});

export default router;
