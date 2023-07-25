import React from 'react'
import { ListGroup} from 'react-bootstrap'
import {useCreateConversation} from '../customHooks/ConversationProvider'
export default function Conversations() {
  const {conversations , selectConversationIndex} = useCreateConversation()
  return (
    <>
       <ListGroup variant='flush' >
      {conversations.map((conversation , index)=>(
         <ListGroup.Item 
           key={index} 
           action // Just saying that it could be  Link or Button
           onClick={()=> selectConversationIndex(index)}
           active = {conversation.selected}
         >
            {conversation.receipients.map(r => r.name).join(',')}
         </ListGroup.Item>
      ))}
    </ListGroup>
    </>
  )
}

