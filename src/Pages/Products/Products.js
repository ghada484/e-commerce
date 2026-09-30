import { useMemo, useState, useEffect } from "react";
import {
  useSearchParams,
  Link,
} from "react-router-dom";

import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import "./Products.css";

function Products() {
  const { products, loading, error } =
    useProducts();

  const { addToCart } = useCart();

  const { showToast } = useToast();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const category =
    searchParams.get("category");

  const search =
    searchParams.get("search");

  const brandFromUrl =
    searchParams.get("brand");

  const [selectedBrand, setSelectedBrand] =
    useState(brandFromUrl || "all");

  const [maxPrice, setMaxPrice] =
    useState(1000);

  const [selectedRating, setSelectedRating] =
    useState("all");

  const [inStockOnly, setInStockOnly] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 12;

  useEffect(() => {
    setSelectedBrand(
      brandFromUrl || "all"
    );
  }, [brandFromUrl]);

  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ];

    return uniqueBrands.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search) {
      const searchValue =
        search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.title
            .toLowerCase()
            .includes(searchValue) ||
          product.description
            .toLowerCase()
            .includes(searchValue) ||
          product.category
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    if (selectedBrand !== "all") {
      result = result.filter(
        (product) =>
          product.brand === selectedBrand
      );
    }

    result = result.filter(
      (product) =>
        product.price <= maxPrice
    );

    if (selectedRating !== "all") {
      result = result.filter(
        (product) =>
          product.rating >=
          Number(selectedRating)
      );
    }

    if (inStockOnly) {
      result = result.filter(
        (product) =>
          product.stock > 0
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            b.rating - a.rating
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            b.id - a.id
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    category,
    search,
    selectedBrand,
    maxPrice,
    selectedRating,
    inStockOnly,
    sortBy,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    category,
    search,
    selectedBrand,
    maxPrice,
    selectedRating,
    inStockOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  const handleBrandChange = (event) => {
    const value = event.target.value;

    setSelectedBrand(value);

    const newParams =
      new URLSearchParams(
        searchParams
      );

    if (value === "all") {
      newParams.delete("brand");
    } else {
      newParams.set("brand", value);
    }

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedBrand("all");
    setMaxPrice(1000);
    setSelectedRating("all");
    setInStockOnly(false);
    setSortBy("default");

    const newParams =
      new URLSearchParams(
        searchParams
      );

    newParams.delete("brand");

    setSearchParams(newParams);
  };

  const goToPage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (
    event,
    product
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (product.stock === 0) {
      showToast(
        "This product is out of stock.",
        "error"
      );

      return;
    }

    addToCart(product, 1);

    showToast(
      `${product.title} added to cart successfully.`,
      "success"
    );
  };

  if (loading) {
    return (
      <div className="products-state">
        <h2>
          Loading products...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-state">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main className="products-page">

      <div className="products-header">

        <div>

          <h1>

            {search
              ? `Search Results for "${search}"`

              : selectedBrand !== "all"
              ? `${selectedBrand} Products`

              : category
              ? category.replaceAll(
                  "-",
                  " "
                )

              : "All Products"}

          </h1>

          <p>

            {search
              ? `Showing products related to "${search}".`

              : selectedBrand !== "all"
              ? `Explore products from ${selectedBrand}.`

              : category
              ? `Explore our ${category.replaceAll(
                  "-",
                  " "
                )} collection.`

              : "Discover our latest products and best deals."}

          </p>

        </div>

        <span className="products-count">

          {filteredProducts.length}{" "}

          {filteredProducts.length === 1
            ? "Product"
            : "Products"}

        </span>

      </div>

      <div className="products-layout">

        <aside className="filters-sidebar">

          <div className="filters-header">

            <h2>
              Filters
            </h2>

            <button
              onClick={clearFilters}
              className="clear-filters"
            >
              Clear All
            </button>

          </div>

          <div className="filter-group">

            <h3>
              Brand
            </h3>

            <select
              value={selectedBrand}
              onChange={
                handleBrandChange
              }
            >

              <option value="all">
                All Brands
              </option>

              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}

            </select>

          </div>

          <div className="filter-group">

            <h3>
              Maximum Price
            </h3>

            <div className="price-value">
              ${maxPrice}
            </div>

            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(
                  Number(
                    event.target.value
                  )
                )
              }
            />

            <div className="price-range">

              <span>
                $0
              </span>

              <span>
                $1000+
              </span>

            </div>

          </div>

          <div className="filter-group">

            <h3>
              Rating
            </h3>

            <label>

              <input
                type="radio"
                name="rating"
                value="all"
                checked={
                  selectedRating ===
                  "all"
                }
                onChange={(event) =>
                  setSelectedRating(
                    event.target.value
                  )
                }
              />

              All Ratings

            </label>

            <label>

              <input
                type="radio"
                name="rating"
                value="4"
                checked={
                  selectedRating ===
                  "4"
                }
                onChange={(event) =>
                  setSelectedRating(
                    event.target.value
                  )
                }
              />

              ★ 4.0 & above

            </label>

            <label>

              <input
                type="radio"
                name="rating"
                value="3"
                checked={
                  selectedRating ===
                  "3"
                }
                onChange={(event) =>
                  setSelectedRating(
                    event.target.value
                  )
                }
              />

              ★ 3.0 & above

            </label>

          </div>

          <div className="filter-group">

            <h3>
              Availability
            </h3>

            <label>

              <input
                type="checkbox"
                checked={
                  inStockOnly
                }
                onChange={(event) =>
                  setInStockOnly(
                    event.target.checked
                  )
                }
              />

              In Stock Only

            </label>

          </div>

        </aside>

        <section className="products-results">

          <div className="products-toolbar">

            <span>

              Showing{" "}

              {currentProducts.length}{" "}
              of{" "}

              {filteredProducts.length}{" "}
              products

            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
              className="sort-select"
            >

              <option value="default">
                Sort: Default
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Rating: High to Low
              </option>

              <option value="newest">
                Newest
              </option>

            </select>

          </div>

          {filteredProducts.length ===
          0 ? (

            <div className="products-state">

              <h2>
                No products found.
              </h2>

              <p>
                Try changing your
                filters or search.
              </p>

              <button
                className="back-products"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <>

              <div className="products-grid">

                {currentProducts.map(
                  (product) => (

                    <Link
                      to={`/products/${product.id}`}
                      className="product-card"
                      key={product.id}
                    >

                      <div className="product-image">

                        <img
                          src={
                            product.thumbnail
                          }
                          alt={
                            product.title
                          }
                        />

                        {product.discountPercentage >
                          0 && (
                          <span className="discount-badge">

                            -
                            {Math.round(
                              product.discountPercentage
                            )}
                            %

                          </span>
                        )}

                      </div>

                      <div className="product-info">

                        <span className="product-category">

                          {product.category}

                        </span>

                        <h2>
                          {product.title}
                        </h2>

                        <div className="product-rating">

                          <span>
                            ★
                          </span>

                          <span>
                            {
                              product.rating
                            }
                          </span>

                        </div>

                        <div className="product-price">

                          <strong>
                            $
                            {product.price.toFixed(
                              2
                            )}
                          </strong>

                          {product.discountPercentage >
                            0 && (
                            <span>
                              $
                              {(
                                product.price /
                                (1 -
                                  product.discountPercentage /
                                    100)
                              ).toFixed(
                                2
                              )}
                            </span>
                          )}

                        </div>

                        <button
                          className="add-to-cart"
                          onClick={(
                            event
                          ) =>
                            handleAddToCart(
                              event,
                              product
                            )
                          }
                          disabled={
                            product.stock ===
                            0
                          }
                        >

                          {product.stock ===
                          0
                            ? "Out of Stock"
                            : "Add to Cart"}

                        </button>

                      </div>

                    </Link>

                  )
                )}

              </div>

              {totalPages > 1 && (

                <div className="pagination">

                  <button
                    className="pagination-button"
                    disabled={
                      currentPage ===
                      1
                    }
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                  >
                    ← Previous
                  </button>

                  <div className="pagination-numbers">

                    {Array.from(
                      {
                        length:
                          totalPages,
                      },
                      (_, index) =>
                        index + 1
                    ).map((page) => (

                      <button
                        key={page}
                        className={
                          currentPage ===
                          page
                            ? "pagination-number active"
                            : "pagination-number"
                        }
                        onClick={() =>
                          goToPage(
                            page
                          )
                        }
                      >
                        {page}
                      </button>

                    ))}

                  </div>

                  <button
                    className="pagination-button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      goToPage(
                        currentPage + 1
                      )
                    }
                  >
                    Next →
                  </button>

                </div>

              )}

            </>

          )}

        </section>

      </div>

    </main>
  );
}

export default Products;
