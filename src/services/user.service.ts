import { User } from "../models/index.ts";
import prisma from "../lib/prisma.ts";
import type { UserFilter } from "../types/user.d.ts";

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
