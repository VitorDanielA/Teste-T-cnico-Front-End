import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from 'cdbreact';
  
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {setItem} from './../pages/TrocarTelas';

const Sidebar = () => {

  function logout(){
    setItem('usuario', '');
  }

  return (
    <div style={{minHeight: '100vh', float: 'left', clear: 'left'}}>
      <CDBSidebar 
        textColor="#ffffff" 
        backgroundColor="#5486BA" 
        className={''} 
        breakpoint={0} 
        toggled={false} 
        minWidth={'70px'} 
        maxWidth={'250px'}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars pt-2" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <BsPerson width={7} color='white'/>
            <h6 className="ms-2 pt-2">WebChat</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent className='container'>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="comment-alt">Conversas</CDBSidebarMenuItem>
            <Link to = '/' onClick={() => logout()}>
              <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid">
                Sair
              </CDBSidebarMenuItem> 
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  )
};

export default Sidebar;