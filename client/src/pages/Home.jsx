import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import downloadAllData from '../utils/downloadAllData';

function Home() {
    const [logedUser, setlogedUser] = useState(useSelector((state) => state.userReducer.currentUser))
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            console.log("Fetch all data");
            
            const res = await downloadAllData(dispatch);
            if (res && res.includes("jwt expired")) {
                logOut();
            } else {
                navigateTo('employees')
            }
        }
        fetchAllData()
    }, [])


    const navItems = [
        { label: 'Employees', path: 'employees' },
        { label: 'Departments', path: 'departments' },
        { label: 'Shifts', path: 'shifts' },
        { label: 'Users', path: 'users' },
    ];

    const logOut = () => {
        dispatch({ type: "LOGOUT" })
        sessionStorage.removeItem("token");
        navigateTo('/')
    }

    return (
        <>
            <div style={{ border: '2px solid green' }}>
                <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '5px 5px 5px 5px' }}>
                    Hi, {logedUser.name}
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path}>
                            {item.label}
                        </Link>
                    ))}
                    <button onClick={logOut}>LogOut</button>
                </nav>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home