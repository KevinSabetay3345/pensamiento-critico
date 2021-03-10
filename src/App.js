import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from './context/userContext';
import Navbar from './components/navbar/navbar';
import Carousel from './components/carousel/carousel';
import Postlist from './components/postlist/postlist';
import PostForm from './components/postform/postForm';
import Account from './components/account/account';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Switch>

          <Route path="/postform/:id">
            <Navbar homePage={false} />
            <PostForm />
          </Route>
          
          <Route path="/account/:action">
            <Navbar homePage={false} />
            <Account />
          </Route>

          
          <Route path="/:id?">
            <Navbar homePage={true} />
            <Carousel />
            <Postlist />
          </Route>

        </Switch>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
