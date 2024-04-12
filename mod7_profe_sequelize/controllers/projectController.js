import project from '../model/project.js'

const getProjects = async (req, res) => {
    try {

        res.send('mostrando todos los proyectos')
    } catch (error) {
        console.log(error.message)
    }
}


const createProjects = async (req, res) => {
    try {
        const { name, priority, description } = req.body;
        const newProject = await project.create({ name, priority, description })
        console.log(newProject)
        res.send('Creando Proyectos')
    } catch (error) {
         console.log(error.message);
    }
}


const updateProjects = async (req, res) => {
    try {
        res.send('Actualizando Poryectos')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteProject = async (req, res) => {
    try {
        res.send('Borrando Proyectos')
    } catch (error) {
         console.log(error.message);
    }
}


export {
    getProjects,
    createProjects,
    updateProjects,
    deleteProject
}