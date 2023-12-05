import {sql, config} from '../configs/connectDB'

let getJobs = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from info_Job', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).send(recordset);
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving data' });
  }
};

let getPriority = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from priority_level', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).json(recordset);
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving data' });
  }
};

let getMajor = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from major', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).json(recordset);
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving data' });
  }
};

let getEducation = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from education_level', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).json(recordset);
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving data' });
  }
};

let getJobById = async (req, res) => {
  try {
    const idJob = req.params.id;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('jobId', sql.Int, idJob)
      .query('SELECT * FROM info_Job WHERE id = @jobId');
    
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving job by ID' });
  }
};


let createJob = async (req, res) => {
  try {
    const {
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
      return res.status(400).json({
        message: "Wrong data input",
      });
    }

    const pool = await sql.connect(config);

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

    const result = await pool.request()
      .query('INSERT INTO info_Job VALUES (@id_job, @title, @description, @salary, @note, @status, @count, @time, @priority, @major, @account, @company, @education)', {
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
      });

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({
        message: "Create new job successfully",
      });
    } else {
      return res.status(500).json({
        message: "Failed to create new job",
      });
    }
  } catch (err) {
    console.error('Error occurred:', err);
    return res.status(500).json({ error: 'Error creating job' });
  }
};


let getJobBySearch = async (req, res, next) => {
  try {
    const value = req.params.value;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('searchValue', sql.NVarChar, `%${value}%`)
      .query('SELECT * FROM info_Job WHERE title LIKE @searchValue');
    
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error searching jobs' });
  }
};

let updateJob = async (req, res) => {
  try {
    const {
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

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('salary', sql.Float, salary)
      .input('note', sql.NVarChar, note)
      .input('status', sql.NVarChar, status)
      .input('count', sql.Int, count)
      .input('time', sql.NVarChar, time)
      .input('priority', sql.Int, priority)
      .input('major', sql.Int, major)
      .input('account', sql.Int, account)
      .input('company', sql.Int, company)
      .input('education', sql.Int, education)
      .input('id', sql.Int, id)
      .query('UPDATE info_Job SET title = @title, description_Job = @description, salary = @salary, note = @note, status_Job = @status, count = @count, time_Create = @time, priorityID = @priority, majorID = @major, accountID = @account, companyID = @company, educationID = @education WHERE id = @id');
    
    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Update successful" });
    } else {
      return res.status(404).json({ message: "Job not found or no changes made" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error updating job' });
  }
};

let deleteJob = async (req, res) => {
  try {
    const id_Job = req.params.id;
    if (!id_Job) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id_Job', sql.Int, id_Job)
      .query('DELETE FROM info_Job WHERE id = @id_Job');

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Deleted job successfully" });
    } else {
      return res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error deleting job' });
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
