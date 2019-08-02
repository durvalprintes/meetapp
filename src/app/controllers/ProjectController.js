import Project from '../models/Project';

class ProjectController {
    async index(req, res) {
        const projects = await Project.find();
        return res.json(projects);
    }
}

export default new ProjectController();