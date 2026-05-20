import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    company: "",
    website: "",
  });

  
  const fetchUsers = () => {
  setLoading(true);

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      const data = res.data;

      const updatedUsers = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "Developer",
        bio: "No Bio",
        company: user.company?.name || "No Company",
        website: user.website
          ? `https://${user.website.replace(
              "https://",
              ""
            )}`
          : "#",
      }));

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    })
    .catch((err) => {
      console.log(err);
      setMessage("Error fetching users");
    })
    .finally(() => {
      setLoading(false);
    });
};

  useEffect(() => {
    fetchUsers();
  }, []);

  
  useEffect(() => {
    let updatedUsers = users;

    
    if (search !== "") {
      updatedUsers = updatedUsers.filter((user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    
    if (roleFilter !== "All") {
      updatedUsers = updatedUsers.filter(
        (user) => user.role === roleFilter
      );
    }

    setFilteredUsers(updatedUsers);
  }, [search, roleFilter, users]);

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (editId) {
      const updatedUsers = users.map((user) =>
        user.id === editId
          ? { ...user, ...form }
          : user
      );

      setUsers(updatedUsers);

      setMessage("User updated successfully");
    }

    
    else {
      const newUser = {
        id: users.length + 1,
        ...form,
      };

      setUsers([...users, newUser]);

      setMessage("User added successfully");
    }

    resetForm();
  };

  
  const handleDelete = (id) => {
    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    setMessage("User deleted successfully");
  };

  
  const handleEdit = (user) => {
    setEditId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      company: user.company,
      website: user.website,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "",
      bio: "",
      company: "",
      website: "",
    });

    setEditId(null);
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
        User Dashboard
      </h1>

      
      {message && (
        <p
          style={{
            textAlign: "center",
            color: "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
          style={inputStyle}
        >
          <option value="All">All Roles</option>
          <option value="Developer">
            Developer
          </option>
          <option value="Designer">
            Designer
          </option>
          <option value="Manager">
            Manager
          </option>
        </select>
      </div>

      
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",
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
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
          required
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
            backgroundColor: editId
              ? "#f59e0b"
              : "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      
      {loading ? (
        <h2 style={{ textAlign: "center" }}>
          Loading Users...
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1)",
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

              <h2 style={{ color: "#1e293b" }}>
                {user.name}
              </h2>

              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {user.company}
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

              
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    flex: 1,
                    backgroundColor: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(user.id)
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  flex: 1,
};

export default App;