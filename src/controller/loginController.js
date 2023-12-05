import {sql, config} from '../configs/connectDB'
import loginService, { checkUser_name } from "../service/loginService";
import { createJWT, verifyJWT } from "../middleware/JWTAuthentication";

let getALLAccounts = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from account_user', function (err, recordset) {
  
          if (err) console.log(err)
  
          // send records as a response
          res.status(200).json({data: recordset});
  
      });
  });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving data' });
  }
};

let Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        errorCode: 0,
        message: "Missing input parameter!",
      });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query('SELECT * FROM account_user WHERE user_name = @username AND password = @password');
      console.log('result: ', result);

    if (result.recordset.length > 0) {
      const userData = result.recordset[0];
      console.log('user: ', userData);
      const userToken = createJWT(userData);

      const verifyToken = verifyJWT(userToken);

      return res.status(200).json({
        errCode: 3,
        message: "Login successfully",
        infoUser: username,
        account_user: userData.role_user,
        token: userToken,
        verifyToken: verifyToken,
      });
    }

    return res.json({
      errorCode: 1,
      message: "Invalid username or password",
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error during login' });
  }
};

let checkAccountSignuped = async (username) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM account_user WHERE user_name = @username');

    if (result.recordset.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    // Xử lý lỗi hoặc thông báo lỗi tùy thuộc vào logic ứng dụng của bạn
    return false;
  }
};

let Signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await checkAccountSignuped(username);

    if (checkUser === true) {
      return res.status(200).json({
        message: "Tài khoản này đã tồn tại",
      });
    } else {
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
      let id_account = generateRandomId();
      let role = 2;

      const result = await pool.request()
        .input('id_account', sql.NVarChar, id_account)
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .input('role', sql.Int, role)
        .query('INSERT INTO account_user VALUES (@id_account, @username, @password, @role)');

      if (result.rowsAffected && result.rowsAffected[0] === 1) {
        return res.status(200).json({
          message: "Đăng ký tài khoản thành công",
        });
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error during account registration' });
  }
};

module.exports = {
  getALLAccounts,
  Login,
  Signup,
};
