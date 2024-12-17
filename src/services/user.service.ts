import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return users
}

const findById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    throw new CustomError(404, "User not found")
  }
  return user
}

const changeRole = async (id: string, role: "ADMIN" | "USER") => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return user
}

const SUser = {
  getAllUsers,
  findById,
  changeRole,
}

export default SUser
