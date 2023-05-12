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





function Signup(){

    const Navigate = useNavigate();
    
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [generated, setGenerated] = useState(false);
    const [otp, setOtp] = useState("");

    async function getUsers(){
        const dbref = ref(db);
        await get(child(dbref,"users/")).then((snapshot)=>{
          if(snapshot.exists()){
            var usrArray = snapshot.val().list;
            setUsers(usrArray);                
          }
        })
    }
    
    useEffect(()=>{
        getUsers();
        
        var val = Math.floor(1000 + Math.random() * 9000);
        setOtp(val);
      },[])

    
    async function generateOTP(){
        
        if(username.length<2 || password.length < 2 || number.length!=13 )
        alert("username.length<2 || password.length < 2 || number.length!=13");
        else
        {
            var exist=false;
            for (var i = 0; i < users.length; i++) {
                  if(users[i].un==username)
                  {
                        exist = true;
                        alert("Username already taken");
                        break;
                  }
                }
            }
            if(!exist)
            {
                // console.log(otp);
                // const url = 'https://inteltech.p.rapidapi.com/send.php';
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        number:number,
                    })
                };
                // const response = await fetch(url, options);
                // const result = await response.text();
                
                // console.log(result);
                await fetch("http://13.235.243.86:9000/sendotp",options).then((response)=>{
                    console.log(response);
                    return response.json();

                })
                .then((response)=>{
                    if(response.otp!="error")
                    {
                        setGenerated(true);
                        setOtp(response.otp);
                    }
                    else
                    {
                        alert("OTP generation failed");
                    }
                })
                .catch((e)=>{
                    alert("OTP service not available try again later");
                })

                
                
            }

        }
    
    var n =3;
    async function createAccount(){
            var o = document.getElementById("otp").value;
            if(o==otp)
            {
                
                
                users.push({
                    un:   username,
                    pw: password,
                    num:number
                });
                console.log(users);
                 update(ref(db, "users/"),{
                    list:users,
                })
                
                alert("Account successfully created");
                Navigate('/login');
            }
            else{
                n--;
                if(n>0)
                alert("Wrong OTP !! "+n+ "attempts left");
                else
                {
                    alert("Limit exceeded");
                    window.location.reload();
                }

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
                    <label for="number"><b>Contact No</b></label>
                    <input type="text" placeholder="Enter contact no" id='number' name="number" onChange={e=>setNumber(e.target.value)} />
                    <br/>
                    
                    <button onClick={generateOTP}>Generate OTP</button>
                    <br/>
                    {generated?(
                        <div>
                            <center>
                                <label for="otp"><b>OTP</b></label>
                                <input type="text" placeholder="Enter OTP" id='otp' name="otp"/>
                                <br/>
                                <button onClick={createAccount}>Create Account</button>
                            </center>
                        </div>
                    ):("")}
                    <h2>Dont have account?</h2>
                    <NavLink to="/login">Already have account? Login</NavLink>
                  </div>
              </center>
        </div>
    )
}

export default Signup;
