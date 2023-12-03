import pool from "../configs/connectDB";
const moment = require("moment");

let getApply = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM apply");
  return res.status(200).json(rows);
};

let getApplyById = async (req, res) => {
  let idJob = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM apply where id = ?",
    [idJob]
  );
  return res.status(200).json(rows);
};

let getAllApplyById = async (req, res) => {
  let idAccount = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM apply where accountID = ?",
    [idAccount]
  );
  return res.status(200).json(rows);
};

let createApply = async (req, res) => {
  let { account, job, time } = req.body;
  const dateValue = moment(time).format("YYYY-MM-DD");
  if (!account || !job || !time) {
    return res.status(404).json({
      message: "Wrong data input",
    });
  } else {
    try {
      let check = await checkApply(account, job);
      if (check) {
        return res.status(201).json({
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

        let result = await pool.execute(
          "INSERT INTO apply values (?, ?, ?, ?, ?)",
          [id_Apply, account, job, status, dateValue]
        );

        if (result) {
          return res.status(200).json({
            message: "Ứng tuyển công việc thành công",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

let checkApply = async (account, job) => {
  try {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM apply where accountID = ? and jobID = ?",
      [account, job]
    );
    console.log(rows);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

let deleteApply = async (req, res) => {
  try {
    let id_Apply = req.params.id;
    if (!id_Apply) {
      return res.status(409).json({ message: "Apply not found" });
    } else {
      const [rows] = await pool.execute("DELETE FROM apply where id = ?", [
        id_Apply,
      ]);
      return res
        .status(200)
        .json({ message: "Xoá thông tin ứng tuyển thành công" });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getApply,
  getApplyById,
  createApply,
  checkApply,
  deleteApply,
  getAllApplyById
};
