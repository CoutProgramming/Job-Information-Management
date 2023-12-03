import pool from "../configs/connectDB";

let handleLogin = (user_name, password) => {
    return new Promise( async (resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUser_name(user_name);
            // console.log('check exist', isExist);
            if(isExist) {
                const [rows, fields] = await pool.execute("SELECT password FROM account_user where user_name = ?", [user_name]);
                const pass_User = rows[0].password;
                //console.log('pass: ' + pass_User);
                let result = password.localeCompare(pass_User);
                //console.log(pass_User + " - " + password);
                if(result === 0)
                {
                    let getUser = await getInfoUser(user_name);
                    // console.log('getUser: ' + JSON.stringify(getUser))
                    userData.errCode = 3;
                    userData.message = "Login successful";
                    userData.userInfo = getUser[0].id;
                    userData.account_user = getUser[0].account_user;
                }
                else{
                    userData.errCode = 2;
                    userData.message = "Your password is incorrect";
                    // console.log("Your password is incorrect");
                }
            }
            else{
                userData.errCode = 1;
                userData.message = "Your user_name not found";
            }
            resolve(userData);
        }
        catch(e){
            reject(e);
        }
    })
}

let checkUser_name = (user_name) => {
    return new Promise( async (resolve, reject) => {
        try{
            const [user, fields] = await pool.execute("SELECT * FROM account_user where user_name = ?", [user_name]);
            if(!user.length)
            {
                resolve(false);
            }
            else{
                resolve(true);
            }
        }
        catch(e){
            reject(e);
        }
    })
}

let getInfoUser = (user_name) => {
    return new Promise( async (resolve, reject) => {
        try{
            let data = {};
            const [rows] = await pool.execute("SELECT * FROM account_user where user_name = ?", [user_name]);
            const id_User = rows[0].id;
            const [user] = await pool.execute("SELECT * FROM info_user where id = ?", [id_User]);
            
            if(!user.length)
            {
                resolve(false);
            }
            else{
                data = user;
                resolve(data);
            }
        }
        catch(e){
            reject(e);
        }
    })
}

let handleSignUp = (user_name, password, userId) => {
    return new Promise( async (resolve, reject) => {
        try{
             
        }
        catch(err){
            reject(e);
        }
    })

}


module.exports = {
    handleLogin,
    handleSignUp,
    checkUser_name
}