import React from "react";

import { Navbar, Header, Users, SignUp } from "./components";

function App() {
  return (
    <div className="app__background">
      <Navbar />
      <Header />
      <Users />
      <SignUp />
    </div>
  );
}

export default App;
