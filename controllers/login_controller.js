

const {rs, re} = require('./function/rr_function');
const jwt = require("jsonwebtoken");


const generateToken = (role) => {
  return jwt.sign({role }, "Pahlawan140_3515");
};

const userAccount = [
  {
    username: "hero140",
    password: "3515_140",
    role: "admin", // Role for admin
  },
  {
    username: "bps3515",
    password: "bps3515",
    role: "user", // Role for user
  },
];

let self = {};

self.login = (req, res) => {
  const data = userAccount.find((user) => user.username === req.body.username);
    if(!data){
      re(res, "Username tidak terdaftar", 400);
    }
    else if(data.password !== req.body.password){
      re(res, "password salah", 400);
    }
    else{
      const token = generateToken(data.role)
      const user = data;
      rs(res, {token: token,user:user});
    }
};

module.exports = self;