import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: "Websocket server online!" });
});

export default router;
