import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function UserModal({ show, user, onHide }) {
  if (!user) return null

  return (
       <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div
          className="user-avatar-large bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{ width: '100px', height: '100px', fontSize: '2rem' }}
        >
          {user.name.charAt(0)}
        </div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserModal
