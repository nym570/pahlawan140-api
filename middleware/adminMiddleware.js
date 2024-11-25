const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
 const decoded = jwt.verify(token.substr(7,token.length), "Pahlawan140_3515",function(err, decoded) {
   if(err){
    res.status(401).json('gagal authentikasi');
   }
   else{
    if(decoded.role == 'admin'){
      next();
    }
     else{
      res.status(401).json('gagal authorisasi');
     }
 
   }
  });

 

 
 };

module.exports = verifyToken;