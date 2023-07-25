import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key , initialvalue) {
  const prefixedkey = `${PREFIX}${key}`
  const [value , setValue] = useState(()=>{
    const jsonvalue = localStorage.getItem(prefixedkey)
    if (jsonvalue!== null) return  JSON.parse(jsonvalue) 
    if ( typeof initialvalue === 'function' ) return initialvalue()
    else return initialvalue
  })
  
  useEffect(()=>{
     localStorage.setItem(prefixedkey , JSON.stringify(value))
  },[prefixedkey , value])

  return [value , setValue]
}
