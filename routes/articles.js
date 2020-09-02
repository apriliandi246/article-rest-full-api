const express = require('express');
const router = express.Router();
const Article = require('../models/articles');


// get all articles
router.get('/', async (req, res) => {
   const articles = await Article.find().sort({
      createdAt: 'desc'
   });

   res.send(articles);
});


// get article reference by id
router.get('/:id', async (req, res) => {
   const article = await Article.findById(req.params.id);
   res.send(article);
});


// get articles reference by tag
router.get('/tag/:tag', async (req, res) => {
   const articles = await Article.find({
      tag: req.params.tag
   }).sort({
      createdAt: 'desc'
   });

   res.send(articles);
});


// make new article
router.post('/', async (req, res) => {
   const article = new Article({
      title: req.body.title,
      tag: req.body.tag,
      markdown: req.body.markdown
   });

   await article.save();

   res.send({
      message: "Article has created....",
      status: res.statusCode
   });
});


// edit article
router.put('/:id', async (req, res) => {
   const article = await Article.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      tag: req.body.tag,
      markdown: req.body.markdown
   }, {
      new: true
   });

   article.save();

   res.send({
      message: "Article has updated....",
      status: res.statusCode
   });;
});


// delete article
router.delete('/:id', async (req, res) => {
   await Article.findByIdAndDelete(req.params.id);

   res.send({
      message: "Article has deleted....",
      status: res.statusCode
   });;
});


module.exports = router;