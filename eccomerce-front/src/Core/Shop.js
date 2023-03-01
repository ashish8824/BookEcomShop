import React, { useEffect, useState } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    }); 
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredresults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);
    


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        init();
        loadFilteredResults();
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;


        if (filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters)

    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredresults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
        )
        )
    }

    return (
        <Layout
            title="Shop Page"
            description="Search and find of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by category</h4>
                    <ul>
                        <CheckBox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox 
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters,"price")
                            }
                        />
                    </div>

                </div>
                <div className="col-8">
                     <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredresults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                             </div>
                        ))}

                    </div> 
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>

        </Layout>
    );
}

export default Shop;