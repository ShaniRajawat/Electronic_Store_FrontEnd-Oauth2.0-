import { Button } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteProduct } from "../../services/product.service";

const SingleProductView = ({ product, index, updateProductList, handleProductOpen, openEditProductModal }) => {
  
  const formatDate = (time) => {
    return new Date(time).toLocaleString();
  };

  const getBackGroundColorForProduct = () => {
    //Live + Stock ===> green: table-success

    //not Live ===> red: table-danger

    //not Stock ===> yellow: table-warn
    if (product.live && product.stock) {
      return "table-success";
    } else if (!product.live) {
      return "table-danger";
    } else if (!product.stock) {
      return "table-warning";
    } else {
    }
  };

  //delete Product
  const deleteProductLocal = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //call Api
        deleteProduct(product.productId)
          .then((data) => {
            console.log(data);
            toast.success("Deleted Successfully");

            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting the product");
          });
      }
    });
  };

 
  return (
    <tr className={getBackGroundColorForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small">{product.title}</td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">₹{product.price}</td>
      <td className="px-3 small">₹{product.discountedPrice}</td>
      <td className="px-3 small">{product.live ? "LIVE" : "NOT LIVE"}</td>
      <td className="px-3 small">
        {product.stock ? "IN Stock" : "Out of Stock"}
      </td>
      <td className="px-3 small">
        {product.category ? product.category.title : "N/A"}
      </td>
      <td className="px-3 small">{formatDate(product.addedDate)}</td>
      <td className="px-3 small d-flex">
        <Button
          onClick={(event) => {
            deleteProductLocal(product.productId);
          }}
          size="sm"
          variant="danger"
        >
          <RiDeleteBin5Line />
          Delete
        </Button>
        <Button onClick={(event)=>handleProductOpen(event, product)} className="ms-2" size="sm" variant="warning">
          <FaRegEye />
          View
        </Button>
        <Button onClick={(event)=>{openEditProductModal(event, product)}} className="ms-2" size="sm" variant="dark">
          <GrUpdate />
          Update
        </Button>
      </td>
    </tr>
  );
};

export default SingleProductView;
