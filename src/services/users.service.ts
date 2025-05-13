import { prisma } from '../libs/prisma';
import { RegisterTypeDTO } from '../utils/types/users.types';

class UsersService {
  async GetAllUsers() {
    return prisma.users.findMany({
      omit: { password: true },
    });
  }

  async GetUsersById(id: string) {
    return prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }

  async GetUsersByEmail(email: string) {
    return prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async GetUsersByUsername(username: string) {
    return prisma.users.findFirst({
      where: {
        username,
      },
    });
  }

  async CreateNewUsers(data: RegisterTypeDTO) {
    return prisma.users.create({
      data,
    });
  }
}

export default new UsersService();
