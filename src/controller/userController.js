import pool from "../configs/connectDB";

let getUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM account_user");
  return res.status(200).json(rows);
};


let getUserById = async (req, res) => {
  try {
    let id_User = req.params.id;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM info_user where id = ?",
      [id_User]
    );

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(409).json({ message: "Get information failed!" });
    }
  } catch (e) {
    console.log(e);
  }
};

let updateUser = async (req, res) => {
  try {
    let { id, name, school, level, gender, address, more, account  } = req.body;
    console.log(req.body);
    if (!id || !name || !school || !level || !gender || !address || !more || !account) {
      return res.status(404).json({
        message: "Wrong data input",
      });
    } else {
      const [rows] = await pool.execute(
        "UPDATE info_user SET level_user = ?, name_user = ?, address = ?, school = ?, gender = ?, description_user = ?, account_user = ? where id = ?",
        [level, name, address, school, gender, more, account, id]
      );
      return res.status(200).json(rows);
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  getUsers,
  getUserById,
  updateUser
};
