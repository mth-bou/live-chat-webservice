import { app, server, wss } from './config/server';
import WebSocketService from "./services/webSocketService";
import chatRoutes from "./routes/chatRoutes";

const PORT = process.env.PORT || 3000;

new WebSocketService(wss);

app.use('/api/chat', chatRoutes);

server.listen(PORT, () => {
	console.log(`🚀 Serveur WebSocket démarré sur http://localhost:${PORT}`);
})
