import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Table, message, Select, Space, Popconfirm } from "antd";
import Delete from '../../../API_Services/Detete';
import { GET, POST } from '../../../API_Services/Services';
const { Option } = Select;

export default function UserAssignMenu() {
    const [spinning, setSpinning] = React.useState(false);
    const [UserList, setUserList] = useState([]);
    const [MenuList, SetmenuList] = useState([]);
    const [UserAssignMenulist, SetUserAssignMenulist] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [form1] = Form.useForm();
    const showLoader = (Isloader) => {
        Isloader ? setSpinning(Isloader) :
            setTimeout(() => {
                setSpinning(false);
            }, 500);
    };

    const onFinish = (values) => {
        console.log('values:', values);
        CreateUserAssignMenu(values);
    };
    const fetchMenu = async () => {
        showLoader(true);
        try {
            const responseData = await GET('/Users/GetMenu');
            SetmenuList(responseData.data);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {
            showLoader(false);
        }
    };

    const onSearchFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchUser = async () => {
        showLoader(true);
        try {
            const response = await GET('/Users/GetUser');
            if (response.success) {
                setUserList(response.data);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const fetchUserAssignMenu = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        try {
            const response = await GET('/Users/GetUserAssignMenu?User_id='+payload);
            if (response.success) {
                SetUserAssignMenulist(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const CreateUserAssignMenu = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        try {
            const response = await POST('/Users/CreateUserAssignMenu',payload);
            if (response.success) {
                message.success('Create successfully');
                form1.resetFields();
                fetchUserAssignMenu(selectedUserId);
                console.log('Create successfully:', response.data);
            } else {
                if (response.data.statusCode) message.error(response.message);
            }
        } catch (error) {
            message.error('Error creating role');
            console.error('Error creating role:', error.message);
        } finally {
            showLoader(false);
        }
    };
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Menu Name',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: 'Menu Description',
            dataIndex: 'menuDescription',
            key: 'menuDescription',
        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={'Remove the Menu'}
                        description={`Are you sure to UnAssignMenu this User?`}
                        onConfirm={() => UnAssignMenu(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a style={{color:'red'}}>Remove</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const cancel = (e) => {
        //console.log("print",e);
        message.error('Click on No');
    };
    const UnAssignMenu = async(payload)=>{
        showLoader(true);
        try {
            const responseData = await Delete('/Users/RemoveUserAssignMenu?id='+payload);
            console.log('Response:', responseData);
            fetchUserAssignMenu(selectedUserId);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {
            showLoader(false);
        }
    }
    useEffect(() => {
        fetchUser();
        fetchMenu();
    }, []);
    useEffect(() => {
        if (selectedUserId) {
            console.log("selectedUserId",selectedUserId)
            fetchUserAssignMenu(selectedUserId);
        }
    }, [selectedUserId]);
    return (<>
        <Spin spinning={spinning} fullscreen />
        <div className="container rolebox">
            <h1>User Assign Menu</h1>
            <Form className='UserAssignMenu' form={form1} onFinish={onFinish} onFinishFailed={onSearchFailed} autoComplete="off">
                <Form.Item
                    name="UserId"
                    label="Select User"
                    rules={[{ required: true, message: 'Please select a user!' }]}
                >
                    <Select placeholder="Select a User" style={{ width: '15%' }}>
                        {UserList.map(user => (
                            <Option key={user.id} value={user.id}>
                                {user.username} ({user.roleName})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="MenuId"
                    label="Select Menu"
                    rules={[{ required: true, message: 'Please select a menu!' }]}
                >
                    <Select placeholder="Select a Menu" style={{ width: '25%' }}>
                        {MenuList.map(menu => (
                            <Option key={menu.id} value={menu.id}>
                                {menu.menuName} ({menu.menuDescription})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </div>
        <div className="container rolebox">
                <div className='divflex'>
                    <Form.Item
                        name="User_id"
                        label="Select User"
                        rules={[{ required: true, message: 'Please select a user!' }]}
                    >
                        <Select placeholder="Select a User"  onChange={(value) => setSelectedUserId(value)}>
                            {UserList.map(user => (
                                <Option key={user.id} value={user.id}>
                                    {user.username} ({user.roleName})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            <Table dataSource={UserAssignMenulist} columns={columns} />
        </div>
    </>);
}