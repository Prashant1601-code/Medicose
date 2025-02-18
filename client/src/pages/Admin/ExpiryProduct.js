// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ExpiryProduct = () => {
//   const [expiredProducts, setExpiredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Function to fetch expired products
//     const fetchExpiredProducts = async () => {
//       try {
//         const response = await axios.get("/api/v1/product/expired-products");
//         setExpiredProducts(response.data.expiredProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching expired products:", error);
//       }
//     };

//     // Call the fetchExpiredProducts function
//     fetchExpiredProducts();
//   }, []); // Only run once on component mount

//   return (
//     <div>
//       <h2>Expired Products</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : expiredProducts.length === 0 ? (
//         <p>No expired products found.</p>
//       ) : (
//         <ul>
//           {expiredProducts.map((product) => (
//             <li key={product._id}>
//               <h3>{product.name}</h3>
//               <p>
//                 Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}
//               </p>
//               <p>Description: {product.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ExpiryProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const ExpiryProduct = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await axios.get("/api/v1/product/expired-products");
        setExpiredProducts(response.data.expiredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expired products:", error);
        setLoading(false);
      }
    };

    fetchExpiredProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Expired Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Expired Products</h1>
            {loading ? (
              <p>Loading...</p>
            ) : expiredProducts.length === 0 ? (
              <p>No expired products found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Expiry Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiredProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{new Date(product.expiryDate).toLocaleDateString()}</td>
                        <td>{product.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpiryProduct;