const user_controller = require('../controllers/user.controller');
const user_middleware = require('../middlewares/user.middlewares');
const bug_middleware=require('../middlewares/bug.middleware')

module.exports = (app) => {
    app.post('/bugTracking/api/v1/signUp', [user_middleware.verifySignUpBody], user_controller.signUp);
    app.post('/bugTracking/api/v1/signIn', [user_middleware.verifySignInBody], user_controller.signIn);
};
