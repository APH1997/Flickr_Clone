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
import AlbumForm from "./components/Albums/AlbumForm";

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
            <Feed />
          </Route>
          <Route exact path="/photos/new">
            <PostForm />
          </Route>
          <Route exact path="/photos/:photoId/edit">
            <UpdatePostForm />
          </Route>
          <Route exact path="/photos/:photoId">
            <h1>View 1 photo</h1>
          </Route>
          <Route exact path = "/albums/new">
            <AlbumForm />
          </Route>
          <Route exact path="/albums/:albumId">
            <h1>Display page for an album</h1>
          </Route>
          <Route exact path="/users/:userId">
            <UserPage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
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
