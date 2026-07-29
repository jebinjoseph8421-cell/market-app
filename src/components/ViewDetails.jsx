import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [addingToCart, setAddingToCart] = useState(false);

const userId = 1;

const getProduct = async () => {
try {
const response = await axios.get(
`http://localhost:8080/api/products/${id}`
);


  console.log("Product:", response.data);
  setProduct(response.data);

} catch (error) {
  console.error(
    "Error fetching product:",
    error
  );

  alert("Failed to load product");

} finally {
  setLoading(false);
}


};

useEffect(() => {
getProduct();
}, [id]);

const handleAddToCart = async () => {
if (!product) {
return;
}


try {
  setAddingToCart(true);

  const response = await axios.post(
    `http://localhost:8080/api/products/cart/${userId}/add/${product.id}`
  );

  console.log(
    "Cart response:",
    response.data
  );

  alert(
    `${product.name} added to cart successfully!`
  );

  navigate("/cart");

} catch (error) {
  console.error(
    "Error adding product to cart:",
    error
  );

  alert(
    "Failed to add product to cart."
  );

} finally {
  setAddingToCart(false);
}


};

const deleteProduct = async () => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this product?"
);


if (!confirmDelete) {
  return;
}

try {
  await axios.delete(
    `http://localhost:8080/api/products/${id}`
  );

  alert(
    "Product deleted successfully!"
  );

  navigate("/all");

} catch (error) {
  console.error(
    "Error deleting product:",
    error
  );

  alert(
    "Failed to delete product"
  );
}


};

if (loading) {
return ( <h2 style={styles.message}>
Loading product... </h2>
);
}

if (!product) {
return ( <h2 style={styles.message}>
Product not found </h2>
);
}

return ( <div style={styles.page}>


  <div style={styles.card}>

    <div style={styles.imageContainer}>

      <img
        src={`http://localhost:8080/uploads/${product.productImg}`}
        alt={product.name}
        style={styles.image}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

    </div>

    <div style={styles.details}>

      <h1 style={styles.title}>
        {product.name}
      </h1>

      <p style={styles.category}>
        Category: {product.category}
      </p>

      <p style={styles.price}>
        ₹{product.price}
      </p>

      <div style={styles.buttonContainer}>

        <button
          onClick={handleAddToCart}
          style={{
            ...styles.cartButton,
            opacity: addingToCart ? 0.6 : 1,
          }}
          disabled={addingToCart}
        >
          {addingToCart
            ? "Adding to Cart..."
            : "🛒 Add to Cart"}
        </button>

        <button
          onClick={deleteProduct}
          style={styles.deleteButton}
        >
          Delete Product
        </button>

      </div>

    </div>

  </div>

</div>


);
}

const styles = {

page: {
minHeight: "100vh",
backgroundColor: "#f5f5f5",
padding: "60px 40px",
display: "flex",
justifyContent: "center",
alignItems: "center",
fontFamily: "Arial, sans-serif",
boxSizing: "border-box",
},

card: {
width: "100%",
maxWidth: "1000px",
minHeight: "500px",
backgroundColor: "#ffffff",
borderRadius: "20px",
overflow: "hidden",
boxShadow:
"0 10px 35px rgba(0, 0, 0, 0.15)",
display: "flex",
},

imageContainer: {
width: "55%",
minHeight: "500px",
backgroundColor: "#eeeeee",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "20px",
boxSizing: "border-box",
},

image: {
width: "100%",
height: "100%",
maxHeight: "500px",
objectFit: "contain",
display: "block",
},

details: {
width: "45%",
padding: "50px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
boxSizing: "border-box",
},

title: {
margin: "0 0 20px",
fontSize: "36px",
fontWeight: "700",
color: "#111111",
},

category: {
fontSize: "17px",
color: "#777777",
marginBottom: "25px",
},

price: {
fontSize: "32px",
fontWeight: "700",
color: "#111111",
marginBottom: "35px",
},

buttonContainer: {
display: "flex",
flexDirection: "column",
gap: "15px",
width: "100%",
},

cartButton: {
width: "100%",
padding: "15px",
backgroundColor: "#111111",
color: "#ffffff",
border: "none",
borderRadius: "8px",
fontSize: "16px",
fontWeight: "600",
cursor: "pointer",
},

deleteButton: {
width: "100%",
padding: "15px",
backgroundColor: "#b82222",
color: "#ffffff",
border: "none",
borderRadius: "8px",
fontSize: "16px",
fontWeight: "600",
cursor: "pointer",
},

message: {
textAlign: "center",
marginTop: "100px",
fontFamily: "Arial, sans-serif",
},

};

export default ViewDetails;
