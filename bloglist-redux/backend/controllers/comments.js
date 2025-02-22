const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

router.post('/:id/comments', async (request, response) => {
  try {
    const { content } = request.body
    if (!content) {
      return response.status(400).json({ error: 'Content is required' })
    }

    const comment = new Comment({ content, blog: request.params.id })
    const savedComment = await comment.save()

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id/comments', async (request, response) => {
  try {
    const comments = await Comment.find(
      { blog: request.params.id },
      { content: 1, id: 1 }
    )
    response.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error.message)
    response.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
