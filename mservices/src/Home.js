import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {getDatabase, get, ref, set, child, update, remove} from "firebase/database";
import { initializeApp } from "firebase/app";
import './Home.css';
const firebaseConfig = {
  apiKey: "AIzaSyCoSfBkQF49hK22a8hWfbvL0p98I50ADU0",
  authDomain: "chatroomdcc.firebaseapp.com",
  projectId: "chatroomdcc",
  storageBucket: "chatroomdcc.appspot.com",
  messagingSenderId: "986857909615",
  appId: "1:986857909615:web:56e2d0a83ccf3fb72d0c9a"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();


function Home(){
    const Navigate = useNavigate();
    if(window.name=="")
    Navigate('/login');
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    async function getChat(){
        const dbref = ref(db);
        get(child(dbref,"messages/")).then((snapshot)=>{
          if(snapshot.exists()){
            var data = snapshot.val().list;
            const images = data.map((item, i) => {
                var check =false;
                if(item.un == window.name)
                check=true;
                    return (
                        <div>
                        {check ?(
                            <div className="container1">
                            {item.un} : {item.msg}
                        </div>
                        ):(
                            <div className="container">
                            {item.un} : {item.msg}
                        </div>
                        )}
                        </div>
                    );
              });
            setChat(images);                
          }
        })
    }

    useEffect(()=>{
        getChat();
      },[])

    setInterval(() => {
        getChat()
    }, 3000);

    var data;

    async function send(){
        const dbref = ref(db);
        await get(child(dbref,"messages/")).then((snapshot)=>{
            data = snapshot.val().list; 
        })
        data.push({
            un:window.name,
            msg:message
        })
        await update(ref(db, "messages/"),{
            list:data,
        })
        document.getElementById("message").value="";
    }

    async function getDefination(){
        var word = document.getElementById('word').value;
        if(word!="")
        {
            const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '10e8fd0a24mshf748a1ac786c18cp178f6djsnf843fbe55c55',
                    'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.text();
            var n=result.length;
            console.log(result.substring(n-5,n-1));
            if(result.substring(n-5,n-1)=="true")
            {
                var s="";
                var cnt=0;
                for(var i=0;i<n;i++){
                    if(result[i]=='"')
                    cnt++;
                    if(cnt==3)
                    {
                        s+=result[i];
                        //console.log(result[i]+"h");
                    }
                }
                alert("Meaning : "+s);
            }
            else
            {
                alert("Enter valid word");
            }
            
        }
        else
        {
            alert('cannont get defination of null');
        }
        
    }

    return(
        <div>
            <div>   <h2>CHAT ROOM - Logged in as {window.name}        <NavLink to="/login">Logout</NavLink></h2>       </div>
            <div>{chat}</div>
            <div>
                <label for="message"><b>Name</b></label>
                <input type="text" placeholder="Enter messgae" name="message" id='message' onChange={e=>setMessage(e.target.value)} />
                <button onClick={send}>Send</button>
            </div>
            <div>
                <label for="word"><b>Word</b></label>
                <input type="text" placeholder="Enter word" name="word" id='word'/>
                <button onClick={getDefination}>Send</button>
            </div>
        </div>
    )
}

export default Home;