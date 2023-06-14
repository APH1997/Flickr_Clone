import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Feed from "./components/Dashboard";
import PostForm from "./components/Photos/CreatePostPage";
import UserPage from "./components/UserPage";
import AlbumShow from "./components/Albums";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PhotoDetails from "./components/Photos/PhotoDetails";
import { PhotoContextProvider } from "./context/Photo";
import AlbumFormModal from "./components/Albums/AlbumFormModal";
import Footer from "./components/Footer";
import UpdatePostForm from "./components/Photos/UpdatePostPage";




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
            <ProtectedRoute>
              <PhotoContextProvider>
                <PhotoDetails />
              </PhotoContextProvider>
            </ProtectedRoute>
          </Route>
          <Route exact path="/albums/new">
            <ProtectedRoute>
              <AlbumFormModal />
            </ProtectedRoute>
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
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
