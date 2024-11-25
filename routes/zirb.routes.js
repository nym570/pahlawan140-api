
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/zirb_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.get('/get/:zirbId', controller.get);
    router.put('/update/:zirbId',verifyUser, controller.update);
    router.delete('/delete/:zirbId',verifyUser, controller.delete);
  
    app.use('/api/zirb/', router);
  }