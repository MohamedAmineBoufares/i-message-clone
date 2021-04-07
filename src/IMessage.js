import React from 'react';
import './IMessage.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function IMessage() {
    return (
        
        <div className='imessage'>
        {/* sidebar */}
        
        <Sidebar/>
        
        
        {/* chat */}
        <Chat/>
        </div>
    )
}

export default IMessage
