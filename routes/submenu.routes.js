
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/submenu_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/', verifyUser, controller.save);
    router.get('/get/:subId', controller.get);
    router.get('/get/menu/:menuId', controller.getMenu);
    router.put('/update/:subId', verifyUser, controller.update);
    router.delete('/delete/:subId', verifyUser, controller.delete);
  
    app.use('/api/submenu/', router);
  }