'use strict';
module.exports = app => {
    const user = require('../controllers/userController');
    
    // User Routes
    app.route('/users')
        .get(user.list)
        .post(user.create);
    
    app.route('/users/:userName')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
};
