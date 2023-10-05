import React from 'react';
import { Page } from '../Page';
import UMLDiagram from '../../assets/images/workshop-diagram.drawio.png'
import './Home.css'
import '../../global.css'
import { apiUrl } from '../../services/Api';

const HomePage: React.FC = () => {

  return (
    <Page>
      <div className='page-container'>
        <h1 className='custom-heading'>Welcome to My Website</h1>
        <p>This is a web-app build to test and learn about web development using Java Springboot, React.ts, PostgreSql</p>
        <p>The UML Diagram:</p>
        <div className="image-container">
          <img src={UMLDiagram} alt="UML Diagram of the project" />
        </div>
        <div>
          <p>If you want to check up my backend API endpoint, click in the button below:</p>
          <a href={apiUrl} target="_blank" rel="noopener noreferrer">
            <button className='styled-button yellow-button'>Go to Backend API</button>
          </a>
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
