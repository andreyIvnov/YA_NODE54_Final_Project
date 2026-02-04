import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRegisteredUser } from '../services/AuthAPI'
import { useDispatch, useSelector } from 'react-redux';

function login() {
    const [userAuthData, setUserAuthData] = useState({ username: '', email: '' })
    const [showMessage, setShowMessage] = useState(false)
    const [messageToShow, setMessageToShow] = useState("")
    const currentUser = useSelector((state) => state.userReducer.currentUser);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && sessionStorage.token) {
            navigateTo('/home')
        }
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserAuthData({ ...userAuthData, [name]: value })
    }

    const login = async () => {
        try {
            if (userAuthData && userAuthData.username && userAuthData.email) {
                const { data } = await getRegisteredUser(userAuthData.username, userAuthData.email);
                if (data && data.token && data.user) {
                    sessionStorage.token = data.token;
                    dispatch({ type: 'SET_USER', payload: data.user })
                    navigateTo('/home')
                } else {
                    // console.log("Response of login:", JSON.stringify(data));
                    setMessageToShow(data.message)
                    console.log("Response of login:", data);
                    setShowMessage(!showMessage)
                    setTimeout(() => { setShowMessage(false) }, 4000)
                }
            } else {
                setMessageToShow("One or more required fields is incorrect");
                setShowMessage(!showMessage)
                setTimeout(() => { setShowMessage(false) }, 4000)
            }
        } catch (error) {
            setMessageToShow("Error on login: " + error.message + ". " + error.response?.data?.message)
            console.error("Error on login: " + error.message + ". " + error.response?.data?.message);
            console.error(error);
            setShowMessage(!showMessage)
            setTimeout(() => { setShowMessage(false) }, 4000)
        }
    }

    return (
        <>
            <div>login</div>
            <div>
                <input onChange={handleInputChange} placeholder='Username' type="text" name="username" /><br />
                <input onChange={handleInputChange} placeholder='Email' type="email" name="email" /><br />
                {showMessage &&
                    <>
                        <div style={{ color: 'red', textAlign: 'left' }}>
                            <strong>
                                {messageToShow}
                            </strong>
                        </div><br /><br />
                    </>
                }
                <button onClick={login}>Logn</button>
            </div>
        </>
    )
}

export default login