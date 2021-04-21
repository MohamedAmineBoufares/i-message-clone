import React, {useEffect, useState} from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import Message from './Message'
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
import axios from './axios.js'
import Pusher from 'pusher-js';

const pusher = new Pusher('4d6e0c3fffd1de8e1636', {
    cluster: 'eu'
  });


function Chat() {
    
    
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const getConversation = (chatId) => {
        if (chatId) {
            axios.get(`/get/conversation?id=${chatId}`).then((res) => {
                setMessages(res.data[0].conversation)
            })
        }
    }

    useEffect (() => {
        pusher.unsubscribe('messages')
    
        getConversation(chatId)

        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getConversation(chatId)
        });

    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(`/new/message?id=${chatId}`, {
            message: input,
            timestamp: Date.now(),
            user: user
        })

        setInput("");
    };

    return (
        <div className='chat'>

        {/* chat header */}
            <div className='chat__header'>
                <h4>To:
                <span className='chat__name'> {chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>
        {/* chat messages */}

        <div className='chat__messages'>
            
            <FlipMove>
            {messages.map(({ user, _id, message, timestamp }) => (
            <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp} />
                ))}
            </FlipMove>
            
        </div>


        {/* chat input */}
            <div className='chat__input'>
                <form>
                    
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='ikteb hneye' type='text'/>
                        
                    <button onClick={sendMessage}>Send Message</button>
                
                </form>

                <IconButton>
                    <MicIcon className='chat__mic'/>
                </IconButton>
                

            </div>
        </div>
    )
}

export default Chat
