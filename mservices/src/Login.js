import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {getDatabase, get, ref, set, child, update, remove} from "firebase/database";
import { initializeApp } from "firebase/app";
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


function Login(){
    window.name="";
    const Navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function getUsers(){
        const dbref = ref(db);
        get(child(dbref,"users/")).then((snapshot)=>{
          if(snapshot.exists()){
            var usrArray = snapshot.val().list;
            console.log(usrArray);
            setUsers(usrArray);                
          }
        })
    }

    useEffect(()=>{
        getUsers();
      },[])


      function login(){
        if(username=="" || password=="")
        alert("Username and Password cannot be blank !!");
    
        else
        {
          var logged =false;
          for (var i = 0; i < users.length; i++) {
            
            
              if(users[i].un==username && password==users[i].pw)
              {
                    window.name=username;
                    logged = true;
                    break;
              }
          }
          if(logged)
          Navigate('/home');
          else
          alert("Username or Password is incorrect");
        }
      }

    return(
        <div>
            <center>
                  <div className='contaier'>
                    <h1>Login</h1>
                    <br/>
                    <label for="username"><b>Name</b></label>
                    <input type="text" placeholder="Enter userName" name="username" id='username' onChange={e=>setUserName(e.target.value)} />
                    <br/>
                    
                    <br/>
                    <label for="password"><b>Password</b></label>
                    <input type="text" placeholder="Enter password" id='password' name="password" onChange={e=>setPassword(e.target.value)} />
                    <br/>
                    <button onClick={login}>Login</button>
                    <br/>
                    <h2>Dont have account?</h2>
                    <NavLink to="/signup">signUp</NavLink>
                  </div>
              </center>
        </div>
    )
}

export default Login;

