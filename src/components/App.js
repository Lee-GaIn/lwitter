import React, {useState, useEffect} from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';


function App() {
  const [init, setInit] = useState(false);
  /*authService.currentUser: defult val == null */
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  // 맨 처음 페이지를 로드할 때 로그인이 되어있어도 
  // fb가 로드 되어 있지 않기 때문에 로그인이 되어있지 않음
  // 그러므로 fb가 로드 될 때까지 기다려줘야 함.
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 유저가 sign in / sign up / 이미 로그인 했을 때
        setIsLoggedIn(true);
        setUserObj({
         displayName: user.displayName,
         uid:user.uid,
         updateProfile: (args) => (user.updateProfile(args)),
        }); // save user obj as data
      } else {
        //유저가 아직 로그인 전일 때
        //유저가 로그아웃 했을 때
        setIsLoggedIn(false);
        setUserObj("");
      }
      setInit(true);
    }); 
  }, [])
  
  const refreshUser = () => {
    const user = authService.currentUser;
    // user profile이 update 되었을 때
    // 변화를 감지하고, 이 변화가 적용된 새로운 유저 정보를
    // 사용하여 컴포넌트를 렌더링하기 위해 
    // 이 함수를 다른 파일에 전달해줌

    // 정보를 제대로 전달해주고 있는데, userObj 자체가 너무 커서 
    // 새로운 값이 들어왔는지 확인하기 위해 정보를 비교할 때
    // 곤란함.

    // 두가지 해결방법이 있음
    // 1. obj 자체의 크기를 줄여주기
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => (user.updateProfile(args)),
    }); 
  }

  return (
    <>
      {init ? <AppRouter refreshUser = {refreshUser} isLoggedIn = {isLoggedIn} userObj={userObj}/ > : "Loading..."}
      <footer>&copy; {new Date().getFullYear()} Gwitter</footer>
    </>
  );
}

export default App;
