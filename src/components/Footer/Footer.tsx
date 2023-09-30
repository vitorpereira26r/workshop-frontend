// Footer.tsx

import React from 'react';
import './Footer.css';
import herokuLogo from '../../assets/logos/heroku-logo.png';
import javaLogo from '../../assets/logos/java-logo.png';
import mavenLogo from '../../assets/logos/maven-logo.png';
import postgresqlLogo from '../../assets/logos/postgresql-logo.png';
import reactLogo from '../../assets/logos/react-logo.png';
import springbootLogo from '../../assets/logos/springboot-logo.png';
import typescriptLogo from '../../assets/logos/typescript-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={javaLogo} alt="Java" />
        <img src={mavenLogo} alt="Maven" />
        <img src={springbootLogo} alt="Springboot" />
        <img src={herokuLogo} alt="Heroku" />
        <img src={postgresqlLogo} alt="PostgreSql" />
        <img src={reactLogo} alt="React" />
        <img src={typescriptLogo} alt="Typescript" />
      </div>
    </footer>
  );
}
