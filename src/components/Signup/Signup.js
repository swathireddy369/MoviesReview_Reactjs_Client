import React from 'react'
import "../Auth/Auth.css"
import "./Signup.css"
import { Form ,Input,Button, message} from "antd";
import { LockOutlined,UserOutlined} from "@ant-design/icons";
import {  authServer } from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const [messageapi,contextHolder] = message.useMessage();
    const navigate=useNavigate();
    const onFinish = async (values)=>{
 
        console.log(values,"values");
        try{
            // if(values.password !== values.confirmPassword){
            //     message.error("Passwords do not match. Please try again.")
            //     }
                const apiURL="/signup";
                const payload={...values};
                const response= await authServer.post(apiURL,payload)
                console.log("response",response);
                message.success("registerd successfully")
                navigate("/login")
        }catch(err){
            if(err &&   err.response && err.response.data && err.response.data.error){
                message.error(err.response.data.error)
            }
        }
    }
    return (
        <div className='body'>
            {contextHolder}
            <Form layout='vertical' className="form-Container" onFinish={onFinish}
            >
                <Form.Item name="userName" label="Usename" rules={[
                       { required:true,message:"Please input your username"}
                    ]} style={{
                        width: "100%"
                      }}
                      >
                    <Input  placeholder='Username'></Input>
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[
                       { required:true,message:"Please input your password"}
                    ]} style={{
                        width: "100%"
                      }}>
                    <Input.Password  placeholder='Password' />
                </Form.Item>
                <Form.Item name="confirmPassword" label="ConfirmPassword" rules={[
                       { required:true,message:"Please confirm your password"}
                    ]} style={{
                        width: "100%"
                      }}>
                    <Input  placeholder='Confirmpassword'>
                    </Input>
                </Form.Item>
                <Form.Item>
                    <Button className="button button1" htmlType="submit" >
                        Register
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}
