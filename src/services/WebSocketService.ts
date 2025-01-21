import WebSocket from "ws";
import MessageModel from "../models/Message";

class WebSocketService {
	private clients: Map<string, WebSocket> = new Map();

	constructor(private wss: WebSocket.Server) {
		this.wss.on("connection", (ws: WebSocket) => {
			console.log("New Websocket connection");

			ws.on("message", async (message: string) => {
				try {
					const { senderId, receiverId, content } = JSON.parse(message);

					console.log(`📩 Message reçu de ${senderId} à ${receiverId}: ${content}`);

					await MessageModel.sendMessage(senderId, receiverId, content);

					const receiverSocket = this.clients.get(receiverId);
					if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
						receiverSocket.send(JSON.stringify({ senderId, content }));
					}

				} catch (error) {
					console.error("Processing message failed: ", error);
				}
			});

			ws.on("close", () => {
				console.log("Websocket connection closed");
			});
		});
	}
}

export default WebSocketService;
