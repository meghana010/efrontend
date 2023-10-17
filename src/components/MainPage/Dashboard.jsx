import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useAuth } from "./AuthContext";

const Dashboard = ({ purchaseHistory,setPurchaseHistory }) => {
    const {loggedInEmail} = useAuth(); 
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    selectedCategory: 'All',
    selectedName: 'All',
    selectedGender: 'All',
  });
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [uniqueGenders, setUniqueGenders] = useState([]);

  // Fetch data based on the logged-in user's email and calculate unique values
  useEffect(() => {
    axios.get(`http://localhost:5000/purchase-history?email=${loggedInEmail}`) // Replace with your API endpoint
      .then((response) => {
        setData(response.data);
        const uniqueCategories = [...new Set(response.data.map((item) => item.category))];
        const uniqueNames = [...new Set(response.data.map((item) => item.name))];
        const uniqueGenders = [...new Set(response.data.map((item) => item.gender))];
        setUniqueCategories(uniqueCategories);
        setUniqueNames(uniqueNames);
        setUniqueGenders(uniqueGenders);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [loggedInEmail,purchaseHistory,setPurchaseHistory]);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <div>
        <br></br>
        <br>
        </br>
      <center><h1>Your Spend Categories</h1></center>
      <br></br>
      <div className="filter-dropdowns">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          onChange={(e) => handleFilterChange('selectedCategory', e.target.value)}
        >
          <option value="All">All</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="name">Filter by Name:</label>
        <select
          id="name"
          onChange={(e) => handleFilterChange('selectedName', e.target.value)}
        >
          <option value="All">All</option>
          {uniqueNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="gender">Filter by Gender:</label>
        <select
          id="gender"
          onChange={(e) => handleFilterChange('selectedGender', e.target.value)}
        >
          <option value="All">All</option>
          {uniqueGenders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <ChartComponent data={data} filters={filters} />
    </div>
  );
};

export default Dashboard;
