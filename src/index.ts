import { app, server, wss } from './config/server';
import WebSocketService from "./services/WebSocketService";
import chatRoutes from "./routes/chatRoutes";
import authRoutes from "./routes/authRoutes";

const PORT = process.env.PORT || 3000;

new WebSocketService(wss);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

server.listen(PORT, () => {
	console.log(`🚀 Serveur WebSocket démarré sur http://localhost:${PORT}`);
});
