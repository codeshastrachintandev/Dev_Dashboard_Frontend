import React from 'react';
import { Layout, Form, Input, Checkbox, Button, Alert } from 'antd';
// import './Css/LoginPage.css';
import { LoginMethod } from '../../../API_Services/Services';
const { Header, Content, Footer } = Layout;

const LoginPage = (setToken) => {
    const onFinish = (values) => {
        try {
            LoginMethod(values);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {

        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout style={{ height: '100vh', color: 'white', background: "#7fbcf2" }}>
            <Content className='' style={{ padding: '50px', marginTop: '150px' }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    fields={[
                        {
                            name: ["username"],
                            value: 'Dev'
                        },
                        {
                            name: ["password"],
                            value: 'Admin123'
                        },
                    ]}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default LoginPage;