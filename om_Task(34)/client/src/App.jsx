import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: ""
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    userId: ""
  });
  const [loading, setLoading] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [usersResponse, postsResponse] = await Promise.all([
        fetch(`${API_URL}/users`).catch(() => null),
        fetch(`${API_URL}/posts`)
      ]);

      // The task only requires a GET /posts route. User list can be
      // built from the populated post data.
      if (!postsResponse.ok) {
        throw new Error("Could not load posts");
      }

      const postData = await postsResponse.json();
      setPosts(postData);

      const usersFromPosts = postData
        .filter((post) => post.user)
        .map((post) => post.user)
        .filter(
          (user, index, list) =>
            index === list.findIndex((item) => item._id === user._id)
        );

      setUsers(usersFromPosts);

      if (postData[0]?.user?._id && !postForm.userId) {
        setPostForm((current) => ({
          ...current,
          userId: postData[0].user._id
        }));
      }

      setMessage("");
    } catch (error) {
      setMessage(
        "Could not connect to the backend. Make sure MongoDB and the Express server are running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    if (!userForm.name.trim() || !userForm.email.trim()) {
      setMessage("Enter both the user's name and email.");
      return;
    }

    try {
      setSavingUser(true);
      setMessage("");

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create user");
      }

      setUsers((current) => [data, ...current]);
      setPostForm((current) => ({
        ...current,
        userId: data._id
      }));
      setUserForm({ name: "", email: "" });
      setMessage("User added.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingUser(false);
    }
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!postForm.title.trim() || !postForm.content.trim() || !postForm.userId) {
      setMessage("Enter the post details and select a user.");
      return;
    }

    try {
      setSavingPost(true);
      setMessage("");

      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create post");
      }

      setPosts((current) => [data, ...current]);
      setUsers((current) => {
        const exists = current.some((user) => user._id === data.user._id);
        return exists ? current : [data.user, ...current];
      });

      setPostForm((current) => ({
        ...current,
        title: "",
        content: ""
      }));
      setMessage("Post added.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingPost(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Task 34 · MongoDB + React</p>
          <h1>Users &amp; Posts</h1>
          <p className="subtitle">
            Add users, publish posts and view posts with their linked user information.
          </p>
        </div>
        <button className="refresh-button" onClick={loadData}>
          Refresh
        </button>
      </header>

      {message && <div className="notice">{message}</div>}

      <main className="layout">
        <aside className="side-column">
          <section className="card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01</p>
                <h2>Add User</h2>
              </div>
            </div>

            <form onSubmit={createUser}>
              <label>
                Name
                <input
                  value={userForm.name}
                  onChange={(event) =>
                    setUserForm({ ...userForm, name: event.target.value })
                  }
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(event) =>
                    setUserForm({ ...userForm, email: event.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>

              <button className="primary-button" disabled={savingUser}>
                {savingUser ? "Saving..." : "Add User"}
              </button>
            </form>
          </section>

          <section className="card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02</p>
                <h2>Add Post</h2>
              </div>
            </div>

            <form onSubmit={createPost}>
              <label>
                User
                <select
                  value={postForm.userId}
                  onChange={(event) =>
                    setPostForm({ ...postForm, userId: event.target.value })
                  }
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option value={user._id} key={user._id}>
                      {user.name} · {user.email}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Title
                <input
                  value={postForm.title}
                  onChange={(event) =>
                    setPostForm({ ...postForm, title: event.target.value })
                  }
                  placeholder="Post title"
                />
              </label>

              <label>
                Content
                <textarea
                  rows="5"
                  value={postForm.content}
                  onChange={(event) =>
                    setPostForm({ ...postForm, content: event.target.value })
                  }
                  placeholder="Write something..."
                />
              </label>

              <button
                className="primary-button"
                disabled={savingPost || users.length === 0}
              >
                {savingPost ? "Publishing..." : "Publish Post"}
              </button>

              {users.length === 0 && (
                <p className="helper">
                  Add a user first so a post can be linked to that user.
                </p>
              )}
            </form>
          </section>
        </aside>

        <section className="card posts-card">
          <div className="posts-header">
            <div>
              <p className="eyebrow">03</p>
              <h2>Posts</h2>
            </div>
            <span>{posts.length} total</span>
          </div>

          {loading ? (
            <div className="empty">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="empty">
              <strong>No posts yet.</strong>
              <span>Create a user and publish the first post.</span>
            </div>
          ) : (
            <div className="post-list">
              {posts.map((post) => (
                <article className="post" key={post._id}>
                  <div className="post-top">
                    <span className="user-badge">
                      {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>

                    <div>
                      <h3>{post.title}</h3>
                      <p className="meta">
                        By {post.user?.name || "Unknown user"} ·{" "}
                        {post.user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <p className="content">{post.content}</p>

                  <div className="post-footer">
                    <span>User reference</span>
                    <code>{post.user?._id || "Not available"}</code>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
