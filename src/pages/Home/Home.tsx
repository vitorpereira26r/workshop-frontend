import React from 'react';
import { Page } from '../Page';
import UMLDiagram from '../../assets/images/workshop-diagram.drawio.png'
import './Home.css'
import '../../global.css'
import { apiUrl } from '../../services/Api';

const HomePage: React.FC = () => {

  const backendGitHubLink = "https://github.com/vitorpereira26r/workshop-springboot3-jpa";
  const frontendGitHubLink = "https://github.com/vitorpereira26r/workshop-frontend";

  return (
    <Page>
      <div className='page-container'>
        <h1 className='custom-heading'>Welcome to My Website</h1>
        <p>This is a web app built to test and learn about web development using Java Spring Boot, React.js, and PostgreSQL.</p>
        <p>The UML Diagram:</p>
        <div className="image-container">
          <img src={UMLDiagram} alt="UML Diagram of the project" />
        </div>
        <div className='content-home-container-me'>
          <p>This project simulates a workshop, where you can create users, orders and products. There are some categories, witch I only display the list of on the screen, without giving the user permition to edit, delete or create new ones.</p>
          <p>The users section shows the list of the users saved in the application, and it's possible to edit, delete and create new ones. When a user is deleted, the orders associated to the user are deleted in cascade.</p>
          <p>The orders section displays the list of orders. The orders are the most complex entity in the application, and besides creating, editing and deleting orders, it's possible to add itens to the order and pay it. Once paid, it's possible to change the order status. The orders have restritions on exclusion, such as when a user with some orders is deleted, the orders are deleted in cascade too. When an order is deleted, the products that were in the order still exist; the only thing deleted together is the relation between products and the order, witch have its own table on the database.</p>
          <p>The product section is where the products are shown as a list, and is where to create, edit and delete the products. In the creation, beyond the name, description and price of the product, is necessary pick the categories of it too, but it is not mandatory. In the editing I didn't gave permission to change the categories, only the name, description and price. When a product is deleted, if it was in a order, the product is removed from the order.</p>
          <p>The category section, is where the application only displays the categories registered in the system. It's not possible to delete, edit or create new ones.The categories aren't deleted when a product with this category is deleted.</p>
        </div>
        <div className='link-container-me'>
          <p>If you want to check out the backend codes in git hub:</p>
          <a href={backendGitHubLink} target="_blank" rel="noopener noreferrer">
            <button className='styled-button-me blue-button-me'>Go to Backend GitHub Repository</button>
          </a>
        </div>
        <div className='link-container-me'>
          <p>If you want to check out the frontend codes in git hub:</p>
          <a href={frontendGitHubLink} target="_blank" rel="noopener noreferrer">
            <button className='styled-button-me red-button-me'>Go to Frontend GitHub Repository</button>
          </a>
        </div>
        <div className='link-container-me'>
          <p>If you want to check out my backend API endpoint, click in the button below:</p>
          <a href={apiUrl} target="_blank" rel="noopener noreferrer">
            <button className='styled-button-me yellow-button-me'>Go to Backend API</button>
          </a>
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
