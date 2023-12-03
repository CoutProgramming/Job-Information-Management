import pool from "../configs/connectDB";

let getCompany = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM company");
  return res.status(200).json(rows);
};

let createCompany = async (req, res) => {
  let { name, sdt, email, address, description } = req.body;

  if (!name || !sdt || !email || !address || !description) {
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
      let id_company = generateRandomId();

      await pool.execute("INSERT INTO company values (?, ?, ?, ?, ?, ?)", [
        id_company,
        name,
        address,
        email,
        sdt,
        description,
      ]);

      return res.status(200).json({
        message: "Create new company successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
};

let getCompanyById = async (req, res) => {
  try {
    let id_Company = req.params.id;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM company where id = ?",
      [id_Company]
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

let updateCompany = async (req, res) => {
  try {
    let { id, name, phone, email, address, description } = req.body;
    console.log(req.body);
    if (!id || !name || !phone || !email || !address || !description) {
      return res.status(404).json({
        message: "Wrong data input",
      });
    } else {
      const [rows] = await pool.execute(
        "UPDATE company SET company_name = ?, address = ?, email = ?, phone = ?, description_company = ? where id = ?",
        [name, address, email, phone, description, id]
      );
      return res.status(200).json(rows);
    }
  } catch (err) {
    console.log(err);
  }
};

let deleteCompany = async (req, res) => {

  try{
    let id_Company = req.params.id;
    if(!id_Company)
    {
      return res.status(409).json({ message: 'Company not found' });
    }
    else{
      const [rows] = await pool.execute(
        "DELETE FROM company where id = ?",
        [id_Company]
      );
      return res.status(200).json({message: "Xoá thông tin công ty thành công"});
    }
  }
  catch (err) {
    console.log(err);
  }
  
}

module.exports = {
  getCompany,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
};
