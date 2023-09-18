import React, { useState } from "react";
import ShopCartNow from "./ShopCartNow";
import "./style.css";
import Catg from "./Catg";

const ShopNow = ({ addToCart, allItems }) => {
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filteredItems = allItems.filter((item) => {
    const genderMatch = selectedGender === "All" || item.gender === selectedGender;
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || item.name === selectedBrand;
    return genderMatch && categoryMatch && brandMatch;
  });

  const uniqueGenders = [...new Set(allItems.map((item) => item.gender))];
  const uniqueCategories = [...new Set(allItems.map((item) => item.category))];
  const uniqueBrands = [...new Set(allItems.map((item) => item.name))];

  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Catg />
          <div className="contentWidth">
            <div className="filter-dropdowns">
              <label htmlFor="gender">Filter by Gender:</label>
              <select
                id="gender"
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="All">All</option>
                {uniqueGenders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <label htmlFor="category">Filter by Category:</label>
              <select
                id="category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label htmlFor="brand">Filter by Brand:</label>
              <select
                id="brand"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="All">All</option>
                {uniqueBrands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-content grid1 myflex">
            {filteredItems.length === 0 ? (
                <p style={{textAlign:'center',color:'red'}}><br></br><br></br><br></br>  No items found.</p>
              ) : (
                <ShopCartNow addToCart={addToCart} allItems={filteredItems} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopNow;
