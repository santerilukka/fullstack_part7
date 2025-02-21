import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogDetail = () => {
  const [blog, setBlog] = useState(null)
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
    </div>
  )
}

export default BlogDetail
