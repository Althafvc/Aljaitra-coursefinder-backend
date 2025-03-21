
const courseDataModel = require('../Models/CourseDetails')
exports.adminLogin = async (req, res) => {
    const { email } = req.body

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.trim() == '') {
        return res.status(400).json({ success: false, message: 'All fields are mandatory' });
    }

    else if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });

    }

    else if (email != process.env.EMAIL) {
        return res.status(400).json({ success: false, message: "Please provide the admin Email" });
    }

    else {

        return res.status(200).json({ success: true, message: "Email validation successfull" });

    }

}



exports.dataCollection = async (req, res) => {
    const { COURSENAME, COLLEGE } = req.body;

    try {
        if (!COURSENAME.trim() || !COLLEGE.trim()) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        // Fetch courses matching the given COURSENAME
        const courseData = await courseDataModel.findOne({ COURSENAME });


        if (!courseData) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Find the index of the selected college in the array
        const collegeIndex = courseData.COLLEGES.indexOf(COLLEGE);
        

        if (collegeIndex === -1) {
            
            return res.status(404).json({ success: false, message: "College not found for this course" });
        }
                
        // Extract related data based on the found index
        const responseData = {
            COURSENAME: courseData.COURSENAME,
            COLLEGE: COLLEGE,
            SPECIALISATION: courseData.SPECIFICATIONS,
            FEESAMOUNT:courseData.FEESAMOUNT[collegeIndex],
            LOCATION:courseData.LOCATIONS[collegeIndex]
            
            
        }
        
        
        return res.status(200).json({ success: true, responseData });

    } catch (err) {
        console.error('Error fetching searched data:', err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



exports.fetchData = async (req,res)=> {
    
    try {

        const result = await courseDataModel.find()        
        
    
        return res.status(200).json({success:true, allData:result })

    }catch(err) {
        console.log('data fetching failed',err);
        return res.status(500).json({ success: false, message: "data fetching failed"});

        
    }

}


