const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
 const decoded = jwt.verify(token.substr(7,token.length), "MagangDi3515",function(err, decoded) {
   if(err){
    res.status(401).json('gagal authentikasi');
   }
   else{
     req.params.id = decoded.id;
 next();
   }
  });

    // res.status(200).json(jwtDecode(token))
//  const decoded = jwt.verify(token, "MagangDi3515");
//  req.magangId = decoded.magangId;
//  next();
 

 
 };

module.exports = verifyToken;