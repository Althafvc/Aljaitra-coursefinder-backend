const courseDataModel = require("../Models/CourseDetails");
exports.adminLogin = async (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  try {
    if (email.trim() == "") {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    } else if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    } else if (email != process.env.EMAIL) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the admin Email" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Email validation successfull" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.dataCollection = async (req, res) => {
  const { COURSENAME, COLLEGE } = req.body;
  console.log(req.body);
  

  try {
    if (!COURSENAME.trim() || !COLLEGE.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Fetch course data
    const courseData = await courseDataModel.findOne({ COURSENAME });

    if (!courseData) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Check if the college exists in the course
    const collegeIndex = courseData.COLLEGES.indexOf(COLLEGE);
    if (collegeIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "College not found for this course" });
    }

    // Fetching specialization details properly
    
    const specializationData = courseData.SPECIFICATIONS[0][COLLEGE][0] || {};
    const specializations = Object.keys(specializationData);

    // Extracting fee details properly
    const feesDetails = specializations.map((spec) => ({
      specialization: spec,
      admission_fee: specializationData[spec]["ADMISSION FEE"],
      firstyear: specializationData[spec]["FIRSTYEAR"],
      secondyear: specializationData[spec]["SECONDYEAR"],
      thirdyear: specializationData[spec]["THIRDYEAR"],
      total_fee: specializationData[spec]["TOTAL"],
    }));

    const location = courseData.LOCATIONS[0][COLLEGE] || "";

    const responseData = {
      COURSENAME: courseData.COURSENAME,
      COLLEGE: COLLEGE,
      LOCATION: location,
      SPECIALIZATIONS: specializations,
      FEES_DETAILS: feesDetails, // Properly structured fee details
    };

    return res.status(200).json({ success: true, responseData });
  } catch (err) {
    console.error("Error fetching searched data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.fetchData = async (req, res) => {
  try {
    const result = await courseDataModel.find();

    return res.status(200).json({ success: true, allData: result });
  } catch (err) {
    console.log("data fetching failed", err);
    return res
      .status(500)
      .json({ success: false, message: "data fetching failed" });
  }
};
