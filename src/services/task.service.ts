import { ITask } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"

const createTask = async (data: Omit<ITask, "id">) => {
  const task = await prisma.task.create({
    data,
  })
  return task
}

const updateTask = async (id: string, data: Partial<ITask>) => {
  await findById({ id })
  const task = await prisma.task.update({
    where: {
      id,
    },
    data,
  })
  return task
}

const findById = async (data: Pick<ITask, "id">) => {
  const { id } = data
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  })
  if (!task) {
    throw new CustomError(404, "Task not found")
  }
  return task
}

const getAllTask = async () => {
  const tasks = await prisma.task.findMany()
  return tasks
}

const deleteTask = async (data: Pick<ITask, "id">) => {
  const { id } = data
  const task = await prisma.task.delete({
    where: {
      id,
    },
  })
  return task
}

const getTasksByProjectId = async (data: Pick<ITask, "projectId">) => {
  const { projectId } = data
  const tasks = await prisma.task.findMany({
    where: {
      projectId,
    },
  })
  return tasks
}

const getTasksByAssigneeId = async (data: Pick<ITask, "assigneeId">) => {
  const { assigneeId } = data
  const tasks = await prisma.task.findMany({
    where: {
      assigneeId,
    },
  })
  return tasks
}

const deleteTaskByProject = async (data: Pick<ITask, "projectId">) => {
  const { projectId } = data
  const tasks = await prisma.task.deleteMany({
    where: {
      projectId,
    },
  })
  return tasks
}

const STask = {
  createTask,
  updateTask,
  findById,
  getAllTask,
  getTasksByProjectId,
  getTasksByAssigneeId,
  deleteTaskByProject,
  deleteTask,
}

export default STask
