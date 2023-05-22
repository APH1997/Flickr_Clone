import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Feed from "./components/Dashboard";
import PostForm from "./components/Photos/CreatePostPage";
import UpdatePostForm from "./components/Photos/UpdatePostPage";
import UserPage from "./components/UserPage";
import AlbumShow from "./components/Albums";
import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          </Route>
          <Route exact path="/photos/new">
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          </Route>
          <Route exact path="/photos/:photoId/edit">
            <ProtectedRoute>
              <UpdatePostForm />
            </ProtectedRoute>
          </Route>
          <Route exact path="/photos/:photoId">
            <h1>View 1 photo</h1>
          </Route>
          <Route exact path="/albums/:albumId">
            <ProtectedRoute>
              <AlbumShow />
            </ProtectedRoute>
          </Route>
          <Route exact path="/users/:userId">
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/login" >
              <LoginFormPage />
          </Route>
          <Route exact path="/signup">
              <SignupFormPage />
          </Route>
          <Route exact path="/thunk/hub">
            <ProtectedRoute>
              <h1>Thunk hub component here</h1>
            </ProtectedRoute>
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
