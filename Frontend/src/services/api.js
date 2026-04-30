// Mock database using localStorage
const initMockData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: '1', name: 'Demo User', email: 'demo@example.com', password: 'demo123' }
    ]));
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify([
      { id: 'p1', name: 'E-commerce Platform', description: 'Full-stack online store', createdAt: new Date().toISOString() },
      { id: 'p2', name: 'Mobile App Design', description: 'UI/UX redesign for banking app', createdAt: new Date().toISOString() },
    ]));
  }
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([
      { id: 't1', projectId: 'p1', title: 'Setup API', description: 'Create REST endpoints', completed: false, createdAt: new Date().toISOString() },
      { id: 't2', projectId: 'p1', title: 'Build UI', description: 'React components', completed: false, createdAt: new Date().toISOString() },
      { id: 't3', projectId: 'p2', title: 'Wireframes', description: 'Low-fidelity designs', completed: true, createdAt: new Date().toISOString() },
    ]));
  }
};
initMockData();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  login: async (email, password) => {
    await delay(600);
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const token = 'mock-jwt-' + Date.now();
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
  signup: async (name, email, password) => {
    await delay(600);
    const users = JSON.parse(localStorage.getItem('users'));
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const token = 'mock-jwt-' + Date.now();
    return { token, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  }
};

export const projectAPI = {
  getAll: async () => {
    await delay(400);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return projects.map(proj => ({
      ...proj,
      taskCount: tasks.filter(t => t.projectId === proj.id).length,
      completedTasks: tasks.filter(t => t.projectId === proj.id && t.completed).length,
    }));
  },
  getById: async (id) => {
    await delay(300);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(t => t.projectId === id);
    return { ...project, tasks };
  },
  create: async (data) => {
    await delay(500);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const newProject = { id: Date.now().toString(), ...data, createdAt: new Date().toISOString() };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    return newProject;
  },
  update: async (id, updates) => {
    await delay(500);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem('projects', JSON.stringify(projects));
    return projects[index];
  },
  delete: async (id) => {
    await delay(500);
    let projects = JSON.parse(localStorage.getItem('projects')).filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    let tasks = JSON.parse(localStorage.getItem('tasks')).filter(t => t.projectId !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return { success: true };
  }
};

export const taskAPI = {
  getAll: async () => {
    await delay(400);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    return tasks.map(task => ({
      ...task,
      projectName: projects.find(p => p.id === task.projectId)?.name || 'Unknown'
    }));
  },
  getByProject: async (projectId) => {
    await delay(300);
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(t => t.projectId === projectId);
    return tasks;
  },
  create: async (data) => {
    await delay(500);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTask = { id: Date.now().toString(), ...data, completed: false, createdAt: new Date().toISOString() };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return newTask;
  },
  update: async (id, updates) => {
    await delay(400);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks[index] = { ...tasks[index], ...updates };
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks[index];
  },
  delete: async (id) => {
    await delay(400);
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return { success: true };
  }
};