import pool from "../configs/connectDB";


let getJobs = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM info_Job");
  return res.status(200).json(rows);
};

let getPriority = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM priority_level");
  return res.status(200).json(rows);
};

let getMajor = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM major");
  return res.status(200).json(rows);
};

let getEducation = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM education_level");
  return res.status(200).json(rows);
};

let getJobById = async (req, res) => {
  let idJob = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM info_Job where id = ?",
    [idJob]
  );
  return res.status(200).json(rows);
};

let createJob = async (req, res) => {
  let body = req.body;
  console.log("data: ", body);
  let {
    title,
    account,
    company,
    priority,
    status,
    education,
    major,
    count,
    salary,
    time,
    description,
    note,
  } = req.body;

  if (
    !title ||
    !account ||
    !company ||
    !priority ||
    !status ||
    !education ||
    !major ||
    !count ||
    !salary ||
    !time ||
    !description ||
    !note
  ) {
    return res.status(404).json({
      message: "Wrong data input",
    });
  } else {
    try {
      function generateRandomId() {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }

      // Tạo một mã ngẫu nhiên
      let id_job = generateRandomId();

      let result = await pool.execute(
        "INSERT INTO info_Job values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id_job,
          title,
          description,
          salary,
          note,
          status,
          count,
          time,
          priority,
          major,
          account,
          company,
          education,
        ]
      );

      if (result) {
        return res.status(200).json({
          message: "Create new job successfully",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

let getJobBySearch = async (req, res, next) => {
  let value = req.params.value;
  console.log(value);
  const [rows, fields] = await pool.execute("SELECT * FROM info_Job where title LIKE ? ", [`%${value}%`]);
  return res.status(200).json(rows);
}

let updateJob = async (req, res) => {
  try {
    let {
      account,
      company,
      count,
      description,
      education,
      id,
      major,
      note,
      priority,
      salary,
      status,
      time,
      title,
    } = req.body;
    //console.log("data: ", req.body);

    let result = await pool.execute(
      "UPDATE info_Job SET title = ?, description_Job = ?, salary = ?, note = ?, status_Job = ?, count = ?, time_Create = ?, priorityID = ?, majorID = ?, accountID = ?, companyID = ?, educationID = ? where id = ?",
      [
        title,
        description,
        salary,
        note,
        status,
        count,
        time,
        priority,
        major,
        account,
        company,
        education,
        id,
      ]
    );
    if (result) {
      return res.status(200).json({ message: "Xoá thành công!" });
    }
  } catch (err) {
    console.log(err);
  }
};

let deleteJob = async (req, res) => {
  try {
    let id_Job = req.params.id;
    if (!id_Job) {
      return res.status(409).json({ message: "Job not found" });
    } else {
      const [rows] = await pool.execute("DELETE FROM info_Job where id = ?", [
        id_Job,
      ]);
      return res
        .status(200)
        .json({ message: "Xoá thông tin công việc thành công" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  getPriority,
  getMajor,
  getEducation,
  deleteJob,
  updateJob,
  getJobBySearch
};
