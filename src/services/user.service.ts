import { User } from "../models/index.js";
import prisma from "../lib/prisma.js";
import type { UserFilter } from "../types/user.types.js";

const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getAllUsers = async (filter?: UserFilter): Promise<User[]> => {
  return prisma.user.findMany({
    where: filter
      ? {
          ...filter,
          emailVerified: filter.emailVerified ?? false,
        }
      : {},
  });
};

export default {
  getUserById,
  getAllUsers,
};
