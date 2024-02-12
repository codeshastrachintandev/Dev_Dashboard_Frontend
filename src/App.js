import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  UserAddOutlined,
  LayoutOutlined,
  PicRightOutlined,
  LoginOutlined,
  WechatWorkOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import HeaderBar from './Components/TopHeader/HeaderBar';
import DisplayRole from './Components/Admin/Roles/Role';
import UserCreate from './Components/Admin/UserCreate/UserCreate';
import CreateMenu from './Components/Admin/CreateMenu/CreateMenu';
import UserAssignMenu from './Components/Admin/UserAssignMenu/UserAssignMenu';
import Login from './Components/Auth/Login/Loginpage';
import Chatpage from './Components/Chatpage/Chatpage';
import GET from './API_Services/Services';
import LoginPage from './Components/Auth/Login/Login';

const { Header, Sider } = Layout;

const App = () => {
  const [spinning, setSpinning] = React.useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [menuItemlist, setMenuItemlist] = useState([]);
  const [token, setToken] = useState([]);
  const isLoggedIn = token !== null;
  
  const showLoader = (Isloader) => {
    Isloader ? setSpinning(Isloader) :
      setTimeout(() => {
        setSpinning(false);
      }, 500);
  };
  var role_no = 0;
  const fetchMenu = async () => {
    showLoader(true);
    try {
      const responseData = await GET('/Users/GetUserAssignMenu?User_id=' + role_no);
      console.log('Response:', responseData);
      setMenuItemlist(responseData.data);

    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    } finally {
      showLoader(false);
    }
  };
  useEffect(() => {
    if (role_no) {
      fetchMenu();
    }
  }, [role_no]);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Your Session is expired");
    }
  }, [isLoggedIn]);

  let content;
  if (isLoggedIn) {
    content = <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => setSelectedMenuItem(key)}
        >
          {/* role_no =0 is for Dev test */}
          {role_no === 0 ? (
            <>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<LayoutOutlined />}>
                <Link to="/role">Create Role</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/menu">Create Menu</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserAddOutlined />}>
                <Link to="/user">Create User</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<PicRightOutlined />}>
                <Link to="/AssignMenu">User Assign Menu</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<LoginOutlined />}>
                <Link to="/Login">Login page</Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<WechatWorkOutlined />}>
                <Link to="/Chatpage">Chat page</Link>
              </Menu.Item>
            </>
          ) : (
            menuItemlist.map((menu, index) => (
              <Menu.Item key={index} icon={<LoginOutlined />}>
                <Link to={menu.path}>{menu.menuName}</Link>
              </Menu.Item>
            ))
          )}
        </Menu>
      </Sider>
      <Layout style={{ background: '#85b8de', height: '100vh', overflowY: 'auto' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <HeaderBar />
        </Header>
        <Routes>
          <Route exact path="/" element={<UserCreate />} />
          <Route exact path="/role" element={<DisplayRole />} />
          <Route exact path="/menu" element={<CreateMenu />} />
          <Route exact path="/user" element={<UserCreate />} />
          <Route exact path="/AssignMenu" element={<UserAssignMenu />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Chatpage" element={<Chatpage />} />
        </Routes>
      </Layout>
    </Layout>;
  } else {
    content = <LoginPage />;
  }

  return (
    <Router>
      {content}
    </Router>
  );
};

export default App;
