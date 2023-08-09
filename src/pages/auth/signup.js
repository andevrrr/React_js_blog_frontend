import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const history = useNavigate();

  //const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function signUpUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      history.push("/login");
    }
  }
  useEffect(() => {
    fetch('http://localhost:3000/csrf-token', {
        credentials: 'include' // Add this line
    });
}, []);

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={signUpUser}>
        {/* <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder='Name'
                />
                <br /> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
        />
        <br />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="text"
          placeholder="Confirm Password"
        />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default App;
