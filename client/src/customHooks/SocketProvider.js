import React , {useContext , useEffect , useState } from 'react'
import {io} from 'socket.io-client'

const socketContext = React.createContext()

export function useSocket(){
    return useContext(socketContext)
}

export default function SocketProvider({children , id }) {
   const [socket , setSocket] = useState() 

   useEffect(()=>{
     const newSocket = io('http://localhost:3005',{
      query : {id} 
     })
     setSocket(newSocket)
    

     return () => {
      console.log('Removed Last Connection')
      newSocket.close()
     }
     },[id])
  return (
    <socketContext.Provider value={socket}>
       {children}
    </socketContext.Provider>
    
  )
}
