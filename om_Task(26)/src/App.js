import React from "react";
import "./style.css";

const cardData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80",
    title: "Card 1",
    description: "A bright morning view"
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
    title: "Card 2",
    description: "A peaceful sunset"
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=80",
    title: "Card 3",
    description: "A quiet place to explore"
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=500&q=80",
    title: "Card 4",
    description: "Something interesting"
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    title: "Card 5",
    description: "A calm seaside scene"
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=500&q=80",
    title: "Card 6",
    description: "Green fields and hills"
  }
];

function Card({ image, title, description }) {
  return (
    <article className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button type="button">View</button>
      </div>
    </article>
  );
}

function App() {
  return (
    <div className="page">
      <header className="header">
        <h1>All the cards are here.</h1>
        <p>Each card receives its information through props.</p>
      </header>

      <main className="card-grid">
        {cardData.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
