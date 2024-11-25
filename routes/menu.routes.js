

module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/menu_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.get('/get/:menuId', controller.get);
    router.put('/update/:menuId',verifyUser, controller.update);
    router.delete('/delete/:menuId',verifyUser, controller.delete);
  
    app.use('/api/menu/', router);
  }
