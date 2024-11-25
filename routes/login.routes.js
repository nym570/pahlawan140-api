

module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/login_controller');
    router.post('/login', controller.login);
  
    app.use('/api/user/', router);
}
