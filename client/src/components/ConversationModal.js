import { Modal ,  Form , Button } from "react-bootstrap"
import { UseContacts } from "../customHooks/ContactsProvider" 
import {  useState } from "react"
import { useCreateConversation } from '../customHooks/ConversationProvider'
export default function ConversationModal({setShowModal}) {
  const [selectedContactIds , setSelectedContactIds] = useState([])
  const {createConversation} = useCreateConversation()
  function handleSubmit(e){
     e.preventDefault()
    
     createConversation(selectedContactIds)
     setShowModal(false)
  }
 
  function handleChange(e){
    //  console.log(e.target.checked , e.target.value)
    const checkedId = e.target.value
    if (e.target.checked){
      setSelectedContactIds(prevIds => [...prevIds , checkedId])
    }else{
      setSelectedContactIds(prevIds => (
        prevIds.filter(id => (  id!==checkedId ))
      ))
    }
   
  }
  const {contacts} = UseContacts()
  return (
        <>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {contacts.map((contact)=>(
                <Form.Group className="mb-3" controlId="formBasicCheckbox" key={contact.id}>
                   <Form.Check type="checkbox" label={contact.name}  value={contact.id} onChange={handleChange}/>
                </Form.Group>
              ))}
              <Button variant="primary" type="submit">Create Conversation</Button>
            </Form>
            <Modal.Footer>{selectedContactIds}</Modal.Footer>
        </Modal.Body>
        
        </>
  )
}
