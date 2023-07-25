

// Contacts Popup To create Contacts 

import {Modal ,  Form , Button } from 'react-bootstrap'
import { UseContacts } from '../customHooks/ContactsProvider'
export default function ContactModal({contactState}) {
  const {createContacts , setShowModal, idRef , nameRef} = UseContacts()
  function handleSubmit(e){
    e.preventDefault()
    createContacts(idRef.current.value , nameRef.current.value)
    setShowModal(false)
  }
  return (
    <>
      <Modal.Header closeButton>
          <Modal.Title>Add/Create Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" ref={idRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"  ref={nameRef} />
        </Form.Group>
        <Button variant="primary" type='submit' >Create</Button>
      </Form>
      </Modal.Body>
    </>
  )
}
