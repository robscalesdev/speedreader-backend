const express = require('express')
const axios = require('axios')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET new /posts
router.get('/new/:sub', (req, res, next) => {

  const activeSub = req.params.sub

  axios({
    url: `https://www.reddit.com/r/${activeSub}/top/.json`,
    method: 'GET'
  })
  .then(response => {
    const posts = response.data.data.children.filter(child => child.data.num_comments > 1)
    res.status(200).json({ posts })
  })
  .catch(next)
})

router.get('/post/', (req, res, next) => {
  axios({
    url: `https://www.reddit.com${req.query.link}.json`,
    method: 'GET'
  })
  .then(response => {
    // console.log(response.data[1].data.children)
    // console.log(response.data[1].data.children)
    if (response.data[1].data.children.length > 0) {
      const post_data = response.data[1].data.children.filter(post => post.data.author !== "AutoModerator")

      const stories = post_data.map(story => story.data.body.replace(/[\r\n\\]/g, ' ').split(' ').filter(word => word !== ''))
      
      res.status(200).json({ stories })
    }
    else {
      res.sendStatus(401)
    }
  })
  .catch(next)
})

module.exports = router
