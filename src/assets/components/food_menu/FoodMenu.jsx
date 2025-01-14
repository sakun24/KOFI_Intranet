import React, { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';

const FoodMenu = () => {
  const [foodMenus, setFoodMenus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "KOFI - Food Menu";
    const fetchFoodMenus = async () => {
      try {
        const response = await fetch('http://192.168.123.90/api/foodmenus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFoodMenus(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodMenus();
  }, []);

  if (loading) return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh' // or any suitable height
  }}>
    {loading && <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />}
  </div>;

  // Get the last menu item, if available
  const lastMenu = foodMenus.length > 0 ? foodMenus[foodMenus.length - 1] : null;

  // Extract month from created_at if available
  const menuMonth = lastMenu 
    ? new Date(lastMenu.created_at).toLocaleString('en-US', { month: 'long' }) 
    : 'N/A';

  return (
    <div>
      <h1>Food Menu for {menuMonth}</h1>
      {error && <p>Error: {error}</p>}
      {lastMenu ? (
        <ul>
          <li key={lastMenu.id}>
            <img 
              src={`http://192.168.123.90/foodmenu/${lastMenu.image}`} 
              alt="Food Menu" 
              style={{ width: '100%', height: 'auto' }} 
            />
          </li>
        </ul>
      ) : (
        <p style={{ color: 'black' }}>No menu available</p>
      )}
    </div>
  );
};

export default FoodMenu;
