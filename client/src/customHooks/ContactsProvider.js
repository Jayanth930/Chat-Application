import React, { useContext , useState, useRef } from 'react'
import useLocalStorage from './useLocalStorage'

const ContactsContext = React.createContext()

export function UseContacts(){
    return useContext(ContactsContext)
  }


export default function ContactsProvider({children}) {
  const [contacts , setContacts] = useLocalStorage('contacts',[])
  const [showModal , setShowModal] = useState(false)
  const idRef = useRef()
  const nameRef = useRef()
  function createContacts(id , name){
    setContacts(prevContacts=>{
       return  [...prevContacts , { id , name}]
    })
  }

  function EditContacts(newContacts , EditedContact){
    setContacts([...newContacts , EditedContact])
  }

  const output = { contacts , createContacts, setShowModal , idRef , nameRef , showModal , EditContacts }
  return (
    <ContactsContext.Provider value={output} >
        {children}
    </ContactsContext.Provider>
  )
}
