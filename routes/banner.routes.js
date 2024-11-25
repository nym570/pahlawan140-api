
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/banner_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.post('/upload',verifyUser, controller.upload);
    router.get('/get/:bannerId', controller.get);
    router.put('/update/:bannerId', verifyUser,controller.update);
    router.delete('/delete/:bannerId',verifyUser, controller.delete);
  
    app.use('/api/banner/', router);
  }