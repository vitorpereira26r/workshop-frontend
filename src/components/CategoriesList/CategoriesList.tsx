import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/Category/CategoryServices';
import { Category } from '../../entities/Category';
import "../List.css"

export const CategoriesList: React.FC = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    async function fetchAndSetCategories() {
        try{
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        }
        catch(error){
            throw error;
        }
    }

    fetchAndSetCategories();
  }

  return (
    <div>
        <div className='list'>
            <div>
                <ul className='list-list'>
                    {categories.map((category) => (
                        <li key={category.id} className='list-card'>
                            <div className='list-info'>
                                <span>{formatCategory(category)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

function formatCategory (category: Category): string{
    return category.id + ". " + category.name;
}
