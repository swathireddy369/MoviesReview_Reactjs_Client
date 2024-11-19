import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { authServer } from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Auth.css";


const Auth = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (e, flag) => {
        if (flag) {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }

    }
    const handleSubmit = async () => {
        const payload = { userName, password }
       
        // const URL = "http://localhost:5000/signin"
        try {
            const response = await authServer.post("/signin", payload)
            const token = response.data.token
            messageApi.success("Login successful!");
            localStorage.setItem("token", token)
            localStorage.setItem("loggedIn", true)
            navigate("/movies")

        } catch (error) {
            if (error && error.response && error.response.data && error.response.data.error) {
               
                messageApi.error(
                    error.response.data.error,
                );
            }
        }
    }
    return (
        <div className="body">
            {contextHolder}
            <input className="input" name="UserName" placeholder="Username" value={userName} onChange={(e) => handleChange(e, true)}  ></input>
            <input className="input" name="password" placeholder="Password" value={password} onChange={(e) => handleChange(e, false)} ></input>
            <Button className="button" type={'primary'} onClick={handleSubmit}>Login</Button>
        </div>
    )

}
export default Auth;