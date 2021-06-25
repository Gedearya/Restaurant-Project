const pool = require("../config/db.js");

exports.insert = (data) => {
  return new Promise(function (resolve, reject) {
    var sql = "insert into products set ?";
    pool.query(sql, [data], (err, result) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};

exports.getProducts = (product_id) => {
  return new Promise(function (resolve, reject) {
    var sql = "select * from products";
    if (product_id) {
      sql += ` where id = ${product_id}`;
    }
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.delete = (product_id) => {
  return new Promise(function (resolve, reject) {
    var sql = `delete from products where id = ${product_id}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};

exports.update = (data, product_id) => {
  return new Promise(function (resolve, reject) {
    var sql = `update products set ? where id = ${product_id}`;
    pool.query(sql, [data], (err, result) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};
