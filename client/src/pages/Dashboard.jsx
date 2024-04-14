import "./css/Dashboard.css"
import Logo from "../assets/Logo.png"
import { BiSearch } from "react-icons/bi"
import { BsChevronRight, BsPlusLg } from "react-icons/bs"
import RefreshIcon from "../assets/Refresh.png"
import { useEffect, useState } from "react"
import AccountsPopup from "../components/AccountsPopup"
import Inbox from "../components/Inbox"
import EmptyFolder from "../components/EmptyFolder"
import NewMessage from "./NewMessage"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../config/backend"
import messageData  from "../config/messageData"
import messageData1 from "../config/messageSpam";
import messageData2 from "../config/Placement";
// import { useNavigate } from "react-router-dom"
const Dashboard = () => {
    const [popup, setPopup] = useState(false)
    const [activeSidebar, setActiveSidebar] = useState(0)
    const [accordian, setAccordian] = useState([])
    const [hovered, setHovered] = useState(false)
    const [compose, setCompose] = useState(false)
    const [unread, setUnread] = useState(0)
    const [starred, setStarred] = useState(0)
    const [database, setDatabase] = useState([])
    const [search,setSearch]=useState('');

    const navigate = useNavigate()

    let username = localStorage.getItem("username")

    if (username === null) {
        username = "undefined"
        navigate("/account/sign-in")
    }
    const sidebar = ["Inbox", "Sent"]
    const secondarySidebar= ["Archive", "Spam", "Trash", "All mail"]

    // const labels=["sadsa","dasdsa","dasdsa"]
     const [labels, setLabels] = useState(['Placement', 'Semester', 'CDC-Training']);

    const [newLabel, setNewLabel] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [constData, setConstData] = useState([]);

    const handleAddLabel = () => {
        setIsModalOpen(true);
    };
    const handleSearch=(e)=>{

        const xx=e.target.value;
        setSearch(xx);
        if(xx.trim()!==''){
            const filteredData = constData.filter(item => {
                const nikal = Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(xx.toLowerCase())
                );
                console.log(1,nikal);
                return nikal    ;
            });
            setDatabase(filteredData);
            console.log(2, filteredData, constData);
        }
        else{
            setDatabase(constData);
        }
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleClick=(label)=>{
        console.log(label);
        setActiveSidebar(label);
    }

    const handleModalSubmit = () => {
        if (newLabel.trim() !== '') {
            setLabels([...labels, newLabel]);
            setNewLabel('');
            setIsModalOpen(false);
        }
    };


    const Popup = () => {
        if (popup) {
            
            if (popup === "accounts") {
                return <AccountsPopup username={username} setPopup={setPopup} />
            }
            
        }
        
        return undefined
    }

    const expand = (box) => {
        setAccordian(prev => prev.includes(box) ? prev.filter(item => item !== box) : [...prev, box])
    }

    const imageLocation = (imageName, index) => {
        if (activeSidebar === index) {
            return require("../assets/" + imageName + "Active.png")
        }

        if (hovered === imageName.toLowerCase()) {
            return require("../assets/Hover/" + imageName + ".png")
        }

        return require("../assets/" + imageName + ".png")
    }

    const addSideBar=(buttonText)=>{
        console.log("hds");
    }

    useEffect(() => {
        let currentSidebar="Inbox";
        if(activeSidebar<4){
            currentSidebar=sidebar[activeSidebar];
        }
        else if(activeSidebar<8){
            currentSidebar=secondarySidebar[activeSidebar-4];
        }
        else{
            currentSidebar=labels[activeSidebar-8];
        }


        document.title = `${currentSidebar} | Swift Mail`;
        if(currentSidebar==="Spam"){
            setDatabase(messageData1);
            setConstData(messageData1);
        }
        else  if(currentSidebar==="Placement"){
            setDatabase(messageData2);
            setConstData(messageData2);
        }
        else{
             setDatabase(messageData);
             setConstData(messageData);
        }

        
    }, [activeSidebar])



    const handleSignout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        navigate("/account/sign-in")
    }

    return (
        <div className="navbarTop">
            {compose === true ? <NewMessage username={username} setPopup={setCompose} /> : undefined}
            <div className="navbar">
                <div className="logo-caret">
                    <img src={Logo} alt="" />
                    
                    
                </div>
                <p>Swift</p><p>Mail</p>
                <div className="upgrade-container">
                    
                    <div className="search-box" >
                        <input value={search} onChange={handleSearch}  type="text" name="" id="" className="searchbar" placeholder="Search Messages"/>
                    </div>
                    <div>
                        
                        
                    </div>
                </div>
                <div 
                    className="accounts"
                    onClick={() => setPopup("accounts")}
                >
                    
                    <div>
                        <span>{username}</span>
                        <span>{username}@swift.in</span>
                    </div>
                    <button className="buttonsign" onClick={() => handleSignout()}>
                      Sign out
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="crash-doe">
                    <button onClick={() => setCompose(prev => !prev)}>Compose Mail</button>
                    {sidebar.map((item, index) => (
                        <div key={index}
                             className={activeSidebar === index ? "recode-hang active" : "recode-hang"}
                             onClick={() => setActiveSidebar(index)}
                             onMouseEnter={() => setHovered(item.toLowerCase())}
                             onMouseLeave={() => setHovered(false)}
                        >
                            <img src={imageLocation(item, index)} alt=""/>
                            {item}
                            {activeSidebar === index ?
                                <img className="iambic-het" src={RefreshIcon} alt=""/> : undefined}
                            {item === "Inbox" ? (
                                <span
                                    className={activeSidebar === 0 ? "textState" : "textState inactive"}>{unread}</span>
                            ) : undefined}
                            {   item === "Starred" ? (
                                <span
                                    className={activeSidebar === 3 ? "griffins-bad" : "griffins-bad inactive"}>{starred}</span>
                            ) : undefined}
                        </div>
                    ))}
                    <div className="box1">
                        <div className={accordian.includes("more") ? "active" : undefined}>
                            <div
                                className={accordian.includes("more") ? "goaded-nus active" : "goaded-nus"}
                                onClick={() => expand("more")}
                            >
                                <BsChevronRight/>
                                {accordian.includes("more") ? "LESS" : "MORE"}
                            </div>
                        </div>
                        {accordian.includes("more") ? (
                            <div className="taskers-ten">
                                {secondarySidebar.map((item, index) => {
                                    return (
                                        <div
                                            className={activeSidebar === index + 4 ? "rebater-foe active" : "rebater-foe"}
                                            onClick={() => setActiveSidebar(index + 4)}
                                            onMouseEnter={() => setHovered(item.toLowerCase())}
                                            onMouseLeave={() => setHovered(false)}
                                        >
                                            <img src={imageLocation(item, index + 4)} alt=""/>
                                            {item}
                                        </div>
                                    )
                                })}


                            </div>
                        ) : undefined}


                    </div>


                    <div className="box2">
                        <h2 className={"recode-hang"}>Labels</h2>
                        <div className={"labels-container"}>
                            {labels.map((label, index) => (
                                <div key={index} className="label-item">
                                    <button onClick={()=>{setActiveSidebar(index+8)}} className={"button123"}>{label}</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddLabel}>Add Label</button>

                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Add Label</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter new label"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                    />
                                    <button onClick={handleModalSubmit}>Add</button>
                                    <button onClick={handleModalClose}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {database.length ?
                    <Inbox
                        username={username}
                        unread={unread}
                        setUnread={setUnread}
                        starred={starred}
                        setStarred={setStarred}
                        sidebar={activeSidebar}
                        database={database}
                        setDatabase={setDatabase}
                    /> : <EmptyFolder/>}

            </div>
        </div>
    )
}

export default Dashboard
