import React, { useState } from "react";

import { Navbar, Header, Users, SignUp } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <Users />
      <SignUp />
    </div>
  );
}

export default App;
