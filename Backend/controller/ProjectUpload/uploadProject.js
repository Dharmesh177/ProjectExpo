const Project = require("../../model/Project");
//const uploadProject = require("../../controller/ProjectUpload/uploadProject");
const {folderUpload} = require("../../controller/ProjectUpload/folderUpload");

//const axios = require('axios')
function uniqname(pro_id) {
  return pro_id;
}

const UpdateProjectLink = async (ProjectId, UpdatedProjectLink) => {
  
  // const {
  //   ProjectId,
  // } = req.body;

  // const UpdatedProjectLink = req.body.UpdatedProjectLink;
  console.log(UpdateProjectLink);
  try {
    const update = {  ProjectLink : UpdatedProjectLink };

   await Project.findByIdAndUpdate(ProjectId,
        update);
      console.log("Done.....");
   
} catch (error) {
  console.log("error: ", error);
    // return res.status(400).json({
    //     success : false,
    //     response : {
    //         error
    //     }
    // })
}
  
  // return res.status(200).json({
  //     success: true,
  //     response: {
  //         code: "Project_link_updated",
  //     },
  // });
};

exports.uploadProject = async (req, res, next) =>
{

  var {
    projectId,
    folderPath
  } = req.body

//do aws stuff here
  const allpaths = await folderUpload({s3BucketName: "projectexpo-projects",
  // Absolute path
  localFolder: folderPath,
  accessKeyId: "AKIAS6G5ANL5655DKEHC",
  secretAccessKey: "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",
  
  folder_name : uniqname(projectId)});
  // .then(() => {
  //   console.log(`Completed!`);
  // }).catch(err => {
  //   console.log(err);
  // });

  // console.log("file paths: ", allpaths);
  UpdateProjectLink(projectId, allpaths);

  //save all paths to database  
  
// console.log(folderPath);

  return res.status(200).json({
    success: true,
    response: {
        code: "Project_uploaded",
    },
});
}

// module.exports = { uploadProject }