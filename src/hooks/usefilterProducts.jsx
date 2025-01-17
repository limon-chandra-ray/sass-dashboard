import { useMemo } from 'react';

export const useFilterProducts = (products, filters, productRate) => {
    const { productType, saleCountry } = filters;

    // const filteredProducts = useMemo(
    //     () =>
    //         products.filter((product) => {
    //         const matchesCategory = productType === 'all' || productRate.some((rate) => rate.product === product.product && rate.category === productType);
    //         const matchesGeography = saleCountry === 'All' || product.geography === saleCountry;
    //         return matchesCategory && matchesGeography;
    //         }),
    //     [products, productType, saleCountry, productRate]
    // );
    const filteredProducts = useMemo(
        () =>
            products.filter((product) => {
                const matchesCategory =
                    productType === 'all' || productRate.some((rate) => rate.product === product.product && rate.category === productType);
                const matchesGeography = saleCountry === 'All' || product.geography === saleCountry;
                return matchesCategory && matchesGeography;
            }),
        [products, productType, saleCountry, productRate]
    );
    return filteredProducts;
};

