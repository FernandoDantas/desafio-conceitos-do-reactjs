import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";
import RepositoryItem from "./components/RepositoryItem";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
     api.get('repositories').then(response => {
        setRepositories(response.data);
     });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: `https://github.com/FernandoDantas`,
      techs: ['Node.js', 'Typescript'],     
    });   

    setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {

    const newRepositories = repositories.filter(repository => repository.id !== id);
    
    await api.delete(`/repositories/${id}`);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <RepositoryItem
              key={repository.id}
              repository={repository}
              handleRemoveRepository={handleRemoveRepository}
            />
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
