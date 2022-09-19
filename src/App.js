import React, { useState } from "react";

import { Navbar, Header, Users, SignUp } from "./components";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div>
      <Navbar />
      <Header />
      <Users users={users} setUsers={setUsers} />
      <SignUp users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
