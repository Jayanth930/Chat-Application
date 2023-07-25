import { useRef } from 'react';
import {Container,Button,Form} from 'react-bootstrap';
import { v4 as uuidV4 }  from 'uuid'
function Login( { onSubmit } ) {
  const idRef = useRef()
  function handleSubmit(e){
    // This id should be used accross the Application
    e.preventDefault()
    onSubmit(idRef.current.value)
  }
  function handleClick(){
     onSubmit(uuidV4())
  }
  return (
    <Container className='align-items-center d-flex' style={{height : '100vh', width : '40vw'}}>
      <Form className='w-100' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontSize : '1.2rem'}}>Enter Your Id</Form.Label>
            <Form.Control ref={idRef} type="text"  required />
        </Form.Group>
        <Button style={{ marginRight : '10px'}} variant="primary" type='submit'>Login</Button>
        <Button variant="secondary" onClick={handleClick} > Create A New Id</Button>       
     </Form>
    </Container>
  );
}

export default Login;