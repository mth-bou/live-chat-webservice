import prisma from "../config/database";

class UserModel {
	static createUser = async (username: string) => {
		return await prisma.user.create({
			data: { username },
		});
	}

	static getUserById = async (id: string) => {
		return await prisma.user.findUnique({ where: { id } });
	}

	static getUserByUsername = async (username: string) => {
		return await prisma.user.findUnique({ where: { username } });
	}
}

export default UserModel;
