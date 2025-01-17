import React from 'react';
import products from '../data';
function HomeScreen (props) {
    return(
        <>
        <ul className="products">
          {
            products.map(product =>
              <li>
                <div className="product">
                    <img className="product-image" src={product.image} alt="product" />
                  <div className="product-name">
                    <a href="product.html">{product.brand}</a>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                </div>
              </li>)
          }
              </ul>
        </>
    )
}

export default HomeScreen;