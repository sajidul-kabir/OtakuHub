import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "../Containers/HomePage/HomePage";
import Post from "../Containers/Posts/Posts";
const routeManagement = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/:anime/posts" exact component={Post} />
    </BrowserRouter>
  );
};

export default routeManagement;
