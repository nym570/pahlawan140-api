
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/luki_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.get('/get/:lukiId', controller.get);
    router.put('/update/:lukiId',verifyUser, controller.update);
    router.delete('/delete/:lukiId',verifyUser, controller.delete);
  
    app.use('/api/luki/', router);
  }