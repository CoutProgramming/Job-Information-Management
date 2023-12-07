import {sql, config} from '../configs/connectDB'
const moment = require("moment");
import main from './sendmailController';

let getApply = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from apply', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).json(recordset);
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(404).json({ error: 'Error retrieving data' });
  }
};

let getApplyById = async (req, res) => {
  try {
    const idJob = req.params.id;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('idJob', sql.Int, idJob)
      .query('SELECT * FROM apply WHERE id = @idJob');
    
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(404).json({ error: 'Error retrieving apply information' });
  }
};

let getAllApplyById = async (req, res) => {
  try {
    const idAccount = req.params.id;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('idAccount', sql.Int, idAccount)
      .query('SELECT * FROM apply WHERE accountID = @idAccount');
    
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(404).json({ error: 'Error retrieving apply information' });
  }
};

let createApply = async (req, res) => {
  try {
    const { account, job, time } = req.body;
    const dateValue = moment(time).format("YYYY-MM-DD");

    if (!account || !job || !time) {
      return res.status(400).json({
        message: "Invalid data input",
      });
    }

    const pool = await sql.connect(config);

    // Function to check if the application already exists
    async function checkApply(account, job) {
      const result = await pool.request()
        .input('account', sql.Int, account)
        .input('job', sql.Int, job)
        .query('SELECT * FROM apply WHERE accountID = @account AND jobID = @job');

      return result.recordset.length > 0;
    }

    const check = await checkApply(account, job);

    if (check) {
      return res.status(200).json({
        message: "Bạn đã ứng tuyển công việc này rồi!",
      });
    } else {
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
      let id_Apply = generateRandomId();
      let status = "Chờ duyệt";

      const result = await pool.request()
        .input('id_Apply', sql.NVarChar, id_Apply)
        .input('account', sql.Int, account)
        .input('job', sql.Int, job)
        .input('status', sql.NVarChar, status)
        .input('dateValue', sql.Date, dateValue)
        .query('INSERT INTO apply VALUES (@id_Apply, @account, @job, @status, @dateValue)');

      if (result.rowsAffected && result.rowsAffected[0] === 1) {
        main();
        return res.status(200).json({
          message: "Ứng tuyển công việc thành công",
        });
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error applying for job' });
  }
};

let checkApply = async (account, job) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('account', sql.Int, account)
      .input('job', sql.Int, job)
      .query('SELECT * FROM apply WHERE accountID = @account AND jobID = @job');

    return result.recordset.length > 0;
  } catch (error) {
    console.error('Error occurred:', error);
    return false;
  }
};

let deleteApply = async (req, res) => {
  try {
    const id_Apply = req.params.id;
    if (!id_Apply) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id_Apply', sql.NVarChar, id_Apply)
      .query('DELETE FROM apply WHERE id = @id_Apply');

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Deleted apply successfully" });
    } else {
      return res.status(404).json({ message: "Apply not found" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error deleting apply' });
  }
};

module.exports = {
  getApply,
  getApplyById,
  createApply,
  checkApply,
  deleteApply,
  getAllApplyById
};
