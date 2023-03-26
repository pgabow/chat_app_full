import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chats from 'components/Chats'

const socket = io.connect('http://localhost:3001')
const App = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Заходите</h3>
          <input
            type='text'
            placeholder='Имя'
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <input
            type='text'
            placeholder='ID чата'
            onChange={(event) => {
              setRoom(event.target.value)
            }}
          />
          <button onClick={joinRoom}>Вперед</button>
        </div>
      ) : (
        <Chats socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default App
