import { useEffect, useState } from "react";
import CategoryView from "../../components/CategoryView";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/category.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Container, Spinner, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategory = () => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [currentPage, setCurrentPage] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(undefined);

  //Loader
  const [loading, setloading] = useState(false);

  //Modal States(view)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal States(update)
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  useEffect(() => {
    setloading(true);
    getCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading categories from server !!");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getCategories(currentPage)
        .then((data) => {
          console.log(data);
          setCategories({
            content: [...categories.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Loading categories from server !!");
        });
    }
  }, [currentPage]);

  //delete category manFunction
  const deleteCategoryMain = (categoryId) => {
    //sweat Alert
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
        deleteCategory(categoryId)
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
            });
            //Category Update after deletation
            const newArray = categories.content.filter((c) => {
              return c.categoryId !== categoryId;
            });

            setCategories({
              ...categories,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting category");
          });
      }
    });
  };

  // handle View Button of Category
  const handleView = (category) => {
    setSelectedCategory(category);
    handleShow();
  };

  //handle update of category
  const handleUpdate = (category) => {
    setSelectedCategory(category);
    handleShowUpdate();
  };

  //Load next Page
  const loadNextPage = () => {
    console.log("Loading Next Page")
    setCurrentPage(currentPage + 1);
  };

  //handle update Category
  const updateCategoryFun = (event) => {
    event.preventDefault();
    if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("Title Required !!!");
      return;
    }

    if (
      selectedCategory.description === undefined ||
      selectedCategory.description.trim() === ""
    ) {
      toast.error("Description Required !!!");
      return;
    }

    updateCategory(selectedCategory)
      .then((data) => {
        console.log(data);
        toast.success("Updated Successfully");

        const newCategories = categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }

          return cat;
        });

        setCategories({
          ...categories,
          content: newCategories,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Updating");
      });
  };

  //update model
  const ModalUpdate = () => {
    return (
      <>
        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {selectedCategory.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Category Title</Form.Label>
                  <Form.Control
                    value={selectedCategory.title}
                    type="text"
                    placeholder="Enter"
                    onChange={(event) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        title: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Category Description</Form.Label>
                  <Form.Control
                    rows={6}
                    value={selectedCategory.description}
                    as={"textarea"}
                    onChange={(event) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        description: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Container className="py-3">
                    <img
                      // style={{ width: 400, height: 300, objectFit: "contain" }}
                      className="img-fluid"
                      src={selectedCategory.coverImage}
                    />
                  </Container>
                  <Form.Label>Category Image Url</Form.Label>
                  <Form.Control
                    value={selectedCategory.coverImage}
                    type="text"
                    placeholder="Enter"
                    onChange={(event) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        coverImage: event.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="success" onClick={updateCategoryFun}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //model view
  const ModalView = () => {
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Container className="text-center">
              <img
                style={{ width: 400, height: 300, objectFit: "contain" }}
                src={selectedCategory.coverImage}
              />

              <Modal.Title id="contained-modal-title-vcenter">
                {selectedCategory.title}
              </Modal.Title>
            </Container>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedCategory.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {/* Loader */}
      <Container className="text-center p-3" hidden={!loading}>
        <Spinner />
        <div>
          <h3>Loading...</h3>
        </div>
      </Container>
      {categories.content.length > 0 ? (
        <div>
          <InfiniteScroll
            dataLength={categories.content.length}
            next={loadNextPage}
            hasMore={!categories.lastPage}
            loader={<h2 className="p-2 text-center">Loading...</h2>}
          >
            {categories.content.map((category) => {
              return (
                <CategoryView
                  viewCat={handleView}
                  updateCat={handleUpdate}
                  deleteCat={deleteCategoryMain}
                  category={category}
                  key={category.categoryId}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      ) : (
        <h4 hidden={loading} className="text-center">
          No Category in database Please Add one
        </h4>
      )}
      {selectedCategory ? ModalView() : ""}
      {selectedCategory ? ModalUpdate() : ""}
    </div>
  );
};

export default ViewCategory;
