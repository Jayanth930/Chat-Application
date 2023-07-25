import React, { useState } from 'react'
import { Button, ListGroup , Modal , Form } from 'react-bootstrap'
import { UseContacts } from '../customHooks/ContactsProvider'



export default function Contacts() {

  const {contacts , EditContacts} = UseContacts()
  const [showEditModal , setShowEditModal] = useState(false)
  const [contactState , SetContactState] = useState({})
     
  function handleClick(e , id ){
    const clickedContact = contacts.find((contact)=> id===contact.id  )
    SetContactState( prevValue =>{
      return {
         ...prevValue ,
         ClickedContactId : clickedContact.id ,
         ClickedContactName : clickedContact.name
    }})
    setShowEditModal(true)
    

  }

  function handleSubmit(e){
    e.preventDefault()
    const newContacts = contacts.filter((contact)=> contact.id!== contactState.ClickedContactId);
    EditContacts(newContacts , {id : contactState.ClickedContactId , name : contactState.ClickedContactName})
  }
  return (
    <>
    <ListGroup  variant='flush' >
      {contacts.map((contact)=>{
        return( 
        <ListGroup.Item className='d-flex mb-1 align-items-center justify-content-between text-bg-primary'  key={contact.id}>
        {contact.name}
        <Button variant='secondary' size='sm' onClick={(event)=>handleClick(event , contact.id )}>
        Edit
        </Button>
        </ListGroup.Item>
      )})}
    </ListGroup>
    <Modal show={showEditModal} onHide={()=> setShowEditModal(false)}>
      <Modal.Header closeButton>
            <Modal.Title>Add/Create Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" value={contactState.ClickedContactId} 
             onChange={(e)=> SetContactState(prevValue=>{ 
              return {
                  ...prevValue ,
                  ClickedContactId : e.target.value
                } })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"  value={contactState.ClickedContactName} 
              onChange={(e)=>SetContactState(prevValue=>{
                return {
                  ...prevValue ,
                  ClickedContactName : e.target.value
                }
              })}
            />
          </Form.Group>
          <Button variant="primary" type='submit' >Save Changes</Button>
        </Form>
        </Modal.Body>
    </Modal>
    {/* <ContactModal id={contactState.ClickedContactId} name={contactState.ClickedContactName}/> */}
   </>
  )
}
