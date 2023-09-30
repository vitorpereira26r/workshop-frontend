import React from 'react';
import { Page } from '../Page';
import './Home.css'

const HomePage: React.FC = () => {
  return (
    <Page>
      <div className='page-container'>
        <h1 className='custom-heading'>Welcome to My Website</h1>
        <p>This is a web-app build to test and learn about web development using Java Springboot, React.ts, PostgreSql</p>
        <p>The UML Diagram:</p>
        <div className="image-container">
          <img src="src\assets\workshop-diagram.drawio.png" alt="UML Diagram of the project" />
        </div>
      </div>
    </Page>
  );
}

export default HomePage;