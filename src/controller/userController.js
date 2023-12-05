import {sql, config} from '../configs/connectDB'

let getUsers = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from account_user', function (err, recordset) {
  
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


let getUserById = async (req, res) => {
  try {
    const id_User = req.params.id;

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id_User', sql.NVarChar, id_User)
      .query('SELECT * FROM info_user WHERE id = @id_User');

    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(409).json({ message: "Get information failed!" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(404).json({ error: 'Error retrieving user information' });
  }
};

let updateUser = async (req, res) => {
  try {
    const { id, name, school, level, gender, address, more, account } = req.body;

    if (!id || !name || !school || !level || !gender || !address || !more || !account) {
      return res.status(404).json({
        message: "Wrong data input",
      });
    } else {
      const pool = await sql.connect(config);

      const result = await pool.request()
        .input('level', sql.NVarChar, level)
        .input('name', sql.NVarChar, name)
        .input('address', sql.NVarChar, address)
        .input('school', sql.NVarChar, school)
        .input('gender', sql.NVarChar, gender)
        .input('more', sql.NVarChar, more)
        .input('account', sql.NVarChar, account)
        .input('id', sql.NVarChar, id)
        .query('UPDATE info_user SET level_user = @level, name_user = @name, address = @address, school = @school, gender = @gender, description_user = @more, account_user = @account WHERE id = @id');

      if (result.rowsAffected && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: "Update user information successfully" });
      } else {
        return res.status(409).json({ message: "Update user information failed" });
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error updating user information' });
  }
};


module.exports = {
  getUsers,
  getUserById,
  updateUser
};
