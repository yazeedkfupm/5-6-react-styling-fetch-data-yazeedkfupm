import React from 'react'
import { Card, Button } from 'react-bootstrap'

function UserCard({ user, onUserClick }) {
  return (
    <Card className="user-card shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-center mb-3">
          <div className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
            {user.name.charAt(0)}
          </div>
        </div>

        <Card.Title className="text-center">{user.name}</Card.Title>
        <Card.Text className="text-center">
          <strong>Username:</strong> {user.username}<br />
          <strong>Email:</strong> {user.email}<br />
          <strong>Phone:</strong> {user.phone}
        </Card.Text>
      onClick={() => onUserClick(user)}
      
      </Card.Body>
    </Card>
  )
}

export default UserCard
