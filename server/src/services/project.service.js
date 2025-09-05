//ignore

import Project from "../models/project.model.js"

export const createProject = async (data) => {
  return await Project.create(data)
}

export const getProjectById = async (id) => {
  return await Project.findById(id)
}

export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id)
}
