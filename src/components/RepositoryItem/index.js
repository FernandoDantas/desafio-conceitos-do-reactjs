import React from 'react';

import './styles.css';

function RepositoryItem({ repository, handleRemoveRepository }) {
  return (
    <li>
      {repository.title}
      <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
    </li>
  );
}

export default RepositoryItem;