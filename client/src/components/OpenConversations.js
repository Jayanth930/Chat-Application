import React, { useEffect, useRef, useState } from 'react'
import { Form, InputGroup , Button  } from 'react-bootstrap'
import { useCreateConversation } from '../customHooks/ConversationProvider'

export default function OpenConversations() {
    const [text , setText] = useState('')
    const lastItem = useRef()
    const {selectedConversation , showMessage} = useCreateConversation()
     
   
    function handleSubmit(e){
       e.preventDefault()
       showMessage(
          selectedConversation.receipients.map(r => r.id) , text
       )
       setText('')
      //  console.log(selectedConversation.receipients)
      
    }
    useEffect(()=>{
        // if (lastItem.current !== null) {
        //   lastItem.current.scrollIntoView({smooth : true})  
        // }
    },[selectedConversation.messages.length]) 
    
    return (
      <div className='d-flex flex-column flex-grow-1 '>
          <div className='flex-grow-1 overflow-auto '> 
              <div className='d-flex flex-column px-3'>
                 {selectedConversation.messages.map((message,index) => {
                    return (
                      <div ref={index === selectedConversation.messages.length-1 ? lastItem : null} key={index} className='d-flex flex-column my-1 align-items-start'>
                        <div className={`rounded p-2 text-white ${message.fromMe ? 'bg-success align-self-end' : 'bg-warning'} `}>
                        {message.message}
                        </div>
                        <div className={`text-muted small ${message.fromMe ? 'align-self-end' : ''}`}>
                        {message.fromMe? "You": message.SenderName}
                        </div>
                      </div>
                    )
                  })}
              </div>
           </div>
          <Form className='m-3'  onSubmit={handleSubmit}>
            <InputGroup >
                <Form.Control
                as='textarea'
                required
                value={text}
                onChange={e=> setText(e.target.value)}
                style={{resize : 'none' }}
                />
                <Button variant="primary" type='submit'>Send Message</Button>
            </InputGroup>
          </Form>
      </div>
    )
}


