'use strict';

module.exports = (app) => {
   app.use('/api/articles', require('../routes/articles'));
}
