export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED"

export interface IProject {
  id?: string
  title: string
  description?: string
  status: ProjectStatus
  ownerId: string
  deadline: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserProject {
  projectId: string
  userId: string
}
