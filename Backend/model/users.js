const pool = require("../config/db.js");

exports.insert = (data, tbl_name) => {
  return new Promise(function (resolve, reject) {
    var sql = `insert into ${tbl_name} set ?`;
    pool.query(sql, [data], (err, result) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};

exports.getUserDetailByUsername = (username) => {
  return new Promise(function (resolve, reject) {
    var sql = `
            select u.id, username, name, email, phonenumber
            from users u
            join user_profiles up on u.id = up.id
            where u.username = '${username}'
        `;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.getUserDetailByEmail = (email) => {
  return new Promise(function (resolve, reject) {
    var sql = `
            select u.id, username, name, email, phonenumber
            from users u
            join user_profiles up on u.id = up.id
            where up.email = '${email}'
        `;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.getUserDetailByUsernameAndPassword = (username, password) => {
  return new Promise(function (resolve, reject) {
    var sql = `
            select u.id, username, name, email, phonenumber
            from users u
            join user_profiles up on u.id = up.id
            where u.username = '${username}' and u.password = '${password}'
        `;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};
