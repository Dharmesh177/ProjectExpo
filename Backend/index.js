const express = require("express");
require("./config/db");


//import all rounter
const roadmapRoute = require("./routes/roadmap-routes");
const projectRoute = require("./routes/projectRoute");
const mentorRoute = require("./routes/mentorRoutes");
const userRoute = require("./routes/userRoutes");
const collgeRoute = require("./routes/collegeRoutes");
const departmentRoute = require("./routes/departmentRoute");
const SubjectRoute = require("./routes/subjectRoute");
const ProfessorRoute = require("./routes/professorRoute");
const StudentRoute = require("./routes/studentRoute");
const universityRoute = require("./routes/universityRoute");
const uploadRoute = require("./controller/uploadProfileController");
const uploadProjectRoute = require("./controller/uploadProjectController");
//create the app
const app = express();


app.set("view engine","ejs");
app.use(express.json());


app.get('/',(req,res)=>{
    res.send({key:"hello bvmites!"})
})

app.use('/api/project', projectRoute);
app.use('/api/roadmap' , roadmapRoute);
app.use('/api/mentor' , mentorRoute);
app.use('/api/user' , userRoute);
app.use('/api/college',collgeRoute);
app.use('/api/department', departmentRoute);
app.use('/api/subject',SubjectRoute);
app.use('/api/professor', ProfessorRoute);
app.use('/api/student',StudentRoute);
app.use('/api/university',universityRoute);
app.use('/collegeprofile',uploadRoute);
app.use('/projectupload',uploadProjectRoute);
//define port

app.listen(5000, () => console.log("app started at 5000..."));