import React, { useState } from "react";
import './input.css'
function Input (props)
{
    const [state, setState] = React.useState({
        username: "",
        email:"",
        password:""
      })
    
      var errMsg = ""

    const inputList = [
        {
            type : "text",
            label : "Enter your username",
            placeholder : "your Username",
            datatestid : 'username'
        },
        {
            type : "email",
            label : "Enter your email",
            placeholder : "Your Email",
            datatestid : 'email',
        },
        {
            type : "password",
            label : "Enter your password",
            placeholder : "your Password",
            datatestid : 'password'
        },
    ]
    function handelChange(stateName,event)
    {
        document.getElementById([stateName]+"-id").style.borderColor="#ccc"
        // console.log(stateName,event.target.value)
        setState({[stateName]: event.target.value});
        // console.log(state)
    }
    function validation(stateName,event)
    {
        // console.log(stateName)
        if(event.target.value === "")
        {
            if(stateName === "username")
                errMsg="Please Fill the column"
            if(stateName === "email")
                errMsg="Invalid Email"
            if(stateName === "password")
                errMsg="Please Fill the password"

            document.getElementById([stateName]).innerHTML=errMsg
            document.getElementById([stateName]+"-id").style.borderColor="red"
        }

        else if(stateName === "email")
        {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!event.target.value.match(mailformat))
            {
                document.getElementById([stateName]).innerHTML="Invalid Email"
                document.getElementById([stateName]+"-id").style.borderColor="red"
            }
        }

        else if(stateName === "password")
        {
            let strength = []
            let a = state.password;
            for(let i=0;i<a.length;i++)
            {
                if('A' <= a[i] && a[i] <= 'Z')
                    strength[0]=1
                else if('a' <= a[i] && a[i] <= 'z')
                    strength[1]=1
                else if('0' <= a[i] && a[i] <= '9')
                    strength[2]=1
                else 
                {
                    strength[3]=1
                }
            }
            var passwordStrength=strength.reduce((prev, curr) => prev + curr, 0);
            // console.log(strength)
            // console.log(state.password)
            var passwordMsg = ""
            var color =""
            if(passwordStrength === 1)
            {
                passwordMsg = "Weak"
                color = "red"
            }
            else if(passwordStrength === 2)
            {
                passwordMsg = "Good"
                color = "orange"
            }
            else if(passwordStrength === 3)
            {
                passwordMsg = "Strong"
                color = "lightgreen"
            }
            else if(passwordStrength === 4)
            {
                passwordMsg = "Very Strong"
                color = "green"
            }
            document.getElementById([stateName]).innerHTML=passwordMsg
            document.getElementById([stateName]).style.color=color
            document.getElementById([stateName]+"-id").style.borderColor=color
        }
    }

    function clear(stateName){
        document.getElementById([stateName]).innerHTML=""
    }

    return (
        <div className="inputFields">
            {
                inputList.map(attr =>
                <div>
                    <label>{attr.label}</label>
                    <input onFocus={(e)=>clear(attr.datatestid)} onBlur={(e)=>validation(attr.datatestid,e)} onChange={(e)=>handelChange(attr.datatestid,e)} type={attr.type} placeholder={attr.placeholder} id={attr.datatestid + "-id"} data-testid={attr.datatestid}/>
                    <div className="errMsg" id={attr.datatestid}></div>
                </div>
                )
            }
        </div>
      );
}

export default Input;