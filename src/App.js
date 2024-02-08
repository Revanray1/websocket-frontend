import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './styles/index.css';
import "./App.css";
import io from "socket.io-client";
import NameModal from "./component/modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io("https://websocketbackend-p7c9.onrender.com/");

function App() {
  const [name, setName] = useState("");
  const [isname, setIsName] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages(data);
    });
  }, [messages]);

  const handlesend = () => {
    showSuccessMessage()
    var time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const newMessage = [
      ...messages,
      {
        name: name,
        text: currentMessage,
        image: "https://i.imgur.com/HYcn9xO.png",
        time: `${hours}:${minutes}`,
      },
    ];
    setCurrentMessage("");

    setMessages(newMessage);
    socket.emit("message", newMessage);
  };
  const handleCurrentMessagetype = (e) => {
    setCurrentMessage(e.target.value);
  };

  const showSuccessMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showFailureMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  return (
    <> 
      <ToastContainer />
    
    {isname ? <NameModal setName={setName} setIsName={setIsName  }/> : 
    <div>
      <div class="menu">
        <div class="back">
          {/* <i class="fa fa-chevron-left"></i> */}
          <img src="https://i.imgur.com/DY6gND0.png" draggable="false" />
        </div>
        <div class="name">Welcome to Chat Group</div>
        {/* <div class="last">18:09</div> */}
      </div>
      <div>
      <div>
        {messages.length > 0 && (
          <ol className="chat">
            {messages.map((data, index) => {
              return (
                <li className={data.name === name ? "self" : "other"}>
                  <div className="avatar">
                    
                    <img src={data.image} draggable="true" alt="person-logo" />
                  </div>
                  <div className="msg">
                  <div><span>{data.name === name ? "" : `${data.name} : `}</span>{data.text}</div>

                    <time>{data.time ? data.time : "18.09"}</time>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
      <div>
        <input
          className="textarea"
          type="text"
          placeholder="Type here!"
          value={currentMessage}
          onChange={handleCurrentMessagetype}
        />
        <div class="emojis">
          <button
            type="button"
            className="btn btn-outline-info send-button"
            onClick={handlesend}
            value={currentMessage}
          >
            Send
          </button>
        </div>
      </div>
      </div>
      </div>
}
    </>
  );
}

export default App;
