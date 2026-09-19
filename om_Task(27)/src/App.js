import React from "react";
import useFetch from "./useFetch";
import "./style.css";

const API_URL = "https://jsonplaceholder.typicode.com/photos?_limit=12";

function App() {
  const { data, loading, error } = useFetch(API_URL);

  return (
    <div className="app">
      <header className="header">
        <h1>Photos</h1>
        <p>Data loaded using a custom useFetch hook.</p>
      </header>

      <main className="content">
        {loading && <p className="message">Loading photos...</p>}

        {error && (
          <div className="error-box">
            <p>Something went wrong.</p>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <section className="photo-grid">
            {data &&
              data.map((photo) => (
                <article className="photo-card" key={photo.id}>
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                  <div className="photo-info">
                    <span>Photo {photo.id}</span>
                    <p>{photo.title}</p>
                  </div>
                </article>
              ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
