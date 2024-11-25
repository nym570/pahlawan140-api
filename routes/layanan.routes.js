
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/layanan_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.get('/get/:layananId', controller.get);
    router.put('/update/:layananId', verifyUser, controller.update);
    router.delete('/delete/:layananId', verifyUser, controller.delete);
  
    app.use('/api/layanan/', router);
  }