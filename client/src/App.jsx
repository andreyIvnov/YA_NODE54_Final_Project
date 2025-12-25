import axios from 'axios';
import './App.css'

function App() {

  const login = async () => {
    const {data} = await axios.post("http://localhost:3000/auth/login");
    console.log(data);
    
  }

  return (
    <>
      <div>
        App:P
        <button onClick={login}>Login</button>
      </div>
    </>
  )
}

export default App
