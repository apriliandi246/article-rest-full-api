const express = require('express');
const router = express.Router();
const Article = require('../models/articles');
const validateId = require('../middleware/validationId');


// get all articles
router.get('/', async (req, res) => {
   const articles = await Article.find().sort({ createdAt: 'desc' });
   res.send(articles);
});


// get article based on id
router.get('/id/:id', validateId, async (req, res) => {
   const article = await Article.findById(req.params.id);

   checkId(article, res);

   res.send(article);
});


// get article based on slug
router.get('/slug/:slug', async (req, res) => {
   const article = await Article.find({ slug: req.params.slug });
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


// edit article based on id
router.put('/id/:id', validateId, async (req, res) => {
   const article = await Article.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      tag: req.body.tag,
      markdown: req.body.markdown
   }, {
      new: true
   });

   checkId(article, res);

   article.save();

   res.send({
      message: "Article has updated....",
      status: res.statusCode
   });;
});


// edit article based on slu
router.put('/slug/:slug', async (req, res) => {
   const article = await Article.updateOne(
      {
         "slug": req.params.slug
      },
      {
         $set: {
            title: req.body.title,
            tag: req.body.tag,
            markdown: req.body.markdown
         }
      }
   );

   checkId(article, res);

   res.send({
      message: "Article has updated....",
      status: res.statusCode
   });;
});


// delete article based on
router.delete('/id/:id', validateId, async (req, res) => {
   const article = await Article.findByIdAndDelete(req.params.id);

   checkId(article, res);

   res.send({
      message: "Article has deleted....",
      status: res.statusCode
   });;
});


// delete article
router.delete('/slug/:slug', async (req, res) => {
   const article = await Article.deleteOne({
      "slug": req.params.slug
   });

   res.send({
      message: "Article has deleted....",
      status: res.statusCode
   });;
});


function checkId(data, response) {
   if (!data) {
      return response.status(404).send({
         message: "The Article with the given ID was not found...",
         status: response.statusCode
      });
   }
}


module.exports = router;