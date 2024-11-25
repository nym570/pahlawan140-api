
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/aplikasi_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.post('/upload', verifyUser, controller.upload);
    router.get('/get/:aplikasiId', controller.get);
    router.put('/update/:aplikasiId', verifyUser, controller.update);
    router.delete('/delete/:aplikasiId', verifyUser, controller.delete);
  
    app.use('/api/aplikasi/', router);
  }