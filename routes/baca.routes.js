
module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/baca_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.post('/upload', verifyUser, controller.upload);
    router.get('/get/:bacaId', controller.get);
    router.put('/update/:bacaId', verifyUser, controller.update);
    router.delete('/delete/:bacaId', verifyUser, controller.delete);
  
    app.use('/api/baca/', router);
  }