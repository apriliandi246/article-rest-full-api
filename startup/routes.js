module.exports = (app) => {
   app.use('/articles', require('../routes/articles'));
}