import Sidebar from "./Sidebar"
import { useCreateConversation } from "../customHooks/ConversationProvider"
import OpenConversations from "./OpenConversations"

export default function Dashboard({ id }) {
     const {selectedConversation} = useCreateConversation()
     return (
      <div className='d-flex' style={{height : '100vh'}}>
         <Sidebar id={id}/>
         {selectedConversation && <OpenConversations />}
      </div>
     )
   
  
}
