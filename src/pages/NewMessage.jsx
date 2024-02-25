import "./css/NewMessage.css"

import CloseIcon from "../assets/CloseIcon.png"
import DeleteIcon from "../assets/DeleteIcon.png"
import LockIcon from "../assets/LockIcon.png"
import EllipsisIcon from "../assets/EllipsisIcon.png"
import AttachmentIcon from "../assets/AttachmentIcon.png"
import TextEditor from "../assets/TextEditor.png"
import Spinner from "../assets/Spinner.svg"
import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { RiArrowDownSFill } from "react-icons/ri"
import axios from "axios"
import api from "../config/backend"

const NewMessage = ({ username, setPopup }) => {
    const [recipient, setRecipient] = useState("")
    const [subject, setSubject] = useState("")
    const [focused, setFocused] = useState(false)
    const [message, setMessage] = useState("\n\nSent with Swift Mail secure email.")
   
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(undefined)

    const handleSend = async () => {
        
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(undefined)
        }, 5000)

        return () => clearTimeout(timer)
    }, [notification])

    return  (
        <div className="messageContainer">
            <div className="header">
                <span>New Message</span>
                <div className="teemer-sons">
                    
                    <img onClick={() => setPopup(false)} src={CloseIcon} alt="" />
                </div>
            </div>
            <div className={"container"}>
                <div className="flamed-ibex">
                    <h2>From</h2>
                    <div className="lycra-rib">
                        <span>{username}@swift.in</span>
                        
                    </div>
                </div>
                <div className="flamed-ibex">
                    <h2>To</h2>
                    <div className={focused === "recipient" ? "muntings-deep focused" : "muntings-deep"}>
                        <input 
                            placeholder="Email address" 
                            value={recipient} 
                            onChange={e => setRecipient(e.target.value)} 
                            onFocus={() => setFocused("recipient")}
                            onBlur={() => setFocused(false)}
                        />
                       
                    </div>
                </div>
                <div className="flamed-ibex">
                    <h2>Subject</h2>
                    <div className={focused === "subject" ? "wiper-duct focused" : "wiper-duct"}>
                        <input 
                            placeholder="Subject" 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} 
                            onFocus={() => setFocused("subject")}
                            onBlur={() => setFocused(false)}
                        />
                    </div>
                </div>
                <div className="eloiners-pep">
                    
                </div>
                <div className="bides-aril">
                    <textarea value={message} onChange={e => setMessage(e.target.value)} />
                </div>
                {notification ? (
                    <div className="chiggers-cede">
                        {notification}
                    </div>
                ) : undefined}
            </div>
            <div className={"footer"}>
                
                <div>
                    
                    <div className="firebug-bum" onClick={() => handleSend()}>
                        {loading ? <img src={Spinner} alt="" /> : "Send"}
                        <div>
                            <RiArrowDownSFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewMessage
