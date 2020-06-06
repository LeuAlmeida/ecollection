import React from "react";
import { FiCheckCircle } from 'react-icons/fi'

import './styles.css'

const Success = () => {
  return (
    <div id="page-success">
      <main className="message">
        <FiCheckCircle />
        <span>Cadastro concluído!</span>
      </main>
    </div>
  );
};

export default Success;
