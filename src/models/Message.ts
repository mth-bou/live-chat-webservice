import prisma from "../config/database";

class MessageModel {
	static sendMessage = async (senderId: string, receiverId: string, content: string) => {
		return await prisma.message.create({
			data: {
				senderId,
				receiverId,
				content,
			},
		});
	}

	static getMessagesBetweenUsers = async (userId1: string, userId2: string) => {
		return await prisma.message.findMany({
			where: {
				OR: [
					{ senderId: userId1, receiverId: userId2 },
					{ senderId: userId2, receiverId: userId1 },
				],
			},
			orderBy: { createdAt: 'asc' },
		});
	}
}

export default MessageModel;
