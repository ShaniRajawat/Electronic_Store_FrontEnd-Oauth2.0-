import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
  Pagination,
  Button,
  Modal,
  InputGroup,
} from "react-bootstrap";
import {
  addProductImage,
  getAllProducts,
  updateProduct,
  updateProductCategory,
} from "../../services/product.service";
import { getCategories } from "../../services/category.service";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import {
  PRODUCT_PAGE_SIZE,
  getProductImageUrl,
} from "../../services/helper.service";
import Pimage from "../../assets/logo.png";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const ViewProducts = () => {
  //All products State
  const [products, setProducts] = useState(undefined);

  //Single Product state
  const [currentProduct, setCurrentProduct] = useState(undefined);

  //for Edit Categories
  const [categories, setCategories] = useState(undefined);

  //for Image
  const [imageUpdate, setImageUpdate] = useState({
    preview: undefined,
    imageName: undefined,
  });
  const [categoryChangeId, setCategoryChangeId] = useState("");

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Edit desc
  const editorRef = useRef();

  //#Start View Product Variable & State
  const [show, setShow] = useState(false);

  const handleProductClose = () => {
    setShow(false);
  };

  const handleProductOpen = (event, product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  //#End View Product Variable & State

  //#Start Edit Product Variable & State

  const [showEditModal, setShowEditModal] = useState(false);

  const closeEditProductModal = (event, product) => {
    setShowEditModal(false);
  };

  const openEditProductModal = (event, product) => {
    setCurrentProduct(product);
    // editorRef.current.setContent(product.description);
    setShowEditModal(true);
  };

  //#End Edit Product Variable & State

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = (
    pageNumber = 0,
    pageSize = PRODUCT_PAGE_SIZE,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProducts({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);

    if (event.target.files[0].type === "image/jpeg") {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImageUpdate({
          preview: r.target.result,
          imageName: event.target.files[0],
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File type");
      setImageUpdate({
        imageName: undefined,
        preview: undefined,
      });
    }
  };

  // handleUpdateFormSubmit
  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    //Validation
    if (
      currentProduct.title === undefined ||
      currentProduct.title.trim() === ""
    ) {
      toast.error("Title is required !!");
      return;
    }

    if (
      currentProduct.description === undefined ||
      currentProduct.description.trim() === ""
    ) {
      toast.error("Description is required !!");
      return;
    }

    if (currentProduct.price <= 0) {
      toast.error("Invalid Price !!");
      return;
    }

    if (
      currentProduct.discountedPrice <= 0 ||
      currentProduct.discountedPrice >= currentProduct.price
    ) {
      toast.error("Invalid Discounted Price Price !!");
      return;
    }

    updateProduct(currentProduct, currentProduct.productId).then((data) => {
      console.log(data);

      toast("Product is Updated");
      //update Image with Product

      if (imageUpdate.imageName && imageUpdate.preview) {
        addProductImage(imageUpdate.imageName, currentProduct.productId)
          .then((imageData) => {
            console.log(imageData);
            setCurrentProduct({
              ...currentProduct,
              productImageName: imageData.imageName,
            });
            toast.success("Image Uploaded");
            setImageUpdate({
              imageName: undefined,
              preview: undefined,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in uploading");
          });
      }

      //Category Update
      if (
        categoryChangeId === "none" ||
        categoryChangeId === currentProduct.category?.categoryId
      ) {
      } else {
        updateProductCategory(categoryChangeId, currentProduct.productId)
          .then((catdata) => {
            console.log(catdata);
            toast.success("Catrgory Updated");

            setCurrentProduct({
              ...currentProduct,
              category: catdata.category,
            });

            const newArray = products.content.map((p) => {
              if (p.productId === currentProduct.productId) {
                return catdata;
              }
              return p;
            });
      
            setProducts({
              ...products,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in Updating Category");
          });
      }

      const newArray = products.content.map((p) => {
        if (p.productId === currentProduct.productId) {
          return data;
        }
        return p;
      });

      setProducts({
        ...products,
        content: newArray,
      });
    });
  };

  const updateProductList = (productId) => {
    const newArray = products.content.filter((p) => p.productId !== productId);
    setProducts({
      ...products,
      content: newArray,
    });
  };

  //Update Product Modal
  const editProductViewModal = () => {
    return (
      currentProduct && (
        <>
          <Modal
            centered
            size="xl"
            show={showEditModal}
            onHide={closeEditProductModal}
          >
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {JSON.stringify(currentProduct)} */}
              <Card className="border border-0 shadow">
                <Card.Body>
                  <Form onSubmit={handleUpdateFormSubmit}>
                    {/* Product Title */}
                    <Form.Group className="mt-3">
                      <Form.Label>Product Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Here"
                        value={currentProduct.title}
                        onChange={(event) =>
                          setCurrentProduct({
                            ...currentProduct,
                            title: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    {/* Product Description */}
                    <Form.Group className="mt-3">
                      <Form.Label>Product Description</Form.Label>
                      <Editor
                        apiKey="fpjho4b4e70cqz0j7xcst67gq26yofhwrg1kb54c9m5651in"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        disabled={false}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help",
                        }}
                        value={currentProduct.description}
                        onEditorChange={(event) =>
                          setCurrentProduct({
                            ...currentProduct,
                            description: editorRef.current.getContent(),
                          })
                        }
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        {/* Product Price */}
                        <Form.Group className="mt-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Here"
                            value={currentProduct.price}
                            onChange={(event) =>
                              setCurrentProduct({
                                ...currentProduct,
                                price: event.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        {/* Product Discounted Price */}
                        <Form.Group className="mt-3">
                          <Form.Label>Discounted Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Here"
                            value={currentProduct.discountedPrice}
                            onChange={(event) =>
                              setCurrentProduct({
                                ...currentProduct,
                                discountedPrice: event.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 px-1">
                      <Col>
                        {/* Probuct Quantity */}
                        <Form.Group className="mt-3">
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Here"
                            value={currentProduct.quantity}
                            onChange={(event) =>
                              setCurrentProduct({
                                ...currentProduct,
                                quantity: event.target.value,
                              })
                            }
                          />
                        </Form.Group>{" "}
                      </Col>
                      <Col>
                        {/* Brand Name */}
                        <Form.Group className="mt-3">
                          <Form.Label>Brand Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Brand name Here"
                            value={currentProduct.brandName}
                            onChange={(event) =>
                              setCurrentProduct({
                                ...currentProduct,
                                brandName: event.target.value,
                              })
                            }
                          />
                        </Form.Group>{" "}
                      </Col>
                    </Row>

                    <Row className="mt-3 px-1">
                      <Col>
                        <Form.Check
                          value={true}
                          type="switch"
                          label={"Live"}
                          checked={currentProduct.live}
                          onChange={(event) =>
                            setCurrentProduct({
                              ...currentProduct,
                              live: !currentProduct.live,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          value={true}
                          type="switch"
                          label={"Stock"}
                          checked={currentProduct.stock}
                          onChange={(event) =>
                            setCurrentProduct({
                              ...currentProduct,
                              stock: !currentProduct.stock,
                            })
                          }
                        />
                      </Col>
                      {/* Product Image */}
                      <Form.Group className="my-5">
                        <Container className="text-center py-4 border border-3">
                          <p className="text-muted">Image Preview</p>
                          <img
                            className="img-fluid"
                            style={{
                              maxHeight: "250px",
                            }}
                            src={
                              imageUpdate.preview
                                ? imageUpdate.preview
                                : getProductImageUrl(currentProduct.productId)
                            }
                            alt=""
                          />
                        </Container>
                        <Form.Label>Product Image</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={"file"}
                            onChange={(event) => {
                              handleFileChange(event);
                            }}
                          />
                          <Button
                            onClick={(event) =>
                              setImageUpdate({
                                preview: undefined,
                                imageName: undefined,
                              })
                            }
                            variant="outline-secondary"
                          >
                            Clear
                          </Button>
                        </InputGroup>
                      </Form.Group>
                      {/* {JSON.stringify(selectedCategoryId)} */}
                      <Form.Group className="mt-3">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                          onChange={(event) => {
                            setCategoryChangeId(event.target.value);
                          }}
                        >
                          <option value="none">None</option>
                          {categories &&
                            categories.content.map((cat) => {
                              return (
                                <option
                                  value={cat.categoryId}
                                  key={cat.categoryId}
                                  selected={
                                    cat.categoryId ===
                                    currentProduct.category?.categoryId
                                  }
                                >
                                  {cat.title}
                                </option>
                              );
                            })}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Container className="text-center">
                      <Button
                        variant="secondary"
                        onClick={closeEditProductModal}
                      >
                        Close
                      </Button>
                      <Button type="submit" className="ms-3" variant="primary">
                        Save Details
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Modal.Body>
          </Modal>
        </>
      )
    );
  };

  //Single Product View
  const productModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal size={"xl"} centered show={show} onHide={handleProductClose}>
            <Modal.Header>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow">
                <Card.Body>
                  {/* Product image */}
                  <Container className="text-center py-3">
                    <img
                      style={{
                        height: "400px",
                      }}
                      src={
                        currentProduct.productImageName
                          ? getProductImageUrl(currentProduct.productId)
                          : Pimage
                      }
                      alt=""
                    />
                  </Container>
                  {/* Information Table */}

                  <Table striped bordered responsive className="text-center">
                    <thead>
                      <tr>
                        <td>Info</td>
                        <td className="fw-bold">Value</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product ID</td>
                        <td className="fw-bold">{currentProduct.productId}</td>
                      </tr>
                      <tr>
                        <td>Qauntity</td>
                        <td className="fw-bold">{currentProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>MRP</td>
                        <td className="fw-bold">₹{currentProduct.price}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td className="fw-bold">
                          ₹{currentProduct.discountedPrice}
                        </td>
                      </tr>
                      <tr className={currentProduct.live ? "" : "table-danger"}>
                        <td>Live</td>
                        <td className="fw-bold">
                          {currentProduct.live ? "True" : "False"}
                        </td>
                      </tr>
                      <tr
                        className={currentProduct.stock ? "" : "table-danger"}
                      >
                        <td>Stock</td>
                        <td className="fw-bold">
                          {currentProduct.stock ? "In stock" : "Out of Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td className="fw-bold">
                          {currentProduct.category
                            ? currentProduct.category.title
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* description */}
                  <div className="p-3 border border-0">
                    <ShowHtml htmlText={currentProduct.description} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Container className="text-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleProductClose}
                >
                  Close
                </Button>
              </Container>
              {/* <Button variant="primary" onClick={handleProductClose}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  //All Products View
  const productsView = () => {
    return (
      <Card className="shadow">
        <Card.Body>
          <h4 className="text-center mb-2 display-4">Products</h4>

          <Form.Group>
            <Form.Control type="text" placeholder="Search Product here" />
          </Form.Group>

          <div className="table-responsive">
            <Table striped hover bordered size="lg">
              <thead>
                <tr className="text-center">
                  <td className="px-2">#SN</td>
                  <td className="px-2">Title</td>
                  <td className="px-2">Quantity</td>
                  <td className="px-2">MRP</td>
                  <td className="px-2">Price</td>
                  <td className="px-2">Live</td>
                  <td className="px-2">Stock</td>
                  <td className="px-2">Category</td>
                  <td className="px-2">Date</td>
                  <td className="px-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {products.content.map((product, index) => (
                  <SingleProductView
                    key={index}
                    index={index}
                    product={product}
                    updateProductList={updateProductList}
                    handleProductOpen={handleProductOpen}
                    openEditProductModal={openEditProductModal}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <Container className="d-flex justify-content-end">
            <Pagination>
              {/* A loop for Product page */}
              <Pagination.Prev
                onClick={() => {
                  if (products.pageNumber - 1 < 0) {
                    return;
                  }
                  getAllProduct(
                    products.pageNumber - 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "asc"
                  );
                }}
              />
              {[...Array(products.totalPages)]
                .map((ob, i) => i) // Creating the array
                .map((item) => {
                  return products.pageNumber === item ? (
                    <Pagination.Item active key={item}>
                      {item + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={() => {
                        getAllProduct(
                          item,
                          PRODUCT_PAGE_SIZE,
                          "addedDate",
                          "asc"
                        );
                      }}
                      key={item}
                    >
                      {item + 1}
                    </Pagination.Item>
                  );
                })}
              <Pagination.Next
                onClick={() => {
                  if (products.lastPage) {
                    return;
                  }
                  getAllProduct(
                    products.pageNumber + 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "asc"
                  );
                }}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>{products ? productsView() : ""}</Col>
        </Row>
      </Container>
      {productModalView()}
      {editProductViewModal()}
    </div>
  );
};

export default ViewProducts;
