import React, { useState } from 'react';

const Filters = ({ 
    productTypes, 
    countries, 
    onFilterChange 
}) => {
    // States for the filters
    const [selectedProduct, setSelectedProduct] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('All');

    // Handle filter changes and notify the parent
    const handleFilterChange = () => {
        onFilterChange({
            productType: selectedProduct,
            saleCountry: selectedCountry,

        });
    };

    return (
        <div className="p-4 bg-gray-100 shadow-md rounded">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Product Type Filter */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Product Type</label>
                <select
                    value={selectedProduct}
                    onChange={(e) => {
                        setSelectedProduct(e.target.value);
                        handleFilterChange();
                    }}
                    className="p-2 w-full border rounded"
                >
                    <option value="all">All Products</option>
                    {productTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Country Filter */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Country</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        handleFilterChange();
                    }}
                    className="p-2 w-full border rounded"
                >
                    <option value="All">All Countries</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        handleFilterChange();
                    }}
                    className="p-2 w-full border rounded"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        handleFilterChange();
                    }}
                    className="p-2 w-full border rounded"
                />
            </div>
        </div>
    );
};

export default Filters;
