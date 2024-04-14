import "./css/Inbox.css";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiLockFill } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineMarkunread } from "react-icons/md";
import MessageIcon from "../assets/Header/Inbox.png";
import ConversationsIcon from "../assets/ConversationsIcon.png";
import ConversationImage from "../assets/ConversationImage.png";

import StarFilled from "../assets/StarFilled.png";
import FireIcon from "../assets/Header/Spam.png";
import DeleteIcon from "../assets/Header/Trash.png";
import BucketIcon from "../assets/Header/Bucket.png";
import FolderIcon from "../assets/Header/Folder.png";
import LabelIcon from "../assets/Header/Label.png";

import MailboxHover from "../assets/Hover/Mailbox.png";
import SpamHover from "../assets/Hover/Fire.png";
import TrashHover from "../assets/Hover/Delete.png";
import BucketHover from "../assets/Hover/Bucket.png";
import LabelHover from "../assets/Hover/Label.png";
import FolderHover from "../assets/Hover/Folder.png";
import BucketBlue from "../assets/Blue/Archive.png";
import TrashBlue from "../assets/Blue/Trash.png";

import InvertedMailbox from "../assets/Blue/MailboxInverted.png";

import axios from "axios";


const Inbox = ({
  username,
  unread,
  setUnread,
  setStarred,
  sidebar,
  database,
  setDatabase,
}) => {
  const [checkbox, setCheckbox] = useState(false);
  const [activeRead, setActiveRead] = useState(0);
  const [messages, setMessages] = useState([]);

  const [activeMessage, setActiveMessage] = useState(false);

  const [notification, setNotification] = useState(undefined);
  const [undoAction, setUndoAction] = useState(undefined);
  const [openedEmail, setOpenedEmail] = useState(undefined);



  const messageSelector = ["All", "Read", "Unread"];
  const sidebarNames = [
    "Inbox",
   
    "Sent",
   
    "Archive",
    "Spam",
    "Trash",
    "All mail",
  ];
  const headerButtons = [
    MessageIcon,
    DeleteIcon,
    BucketIcon,
    FireIcon,
    FolderIcon,
    LabelIcon,
  ];
  const headerButtonsHovered = [
    MailboxHover,
    TrashHover,
    BucketHover,
    SpamHover,
    FolderHover,
    LabelHover,
  ];

  const selectedEmail = messages.find((item) => item.hash === openedEmail);


  useEffect(() => {
    

    // Inbox
    if (sidebar === 0 && database.length) {
      // Ignores previous fetched databse of other location
      if (database[0].location === "Inbox") {
        // Set unread messages count
        const notread = database.filter((message) => message.read === false);

        setUnread(notread.length);

        // Set starred count
        const starred = database.filter((message) => message.starred === true);

        setStarred(starred.length);
      }
    }

    // Filter read or unread messages
    if (activeRead === 0) {
      setMessages(database);
    } else {
      setMessages(
        database.filter((message) => {
          return activeRead === 1
            ? message.read === true
            : message.read === false;
        })
      );
    }
  }, [activeRead, database, sidebar]);

  useEffect(() => {
    let timeout;

    if (notification) {
      timeout = setTimeout(() => {
        setNotification(undefined);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [notification]);

  

  const options = { year: "numeric", month: "long", day: "numeric" };

 


  return (
    <div className="_7ohc">
      
      <div className="sacrum-pass">
        <div className="header">
          <div
            className={checkbox ? "checkbox active" : "checkbox"}
            onClick={() => setCheckbox((prev) => !prev)}
          >
           
          </div>
          <IoMdArrowDropdown />
          
        </div>
        <div className="container">
          <div>
            <div className="pryers-seas">
              {/* <div>
                {messageSelector.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveRead(index)}
                      className={activeRead === index ? "active" : undefined}
                    >
                      {item}
                    </button>
                  );
                })}
              </div> */}
              <div>
                
              </div>
            </div>
            <div className="message-container">
              {messages.map((item, index) => {
                return (
                  <div
                    key={item.hash}
                    className={
                      item.read === false
                        ? "toked-brin"
                        : "across-wash toked-brin"
                    }
                  >
                    <div
                      className={
                        openedEmail === item.hash
                          ? "voidness-bam active"
                          : "voidness-bam"
                      }
                      onClick={() => setOpenedEmail(item.hash)}
                      onMouseEnter={() => setActiveMessage(item.hash)}
                      onMouseLeave={() => setActiveMessage(false)}
                    >
                      {checkbox === true ? (
                        <div className="wangle-bit avatar">
                          <BsCheck2 />
                        </div>
                      ) : (
                        <div className="avatar">
                          {item.from[0].toUpperCase()}
                        </div>
                      )}
                      <div className="appeared-hut">
                        <h3>
                          {item.location === "Sent"
                            ? `${item.to}@swift.in`
                            : item.from[0].toUpperCase() + item.from.slice(1)}
                        </h3>
                        <span>{item.subject.slice(0, 35)}</span>
                      </div>
                      <div className="subnode-ten">
                        <span>
                          {item.date}
                        </span>
                        <div>
                          {item.starred === true ? (
                            <img src={StarFilled} alt="" />
                          ) : undefined}
                        </div>
                      </div>
                      {activeMessage === item.hash ? (
                        <div
                          className="soothers-sac"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="crisis-sons">
                            {item.read === false ? (
                              <img
                                
                                className="psalmed-vast"
                                src={
                                  openedEmail === item.hash
                                    ? InvertedMailbox
                                    : MessageIcon
                                }
                                alt=""
                              />
                            ) : (
                              <MdOutlineMarkunread
                                
                              />
                            )}
                          </div>
                          <div
                            className="crisis-sons"
                            
                          >
                            <img
                              className="psalmed-vast"
                              src={
                                openedEmail === item.hash
                                  ? TrashBlue
                                  : DeleteIcon
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className="crisis-sons"
                            
                          >
                            <img
                              src={
                                openedEmail === item.hash
                                  ? BucketBlue
                                  : BucketIcon
                              }
                              alt=""
                            />
                          </div>
                         
                        </div>
                      ) : undefined}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {openedEmail ? (
            <div className="tweedier-ids">
              <div className="container">
                <h4>{selectedEmail.subject}</h4>
                <div className="box">
                  <div className="chlorins-oats">
                    <strong>From</strong>
                    <div className="ketone-dial">
                      <RiLockFill />
                      <span>{selectedEmail.from}</span>
                      <span>{`<${selectedEmail.from}@swift.in>`}</span>
                    </div>
                    <span className="keynote-dzos">{selectedEmail.date}</span>
                  </div>
                  <div className="malty-cabs">
                    <strong>To</strong>
                    <span>{selectedEmail.to}@swift.in</span>
                    <BiChevronDown className="vermis-etch" />
                  </div>
                  <div className="phenom-ore">
                    </div>
                  <div className="kneecap-data">{selectedEmail.body}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="canned-copy">
              <div>
                {sidebar === 0 ? (
                  <>
                    <h1>
                      Welcome {username[0].toUpperCase()}
                      {username.slice(1)}
                    </h1>
                    <span>
                      You have <strong>{unread} unread conversations</strong> in
                      your inbox.
                    </span>
                    <img src={ConversationsIcon} alt="" />
                  </>
                ) : (
                  <>
                    <h1 className="tinning-him">{sidebarNames[sidebar]}</h1>
                    <span className="recast-sard">
                      You have <strong>{messages.length} messages</strong>{" "}
                      stored in this folder
                    </span>
                    <img
                      className="devoices-evil"
                      src={ConversationImage}
                      alt=""
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
