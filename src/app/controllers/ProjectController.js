import Project from '../models/Project';

class ProjectController {
  async checkProject(req, res, next) {
    const { id } = req.params;
    const project = await Project.findOne({ id: id });
    if (project === null) {
      return res.json({ data: 'Project not found' });
    }
    req.tasksProject = project.tasks;
    return next();
  }

  async index(req, res) {
    const projects = await Project.find();
    return res.json(projects);
  }

  async store(req, res) {
    const project = await Project.create(req.body);
    return res.json(project);
  }

  async update(req, res) {
    const { title } = req.body;
    const project = await Project.findOneAndUpdate({ id: req.params.id }, { title }, { new: true });
    return res.json(project);
  }

  async destroy(req, res) {
    const project = await Project.findOneAndRemove({ id: req.params.id });
    return res.json({ data: 'Ok' });
  }

  async task(req, res) {
    const { title } = req.body;
    req.tasksProject.push(title);
    const Tasks = await Project.findOneAndUpdate(
      { id: req.params.id },
      { tasks: req.tasksProject },
      { new: true },
    );
    return res.json(Tasks);
  }
}

export default new ProjectController();
