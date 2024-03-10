import "./css/AccountsPopup.css"
import { IoIosArrowForward } from "react-icons/io"
import ExternalLink from "../assets/External.png"
import { useNavigate } from "react-router-dom"

const AccountsPopup = ({username, setPopup}) => {
    const navigate = useNavigate()

    const handleSignout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        navigate("/account/sign-in")
    }

    return (
        <div 
            className="_0gvl"
            onClick={() => setPopup(false)}
        >
            <div className="container" onClick={e => e.stopPropagation()}>
                <div>
                    <span>{username}</span>
                    <span>{username}@swift.in</span>
                </div>
               
                <div className="about">
                    
                    <div className="box">
                        Get help
                        <IoIosArrowForward />
                    </div>
                    
                </div>
                <div className="account-box">
                    
                    <button onClick={() => handleSignout()}>Sign out</button>
                </div>
            </div>
        </div>
    )
}

export default AccountsPopup
