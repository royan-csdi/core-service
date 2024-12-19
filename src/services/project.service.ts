import { IProject } from "@/interfaces"
import { CustomError } from "@/utils"
import prisma from "@/prisma/clients/core.client"
import { sendProjectNotification } from "./kafka.service"

const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      userProjects: true,
    },
  })

  return projects
}

const getAllProjectsByUserId = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
  })

  return projects
}

const findById = async (data: Pick<IProject, "id">) => {
  const { id } = data
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      userProjects: {
        include: {
          user: true,
        },
      },
    },
  })
  if (!project) {
    throw new CustomError(404, "Project not found")
  }
  return project
}

const createProject = async (data: Omit<IProject, "id" | "createdAt" | "updatedAt">) => {
  const project = await prisma.project.create({
    data: {
      ...data,
      description: data.description || "",
      userProjects: {
        create: {
          userId: data.ownerId,
        },
      },
    },
    include: {
      userProjects: true,
    },
  })

  await sendProjectNotification(project, "created")

  return project
}

const updateProject = async (id: string, data: Partial<IProject>) => {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data,
  })

  return project
}

const deleteProject = async (data: Pick<IProject, "id">) => {
  const { id } = data
  const project = await prisma.project.delete({
    where: {
      id,
    },
  })

  return project
}

const addUserToProject = async (projectId: string, userId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    throw new CustomError(404, "Project not found")
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new CustomError(404, "User not found")
  }

  const userProject = await prisma.userProject.create({
    data: {
      project: {
        connect: { id: projectId },
      },
      user: {
        connect: { id: userId },
      },
    },
    include: {
      user: true,
      project: true,
    },
  })

  return userProject
}

const removeUserFromProject = async (projectId: string, userId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    throw new CustomError(404, "Project not found")
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new CustomError(404, "User not found")
  }

  const userProject = await prisma.userProject.delete({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  })

  return userProject
}

const getProjectsByMemberId = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      userProjects: {
        some: {
          userId,
        },
      },
    },
  })

  return projects
}

const SProject = {
  getAllProjects,
  findById,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
  removeUserFromProject,
  getProjectsByMemberId,
  getAllProjectsByUserId,
}

export default SProject
