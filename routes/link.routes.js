
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/link_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.post('/upload', verifyUser, controller.upload);
    router.get('/get/:linkId', controller.get);
    router.get('/get/kategori/:segmenId', controller.getSegmen);
    router.put('/update/:linkId', verifyUser, controller.update);
    router.delete('/delete/:linkId', verifyUser, controller.delete);
  
    app.use('/api/link/', router);
  }