import React, { useState } from 'react'
import {Button, Modal, Nav , Tab  } from 'react-bootstrap';
import Conversations from './Conversations'
import Contacts from './Contacts';
import ConversationModal from './ConversationModal';
import ContactModal from './ContactModal';
import { UseContacts } from '../customHooks/ContactsProvider';



const CONVERSATIONS = 'Conversations'
const CONTACT = 'Contacts'


export default function Sidebar({ id }) {

    const [key , setKey] = useState(CONVERSATIONS)
    const {showModal,setShowModal} = UseContacts()
    const conversationsopen = key === CONVERSATIONS

  
  return (
    <div className='d-flex flex-column border-right' style={{width : '250px' }} >
      <Tab.Container  defaultActiveKey={CONVERSATIONS} activekey={key} onSelect={setKey} >
          <Nav variant="tabs" className="justify-content-center" fill>  
            <Nav.Item>
              <Nav.Link eventKey={CONVERSATIONS}>Conversations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={CONTACT}>Contacts</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className='overflow-auto flex-grow-1'>
            <Tab.Pane eventKey={CONVERSATIONS}><Conversations /></Tab.Pane>
            <Tab.Pane eventKey={CONTACT}><Contacts /></Tab.Pane>
          </Tab.Content>
      <div className=' p-2 border-top border-right small'>
        Your id : <span className='text-muted'>{id}</span>
      </div>    
      </Tab.Container>
      <Button onClick={()=> setShowModal(true)} className='border-radius-0'>New {conversationsopen ? 'Conversation' : 'Contact'}</Button>
      <Modal show={showModal} onHide={()=> setShowModal(false)}>
         {conversationsopen? <ConversationModal setShowModal={setShowModal}/> : <ContactModal setShowModal={setShowModal} />}
      </Modal>
    </div>
  )
}
