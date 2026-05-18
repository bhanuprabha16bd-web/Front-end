import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    company: "",
    website: "",
  });

  
  const fetchUsers = () => {
    axios
      .get("http://127.0.0.1:8000/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/users", form)
      .then(() => {
        fetchUsers();

        setForm({
          name: "",
          email: "",
          role: "",
          bio: "",
          company: "",
          website: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          marginBottom: "30px",
        }}
      >
        Dashboard Details
      </h1>

      
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
          display: "grid",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="bio"
          placeholder="Enter Bio"
          value={form.bio}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="company"
          placeholder="Enter Company"
          value={form.company}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="website"
          placeholder="Enter Website"
          value={form.website}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Add User
        </button>
      </form>

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {user.name.charAt(0)}
            </div>

            <h2 style={{ color: "#1e293b" }}>{user.name}</h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>Company:</strong> {user.company}
            </p>

            <p>
              <strong>Bio:</strong> {user.bio}
            </p>

            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: "#16a34a",
                color: "white",
                padding: "8px 15px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

export default App;