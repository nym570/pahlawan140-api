
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/sertifikat_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.post('/upload', verifyUser, controller.upload);
    router.get('/get/:sertifikatId', controller.get);
    router.put('/update/:sertifikatId',verifyUser, controller.update);
    router.delete('/delete/:sertifikatId', verifyUser, controller.delete);
  
    app.use('/api/sertifikat/', router);
  }