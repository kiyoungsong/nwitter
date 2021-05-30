import React, { useState, useEffect } from "react";
import { AppRouter } from "./Router";
import { authService } from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // firebase가 로그인 하는것을 확인하고 상태를 변경해주기 위함
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        // 첫번째 방법
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });

        // 두번째 방법
        // setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // 큰 obj일 경우 react에게 결정장애가 옴
    // 그래서 첫번째 방법은 obj의 크기를 줄임
    // 첫번째 방법
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });

    // 두번째 방법
    // 빈 {}에 사본을 만들어 새로운 오브젝트를 생성하여 넘김
    // setUserObj(Object.assign({}, user));
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
