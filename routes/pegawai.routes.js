
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/pegawai_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.post('/upload',verifyUser, controller.upload);
    router.get('/get/:pegawaiId', controller.get);
    router.put('/update/:pegawaiId', verifyUser, controller.update);
    router.delete('/delete/:pegawaiId', verifyUser, controller.delete);
  
    app.use('/api/pegawai/', router);
  }