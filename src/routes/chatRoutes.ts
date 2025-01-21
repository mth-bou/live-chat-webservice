import { Router } from "express";
import MessageModel from "../models/Message";

const router = Router();

router.get('/messages/:userId1/:userId2', async (req, res) => {
	const messages = await MessageModel.getMessagesBetweenUsers(req.params.userId1, req.params.userId2);
	res.json(messages);
});

export default router;
