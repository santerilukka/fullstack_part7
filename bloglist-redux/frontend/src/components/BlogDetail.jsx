import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import commentsService from '../services/comments'
import Comments from './Comments'

const BlogDetail = () => {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getById(id)
        setBlog(fetchedBlog)
      } catch (error) {
        console.error('Error fetching blog:', error)
      }
    }
    fetchBlog()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await commentsService.getAll(id)
        setComments(fetchedComments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [id])

  const handleNewComment = (newComment) => {
    setComments(comments.concat(newComment))
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>
      <Comments
        comments={comments}
        blogId={blog.id}
        onNewComment={handleNewComment}
      />
    </div>
  )
}

export default BlogDetail
