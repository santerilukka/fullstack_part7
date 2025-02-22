import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersService.getAll()
      setUsers(users)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
