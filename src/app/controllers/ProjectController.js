import Project from '../models/Project';

class ProjectController {
    async index(req, res) {
        const projects = await Project.find();
        return res.json(projects);
    }

    async store(req, res) {
        const { body } = req;
        const project = await Project.create(body);
        return res.json(project)

    }
}

export default new ProjectController();