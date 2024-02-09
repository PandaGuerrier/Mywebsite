import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { createProjectValidator } from '#validators/project'

export default class ProjectsController {
  public async index({ response, params }: HttpContext) {
    if (params.isPublished == "all") {
      const projects = await Project.query().orderBy('created_at', 'desc');
      return response.json({
        projects: projects
      })
    }

    const projects = await Project.query().where('isPublished', params.isPublished).orderBy('created_at', 'desc');

    return response.json({
      projects: projects
    })
  }

  public async show({ response, params }: HttpContext) {
    const project = await Project.query().where('id', params.id).firstOrFail()
    return response.json({
      project: project
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProjectValidator)
    const project = await Project.create(data)
    return response.json({
      project: project
    })
  }

  public async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(createProjectValidator)
    const project = await Project.query().where('id', params.id).update(data)
    return response.json({
      project: project
    })
  }

  public async destroy({ response, params }: HttpContext) {
    const project = await Project.query().where('id', params.id).delete()
    return response.json({
      project: project
    })
  }
}
