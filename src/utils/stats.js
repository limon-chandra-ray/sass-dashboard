export const calculateMonthlyStats = (dateRange, filterProduct, productRate) => {
    if (!dateRange.first_date || !dateRange.last_date) return { monthlyData: [], dmonths: [] };

    const months = [];
    const startDate = new Date(dateRange.first_date);
    const endDate = new Date(dateRange.last_date);
    
    // Create an array of months between first and last date
    while (startDate <= endDate) {
        months.push({
            year: startDate.getFullYear(),
            month: startDate.getMonth(), // 0-based (January is 0)
            label: `${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getFullYear()}`,
        });
        startDate.setMonth(startDate.getMonth() + 1); // Move to next month
    }

    // Initialize productCount to track boxes sold per product
    const productCount = filterProduct.reduce((acc, sale) => {
        if (sale.product) {
            acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.boxes);
        }
        return acc;
    }, {});

    // Initialize productSaleAmount to track total sales per product
    const productSaleAmount = filterProduct.reduce((acc, sale) => {
        acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.sales);
        return acc;
    }, {});

    // Calculate per-month sales values
    const monthlyData = months.map((month) => {
        const monthStats = {
            label: month.label,
            sales: 0,
            cost: 0,
            profit: 0,
            box: 0,
        };

        filterProduct.forEach((product) => {
            const productDate = new Date(product.date);
            if (productDate.getFullYear() === month.year && productDate.getMonth() === month.month) {
                const productName = product.product;
                const productSales = productSaleAmount[productName] || 0;
                const productCost = productRate.find((rate) => rate.product === productName)?.cost_per_box || 0;
                const productBoxCount = productCount[productName] || 0;

                monthStats.sales += productSales;
                monthStats.box += parseInt(product.boxes);
                monthStats.cost += productBoxCount * parseFloat(productCost);
                monthStats.profit += productSales - (productBoxCount * parseFloat(productCost));
            }
        });

        return {
            monthKey: `${month.year}-${month.month}`,
            sales: monthStats.sales,
            box: monthStats.box,
            cost: monthStats.cost,
            profit: monthStats.profit,
        };
    });

    return { monthlyData, dmonths: months };
};

export const calculateCountrySale = (filterProduct) => {
    // Initialize productCount for each geography
    const productCount = filterProduct.reduce((acc, sale) => {
        if (sale.geography) {
            acc[sale.geography] = (acc[sale.geography] || 0) + parseInt(sale.boxes);
        }
        return acc;
    }, {});

    // Transform the productCount object into a list of objects
    return Object.entries(productCount).map(([geography, totalBoxes]) => ({
        geography,
        totalBoxes,
    }));
};



export const productBySaleCostProfit = (filterProduct, productRate, productType) => {

    // Calculate product count and sales amount
    const { productCount, productSaleAmount } = filterProduct.reduce(
        (acc, sale) => {
            if (sale.product) {
                acc.productCount[sale.product] = (acc.productCount[sale.product] || 0) + Number(sale.boxes);
                acc.productSaleAmount[sale.product] = (acc.productSaleAmount[sale.product] || 0) + Number(sale.sales);
            }
            return acc;
        },
        { productCount: {}, productSaleAmount: {} }
    );

    // Initialize totals
    let totalCost = 0;
    let totalProducts = 0;
    let totalSales = 0;

    // Filter products based on type
    const filteredProductRates =
        productType === "all" ? productRate : productRate.filter((pdr) => pdr.category === productType);

    // Calculate totals
    filteredProductRates.forEach((pd) => {
        const productName = pd.product;
        const productCountValue = productCount[productName] || 0;

        if (productCountValue > 0) {
            const productCost = productCountValue * Number(pd.cost_per_box);
            totalProducts += productCountValue;
            totalCost += productCost;
            totalSales += productSaleAmount[productName] || 0;
        }
    });

    // Return results
    return {
        sale: Math.round(totalSales),
        box: totalProducts,
        cost: Math.round(totalCost),
        profit: Math.round(totalSales - totalCost),
    };
};
