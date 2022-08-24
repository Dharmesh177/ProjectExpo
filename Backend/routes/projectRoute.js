const express = require("express");
const projectRoute = express.Router();

const { getAllProjects , getProjectById , getProjectByUserId ,addNewProject , getProjectBySubjectID , getProjectPlga , searchTheProject , setPlaga ,  UpdateProjectLink, DownloadProjectLink} = require("../controller/projectController");


projectRoute.get("/",getAllProjects);
projectRoute.get("/:id",getProjectById);
projectRoute.get("/UserId/:UserId",getProjectByUserId);
projectRoute.post("/add" , addNewProject);
projectRoute.put("/updateProjectLink",UpdateProjectLink);
projectRoute.get("/download/:id",DownloadProjectLink);
projectRoute.get("/Subject/:SubjectId", getProjectBySubjectID );
projectRoute.get("/getPlga/:ProjectId" , getProjectPlga)
projectRoute.get("/serach/:key",searchTheProject);
projectRoute.put("/setPlga" , setPlaga);

module.exports = projectRoute;