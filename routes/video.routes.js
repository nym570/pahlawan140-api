
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/video_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.get('/get/:videoId', controller.get);
    router.put('/update/:videoId', verifyUser, controller.update);
    router.delete('/delete/:videoId', verifyUser, controller.delete);
  
    app.use('/api/video/', router);
  }