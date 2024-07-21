const bug_controller=require('../controllers/bug.controller')
const bug_middleware=require('../middlewares/bug.middleware')

module.exports = (app) => {
    app.post('/bugTracking/api/v1/createBug', [bug_middleware.verifyToken, bug_middleware.isAdmin, bug_middleware.verifyBugBody], bug_controller.createBug);
    app.get('/bugTracking/api/v1/getBug', [bug_middleware.verifyToken], bug_controller.getBug);
    app.put('/bugTracking/api/v1/updateBug', [bug_middleware.verifyToken, bug_middleware.isAdmin], bug_controller.updateBug);
    app.delete('/bugTracking/api/v1/deleteBug', [bug_middleware.verifyToken, bug_middleware.isAdmin], bug_controller.deleteBug);
    app.get('/bugTracking/api/v1/getPendingBug', [bug_middleware.verifyToken], bug_controller.getPendingBug);
    app.get('/bugTracking/api/v1/getResolvedBug', [bug_middleware.verifyToken], bug_controller.getResolvedBug);
    app.get('/bugTracking/api/v1/fetchBugWithname', [bug_middleware.verifyToken], bug_controller.getBugWithName);
};
