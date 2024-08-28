import { useState } from "react";
import { Button, Card, Container, Form, FormGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/product.service";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setCategory({
      ...category,
      [property]: event.target.value,
    });
  };

  const [loading, setLoading]=useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    console.log(category);
    if (category.title === undefined || category.title.trim() === "") {
      toast.error("Category Title required");
      return;
    }
    if (category.description === undefined || category.description.trim() === "") {
      toast.error("Description Title required");
      return;
    }

    // Call server API to add the category
    setLoading(true);
    addCategory(category)
      .then((data) => {
        toast.success("Category added !!!");
        console.log(data);
        setCategory({
            title: "",
            description: "",
            coverImage: "",
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in adding category !!");
      })
      .finally(()=>{
        setLoading(false);
      })
  };

  const handleClearForm = (event) => {
    event.preventDefault();
    setCategory({
      title: "",
      description: "",
      coverImage: "",
    });
  };

  return (
    <div>
      <Container fluid>
        <Card className="border border-0 shadow">
          {/* {JSON.stringify(category)} */}
          <Card.Body>
            <h5>Add Category Here</h5>

            <Form onSubmit={handleFormSubmit}>
              <FormGroup className="mt-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={category.title}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  rows={6}
                  as={"textarea"}
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, "description")}
                  value={category.description}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Category Cover image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                  value={category.coverImage}
                />
              </FormGroup>
              <Container className="text-center mt-2">
                <Button disabled={loading} type="submit" variant="success" size="sm">

                    <Spinner
                        variant={'border'}
                        size={'sm'}
                        className="me-2"
                        hidden={!loading}
                    />
                    <span hidden={!loading}> Please Wait..</span>
                    <span hidden={loading}>Add Category</span>
                </Button>
                <Button
                  className="ms-3"
                  variant="danger"
                  size="sm"
                  onClick={handleClearForm}
                >
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddCategory;
