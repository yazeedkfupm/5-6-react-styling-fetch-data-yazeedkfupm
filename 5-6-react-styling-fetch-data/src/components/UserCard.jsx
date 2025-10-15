import React from 'react'
import { Card, Button } from 'react-bootstrap'

function UserCard({ user, onUserClick }) {
  return (
    <Card className="user-card text-center h-100">
      <Card.Body>
        <div>
          <div className="user-avatar">
            {user.name.charAt(0)}
          </div>
        </div>

        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {user.username}<br />
          <strong>Email:</strong> {user.email}<br />
          <strong>Phone:</strong> {user.phone}
        </Card.Text>
      
    <Button variant="primary" onClick={() => onUserClick(user)}>
    View Details
    </Button>

      </Card.Body>
    </Card>
  ) 
}

export default UserCard
