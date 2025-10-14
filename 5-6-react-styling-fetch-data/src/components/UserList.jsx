import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import UserCard from './UserCard'

function UserList({ users, onUserClick }) {
  if (users.length === 0) {
    return (
      <Alert>
        No users found matching your search criteria.
      </Alert>
    )
  }

}

export default UserList
