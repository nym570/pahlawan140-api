
const multer = require("multer")
// const {join} = require('path')
// const rekomPath = join(__dirname,`../../pahlawan140/public/magang/rekomendasi`);
// const ktmPath = join(__dirname,`../../pahlawan140/public/magang/ktm`);
// const proposalPath = join(__dirname,`../../pahlawan140/public/magang/proposal`);
// const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//        if (file.fieldname === "rekomendasi") {
//            cb(null, rekomPath)
//        }
//        else if (file.fieldname === "ktm") {
//            cb(null, ktmPath);
//        }
//        else if (file.fieldname === "proposal") {
//            cb(null, proposalPath)
//        }
//     },
//     filename:(req,file,cb)=>{
//         cb(null, Date.now()+'-'+file.originalname.replaceAll(" ", "-"))
//     }
// });


module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/magangacc_controller');
    const verifyToken = require('../middleware/magangMiddleware');
    const verifyUser = require('../middleware/adminMiddleware');
    router.post('/regist', controller.regist);
    router.patch('/verifyemail', controller.verifyEmail);
    router.post('/login', controller.login);
    router.get('/get',verifyToken, controller.get);
    router.get('/',verifyUser, controller.getAll);
    router.get('/count', controller.getCountStatus);
    router.post('/daftar', verifyToken, controller.daftar);
    router.post('/upload', controller.upload);
    router.put('/update/:magangId',verifyUser, controller.update);
    router.put('/status/:magangId',verifyUser, controller.status);
    router.delete('/delete/:magangId',verifyUser, controller.delete);
  
    app.use('/api/magang/', router);
}
