const Project = require("../model/Project")

const getAllProjects = async(req,res,next)=>{
    
    console.log("helloooee");
    let projects;

    try {
        projects = await Project.find();
    } catch (error) {
        console.log(error);
    }

    if(!projects)
    {
        return res.status(404).json({
            success: false,
            response: {
                code: Project_Found_fail,
                message: "Project not found",
            },
        });
    }
    console.log(projects);
    return res.status(200).json({ projects })
}

module.exports = { getAllProjects }