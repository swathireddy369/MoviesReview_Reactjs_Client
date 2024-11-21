import React, { useEffect, useState } from "react";
import { Button, message,Form,Input } from "antd";
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
            <Form layout='vertical' className="form-Container" onFinish={handleSubmit}
            >
                 <Form.Item name="userName" label="Usename"  value={userName} rules={[
                       { required:true,message:"Please input your username"}
                    ]} style={{
                        width: "100%"
                      }}
                      >
                    <Input  placeholder='Username' onChange={(e) => handleChange(e, true)}  ></Input>
                </Form.Item>
                <Form.Item name="password" label="Password"  value={password} rules={[
                       { required:true,message:"Please input your password"}
                    ]} style={{
                        width: "100%"
                      }}>
                    <Input.Password  placeholder='Password' onChange={(e) => handleChange(e, false)}/>
                </Form.Item>
           
            <Button className="button" type={'primary'} htmlType="submit" >Login</Button>
       </Form>
        </div>
    )

}
export default Auth;