import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWithoutCategory,
} from "../../services/product.service";
import { getCategories } from "../../services/category.service";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");
  const [categories, setCategories] = useState(undefined);

  const editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error on loading categories");
      });
  }, []);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    brandName: "",
    imageName: undefined,
    preview: undefined,
  });

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);

    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          preview: r.target.result,
          imageName: event.target.files[0],
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File type");
      setProduct({
        ...product,
        imageName: undefined,
        preview: undefined,
      });
    }
  };

  const clearForm = () => {
    editorRef.current.setContent("");

    setProduct({
      title: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      quantity: 1,
      live: false,
      stock: true,
      brandName: "",
      imageName: undefined,
      preview: undefined,
    });
  };

  //Add Product and Image by API
  const submitAddProfuctFormn = (event) => {
    event.preventDefault();

    //Validation
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title is required !!");
      return;
    }

    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("Description is required !!");
      return;
    }

    if (product.price <= 0) {
      toast.error("Invalid Price !!");
      return;
    }

    if (
      product.discountedPrice <= 0 ||
      product.discountedPrice >= product.price
    ) {
      toast.error("Invalid Discounted Price Price !!");
      return;
    }

    if (selectedCategoryId === "none") {
      createProductWithoutCategory(product)
        .then((data) => {
          console.log(data);
          toast.success("Product is added");
          if (!product.imageName) {
            clearForm();
            return;
          }
          //Image Upload
          addProductImage(product.imageName, data.productId)
            .then((data1) => {
              console.log(data1);
              toast.success("Image Uploaded");
              clearForm();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Image is not Uploaded");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Adding Product");
        });
    } else {
      // create product wth in Category
      createProductInCategory(product, selectedCategoryId)
        .then((data) => {
          console.log(data);
          toast.success("Product is added");
          if (!product.imageName) {
            clearForm();
            return;
          }
          //Image Upload
          addProductImage(product.imageName, data.productId)
            .then((data1) => {
              console.log(data1);
              toast.success("Image Uploaded");
              clearForm();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Image is not Uploaded");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Adding Product");
        });
    }
  };

  const formView = () => {
    return (
      <>
        <Card className="border border-0 shadow">
          <Card.Body>
            <h5>Add Product Here</h5>
            <Form onSubmit={submitAddProfuctFormn}>
              {/* Product Title */}
              <Form.Group className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      title: event.target.value,
                    })
                  }
                  value={product.title}
                />
              </Form.Group>
              {/* Product Description */}
              <Form.Group className="mt-3">
                <Form.Label>Product Description</Form.Label>
                {/* <Form.Control
                  rows={6}
                  as={"textarea"}
                  placeholder="Enter Here"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      description: event.target.value,
                    })
                  }
                  value={product.description}
                /> */}
                <Editor
                  apiKey="fpjho4b4e70cqz0j7xcst67gq26yofhwrg1kb54c9m5651in"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="Add Product Description Here"
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
                  onEditorChange={() =>
                    setProduct({
                      ...product,
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
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          price: event.target.value,
                        })
                      }
                      value={product.price}
                      type="number"
                      placeholder="Enter Here"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* Product Discounted Price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        if (event.target.value > product.price) {
                          toast.error(
                            "Invalid Discounted Price It should be less than price"
                          );
                          return;
                        }
                        setProduct({
                          ...product,
                          discountedPrice: event.target.value,
                        });
                      }}
                      value={product.discountedPrice}
                      type="number"
                      placeholder="Enter Here"
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
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          quantity: event.target.value,
                        })
                      }
                      value={product.quantity}
                      type="number"
                      placeholder="Enter Here"
                    />
                  </Form.Group>{" "}
                </Col>
                <Col>
                  {/* Brand Name */}
                  <Form.Group className="mt-3">
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          brandName: event.target.value,
                        })
                      }
                      value={product.brandName}
                      type="text"
                      placeholder="Enter Brand name Here"
                    />
                  </Form.Group>{" "}
                </Col>
              </Row>

              <Row className="mt-3 px-1">
                <Col>
                  <Form.Check
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                    checked={product.live}
                    value={true}
                    type="switch"
                    label={"Live"}
                  />
                </Col>
                <Col>
                  <Form.Check
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                    checked={product.stock}
                    value={true}
                    type="switch"
                    label={"Stock"}
                  />
                </Col>
                {/* Product Image */}
                <Form.Group>
                  <Container className="text-center py-4 border border-3">
                    <p className="text-muted">Image Preview</p>
                    <img
                      style={{
                        maxHeight: "250px",
                      }}
                      className="img-fluid"
                      src={product.preview}
                      alt=""
                    />
                  </Container>
                  <Form.Label>Product Image</Form.Label>
                  <InputGroup>
                    <Form.Control
                      onChange={(event) => handleFileChange(event)}
                      type={"file"}
                    />
                    <Button
                      onClick={() => {
                        setProduct({
                          ...product,
                          preview: undefined,
                          imageName: undefined,
                        });
                      }}
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
                    // value={selectedCategoryId}
                    onChange={(event) =>
                      setSelectedCategoryId(event.target.value)
                    }
                  >
                    <option value="none">None</option>
                    {categories ? (
                      <>
                        {categories.content.map((cat) => (
                          <option value={cat.categoryId} key={cat.categoryId}>
                            {cat.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Container className="text-center mt-3">
                <Button type="submit" variant="success" size="sm">
                  Add Product
                </Button>
                <Button
                  onClick={clearForm}
                  className="ms-2"
                  variant="warning"
                  size="sm"
                >
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};
export default AddProduct;
