import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectsController {
  public async index({ response, params }: HttpContext) {
    const onlyPin = params.onlyPin === "true";
    if (onlyPin) {
      const projects = await Project.query().where("isPin", onlyPin);
      return response.json({
        projects: projects
      })
    }
    const projects = await Project.query();
    return response.json({
      projects: projects
    })
  }
}
