import {sql, config} from '../configs/connectDB'

let getCompany = async (req, res) => {
  try {
    sql.connect(config, function (err) {

      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('select * from company', function (err, recordset) {
  
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

let createCompany = async (req, res) => {
  try {
    const { name, sdt, email, address, description } = req.body;

    if (!name || !sdt || !email || !address || !description) {
      return res.status(400).json({
        message: "Invalid data input",
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
    const id_company = generateRandomId();

    await pool.request()
      .input('id_company', sql.NVarChar, id_company)
      .input('name', sql.NVarChar, name)
      .input('address', sql.NVarChar, address)
      .input('email', sql.NVarChar, email)
      .input('sdt', sql.NVarChar, sdt)
      .input('description', sql.NVarChar, description)
      .query('INSERT INTO company VALUES (@id_company, @name, @address, @email, @sdt, @description)');
    
    return res.status(200).json({
      message: "Create new company successfully",
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error creating new company' });
  }
};

let getCompanyById = async (req, res) => {
  try {
    const id_Company = req.params.id;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id_Company', sql.NVarChar, id_Company)
      .query('SELECT * FROM company WHERE id = @id_Company');

    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(404).json({ message: "Company information not found" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error retrieving company information' });
  }
};

let updateCompany = async (req, res) => {
  try {
    const { id, name, phone, email, address, description } = req.body;

    if (!id || !name || !phone || !email || !address || !description) {
      return res.status(400).json({
        message: "Invalid data input",
      });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.NVarChar, id)
      .input('name', sql.NVarChar, name)
      .input('phone', sql.NVarChar, phone)
      .input('email', sql.NVarChar, email)
      .input('address', sql.NVarChar, address)
      .input('description', sql.NVarChar, description)
      .query('UPDATE company SET company_name = @name, address = @address, email = @email, phone = @phone, description_company = @description WHERE id = @id');

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Updated company information successfully" });
    } else {
      return res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error updating company information' });
  }
};

let deleteCompany = async (req, res) => {
  try {
    const id_Company = req.params.id;
    if (!id_Company) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id_Company', sql.NVarChar, id_Company)
      .query('DELETE FROM company WHERE id = @id_Company');

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Deleted company information successfully" });
    } else {
      return res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Error deleting company information' });
  }
};

module.exports = {
  getCompany,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
};
