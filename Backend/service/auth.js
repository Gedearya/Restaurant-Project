const users = require("../model/users");
const md5 = require("md5");
const jwt = require("../lib/jwt");

exports.register = (req, res) => {
  let user_login = {
    username: req.body.username,
    password: md5(req.body.password),
  };

  let user_profile = {
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
  };

  users
    .getUserDetailByUsername(req.body.username)
    .then((getUserDetailByUsername) => {
      if (getUserDetailByUsername.length == 0) {
        users
          .getUserDetailByEmail(req.body.email)
          .then((getUserDetailByEmail) => {
            if (getUserDetailByEmail.length == 0) {
              users
                .insert(user_login, "users")
                .then(() => {
                  users
                    .insert(user_profile, "user_profiles")
                    .then(() => {
                      console.log(user_profile);
                      res.json({
                        success: true,
                      });
                    })
                    .catch(() => {
                      res.json({
                        success: false,
                        message: "failed to insert user into database.",
                      });
                    });
                })
                .catch(() => {
                  res.json({
                    success: false,
                    message: "failed to insert user into database.",
                  });
                });
            } else {
              res.json({
                success: false,
                message: "email already existed.",
              });
            }
          });
      } else {
        res.json({
          success: false,
          message: "username already existed.",
        });
      }
    });
};

exports.login = (req, res) => {
  users
    .getUserDetailByUsernameAndPassword(
      req.body.username,
      md5(req.body.password)
    )
    .then((result) => {
      if (result.length > 0) {
        let data = {
          user_id: result[0].id,
          username: result[0].username,
          name: result[0].name,
          email: result[0].email,
          phonenumber: result[0].phonenumber,
        };

        const token = jwt.Encode(data);
        console.log(token);

        res.json({
          success: true,
          token,
        });
        return;
      }

      res.json({
        success: false,
        message: "Username or password do not match.",
      });
    });
};

exports.decodeToken = (req, res) => {
  const decoded_data = jwt.Decode(req.params.token);

  res.json({
    success: true,
    user_detail: decoded_data,
  });
};
