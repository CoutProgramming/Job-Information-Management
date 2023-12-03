import pool from "../configs/connectDB";
import loginService, { checkUser_name } from "../service/loginService";
import { createJWT, verifyJWT } from "../middleware/JWTAuthentication";

let getALLAccounts = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM account_user");

  return res.status(200).json({
    data: rows,
  });
};

let Login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
      return res.status(500).json({
        errCode: 0,
        message: "Missing input parameter!",
      });
    }
    let userData = await loginService.handleLogin(username, password);

    if (userData && userData.errCode === 3) {
      let userToken = createJWT(userData.userInfo);

      let verifyToken = verifyJWT(userToken);

      return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        infoUser: username,
        account_user: userData.account_user,
        token: userToken,
        verifyToken: verifyToken,
      });
    }

    return res.json({
      errorCode: userData.errCode,
      message: userData.message,
    });
  } catch (err) {
    console.log(err);
  }
};

let checkAccountSignuped = async (username) => {
  try {
    const [user, fields] = await pool.execute(
      "SELECT * FROM account_user where user_name = ?",
      [username]
    );
    console.log(user);
    if (user === undefined || user.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

let Signup = async (req, res) => {
  let { username, password } = req.body;
  //console.log(req.body);
  let checkUser = await checkAccountSignuped(username);
  console.log(checkUser);
  if (checkUser === true) {
    return res.status(200).json({
      message: "Tài khoản này đã tồn tại",
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
      let id_account = generateRandomId();
      let role = 2;
      const [user, fields] = await pool.execute(
        "INSERT INTO account_user values (?, ?, ?, ?)",
        [id_account, username, password, role]
      );
      if(user)
      {
        return res.status(200).json({
          message: "Đăng kí tài khoản thành công",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  getALLAccounts,
  Login,
  Signup,
};
