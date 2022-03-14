'use strict';

const loginDao = require('../dao/loginDao');

exports.getAuth = function(userId) {
    console.log("data2: " + loginDao.getAuth(userId));

    return loginDao.getAuth(userId);
};