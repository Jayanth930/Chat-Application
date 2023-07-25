import React, { useContext, useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { UseContacts } from './ContactsProvider'  // This is useful for determining Names and OtherPurposes 
import { useSocket } from './SocketProvider'
const ConversationsContext = React.createContext()

export function useCreateConversation(){
  return useContext(ConversationsContext)
  }


export default function ConversationProvider({children , id}) {
  const { contacts } = UseContacts()
  const [conversations , setConversations] = useLocalStorage('conversations',[])
  const [selectedIndex , setSelectedIndex] = useState(0)
  const socket = useSocket()
  function createConversation(receipients  /* Receipents per conversation And its a Array having their ids */){
    setConversations(prevConversations=>{
        return  [...prevConversations , { receipients , messages:[] } ]
    })
  }
function addMessageToConversation({receipients , message , senderId}){   // We implemented another function so that it can takecare of Server Part as well
  // Already exists for Sender and  new Conversation (might be) for Other People or (Reaceiver)
  // How to say its made change 
  // For that we need to check if this conversation(receipients) already exits
  setConversations(prevConversations => {
    let madeChange = false 
    const newMessage = {senderId , message }
    const newConversation = prevConversations.map(conversation=>{
      if (arrayEquality(conversation.receipients , receipients)){
        madeChange = true
        return {
          ...conversation ,
          messages : [...conversation.messages , newMessage]
        }
      }
      return conversation
    })
    
    if(madeChange){   
      return newConversation
    }
    return [
      ...prevConversations ,
      {receipients , messages : [newMessage]}
    ]
  })
}

// This is for Receive message 
useEffect(()=>{
  console.log('Receive message from server')
  if (socket === undefined ) {
    console.log('socket is empty')
    return
  } 
  socket.on('receive-message',({receipients , sender , text},cb)=>{
    cb('Able to go into it ')
    console.log({receipients , sender , text});
    addMessageToConversation({receipients , message : text , senderId : sender})
  })
  return () => socket.off('receive-message')
  // eslint-disable-next-line
})


function displayMessage(membersIds, message){
      console.log('Displaying Memberids To whom i need to send',membersIds)
      socket.emit('send-message',{receipients : membersIds , text : message})
      addMessageToConversation({receipients : membersIds , message , senderId : id})
}
 // For displaying Conversations and Names across different Users we will Take formatted ConersationsList 
  const formattedConversationList = conversations.map((conversation , index)=>{
    const receipients = conversation.receipients.map(receipientId => {
        const contact = contacts.find((contact)=>{
            return receipientId === contact.id
        })
        let name = ''
        if (contact && contact.name){
           name =  contact.name
           return {id : receipientId , name}
        }
       name = receipientId
      return { id : receipientId  , name  }
    })
    const selected = (index === selectedIndex)
    const messages = conversation.messages.map(message => {
        const contact = contacts.find((contact)=>{
           return contact.id  === message.senderId
        }) 
        const name = (contact && contact.name) || message.senderId
        const fromMe = id === message.senderId
        return { ...message , senderName : name , fromMe}
    })
   return {...conversation , messages , receipients, selected}
  })  
  const output = {
    conversations : formattedConversationList ,
    selectedConversation : formattedConversationList[selectedIndex] ,
    selectConversationIndex : setSelectedIndex ,
    showMessage : displayMessage ,
    createConversation
  }
  return (
    <ConversationsContext.Provider value={output}>
        {children}
    </ConversationsContext.Provider>
  )
}


function arrayEquality(a,b){
  if (a.length !== b.length) return false
  a.sort()
  b.sort()
  return a.every((element , index)=>{
    return element === b[index]
  })
  // It returns whether Array (sendersIds and prevConversationsIds) equals or not  
}