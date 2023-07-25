import Login from "./Login";
import useLocalStorage from "../customHooks/useLocalStorage";
import Dashboard from "./Dashboard";
import ContactsProvider from "../customHooks/ContactsProvider";
import ConversationProvider from '../customHooks/ConversationProvider'
import SocketProvider from "../customHooks/SocketProvider";
function App() {
  const [id , setId] = useLocalStorage('id','')
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider >
           <ConversationProvider id={id}>
                <Dashboard id={id}/>
           </ConversationProvider>
      </ContactsProvider>
     </SocketProvider>
  )

  return (
    id ?  dashboard : <Login onSubmit={setId}/>
)}

export default App;
