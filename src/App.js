import io from "socket.io-client";
import { useEffect, useState } from 'react';

//Anh thay cái domain chỗ này giúp em
const socket = io.connect("http://dipor.localhost:3001/")

// const socket = io.connect("http://192.168.10.106:8888", {
//   auth: {
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOCwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wOFQwMzoyNjo0MC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0xMFQxNToyMzo1OC4wMDBaIiwiaXNEZWxldGVkIjpmYWxzZSwidXNlck5hbWUiOiIxMjM0NTY3ODkwIiwicGFzc3dvcmQiOiIkMmEkMTAkWXFyaGk5Y1E1MVVjUXY0VU9ydzdULndBUWpwYnFUbi9ncGtSZFZML3d0VzFFZVE1aXFmbXkiLCJwYXNzd29yZERlY29kZSI6IjEyMzQ1NkFhIiwiaG90ZWxJZCI6MiwibmFtZSI6IueUsOS4reiXpOeUsOaZuuS5nyIsIm5pY2tOYW1lIjoibmlja25hbWUwMSIsImRheU9mQmlydGgiOiIyMDAwLTAyLTAxVDE3OjAwOjAwLjAwMFoiLCJsYXN0U2VlbiI6IjIwMjMtMDMtMTBUMTU6MjM6NTkuMDAwWiIsImF2YXRhciI6Imh0dHBzOi8vaW1nLmZyZWVwaWsuY29tL3ByZW1pdW0tdmVjdG9yL21hbi1hdmF0YXItcHJvZmlsZS1yb3VuZC1pY29uXzI0NjQwLTE0MDQ0LmpwZz93PTIwMDAifSwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNjc5NDY4NDExLCJleHAiOjE2Nzk1NTQ4MTF9.bhvoGZFQIcboPzWo1XPJ2eGgJyrD_xUgsUKvUBdcy0k"
//   }
// })

function App() {
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  const sendMessage = async () => {
    socket.emit("send-message", {
      hotelId: "2",
      receptionistId: 7,
      content: message
    })
    // setList([...list, message])
  }
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on('receive-message', (data) => {
      console.log(data)
      // setList([...list, data.content])
    })
  }, [])


  const joinRoom = () => {
    console.log(socket);
    socket.emit("join", {
      role: "ADMIN",
      id: 7,
      companyId: 1
    })
  }

  const UPDATE = () => {
    console.log(socket);
    socket.emit("update-seen", { onRoom: true })
  }

  return (
    <>
      <button type="button" onClick={joinRoom}>Join</button>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={sendMessage}>Send</button>
      <button type="button" onClick={UPDATE}>Update</button>

      <div>
        {list?.map((item, index) => {
          return (
            <div key={index}>
              {item}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
