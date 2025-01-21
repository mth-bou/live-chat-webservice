import WebSocket from "ws";

class WebSocketService {
	private clients: Set<WebSocket> = new Set();

	constructor(private wss: WebSocket.Server) {
		this.wss.on("connection", (ws: WebSocket) => {
			console.log("New Websocket connection");
			this.clients.add(ws);

			ws.on("message", (message: string) => {
				console.log("Received message: ", message);
				this.broadcast(message, ws);
			});

			ws.on("close", () => {
				console.log("Websocket connection closed");
				this.clients.delete(ws);
			})
		});
	}

	private broadcast(message: string, sender: WebSocket) {
		this.clients.forEach(client => {
			if (client !== sender && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}
}

export default WebSocketService;
