import WebSocket from "ws";

class WebSocketService {
	private clients: Set<WebSocket> = new Set();

	constructor(private wss: WebSocket.Server) {
		this.wss.on("connection", (ws: WebSocket) => {
			console.log("New Websocket connection");
			this.clients.add(ws);

			ws.on("message", (message: Buffer) => {
				const text = message.toString();
				console.log("Received message: ", text);
				this.broadcast(text, ws);
			});

			ws.on("close", () => {
				console.log("Websocket connection closed");
				this.clients.delete(ws);
			})
		});
	}

	private broadcast(message: string, sender: WebSocket) {
		console.log(`🔄 Diffusion du message : ${message}`);

		this.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}
}

export default WebSocketService;
