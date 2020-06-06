import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import "./styles.css";

const Success = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, [history]);

  return (
    <div id="body-success">
      <div id="page-success">
        <main className="message">
          <FiCheckCircle />
          <span>Cadastro concluído!</span>
        </main>
      </div>
    </div>
  );
};

export default Success;
