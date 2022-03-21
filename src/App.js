import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AccountScreen from './components/AccountScreen';
import ChatScreen from './components/ChatScreen';
import LoginScreen from './components/LoginScreen';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Panel from './components/UI/Panel';
import ScreenContainer from './components/UI/ScreenContainer';
import './locale/i18n' //i18n from 
import { faCloud, faClouds} from '@fortawesome/pro-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import AnimatedCloud from './components/AnimatedCloud';

function App() {

  document.title = 'test'
  
  const renderClouds = count => {
    const clouds = []
    for (let i = 0; i < count; i++){
      clouds.push(<AnimatedCloud cloudId={'cloud' + i } key={'cloud' + i }/>)
    }
    return clouds
  }

  return (
    <div className="App">
      <div style={{position: 'absolute', height: '0px'}}>
        {renderClouds(7)}
      </div>
      <NavBar />
      <ScreenContainer className="flex-fill">
        <Routes>
          <Route path="/" element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/" element={<ChatScreen />} />
            <Route path="/edit_account" element={<AccountScreen type='edit'/>} />
          </Route>
          <Route path="/register" element={<AccountScreen type='create'/>} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Panel><h1>404 Invalid Route!</h1></Panel>} />
        </Routes>
      </ScreenContainer>
    </div>
  );
}

export default App;
