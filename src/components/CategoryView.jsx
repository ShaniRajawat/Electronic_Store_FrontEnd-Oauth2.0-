import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Image from "../assets/logo.png";

const CategoryView = ({ category, deleteCat, viewCat, updateCat }) => {
  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };

  const deleteCategory=(categoryId)=>{
    deleteCat(categoryId);
  }
  return (
    <div className="mb-3">
      <Card className="border border-0 shadow">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2}>
              <img
                src={
                  category.coverImage
                    ? category.coverImage.startsWith("http")
                      ? category.coverImage
                      : Image
                    : Image
                }
                style={imageStyle}
                alt=""
              />
            </Col>
            <Col md={8}>
              <h4>{category.title}</h4>
              <p>{category.description}</p>
            </Col>
            <Col md={2}>
              <Container className="d-grid gap-2">
                <Button onClick={(event)=>deleteCategory(category.categoryId)} size="sm" variant="danger">
                  Delete
                </Button>
                <Button onClick={(event)=>viewCat(category)} className="mt-2" size="sm" variant="info">
                  View
                </Button>
                <Button onClick={(event)=>updateCat(category)} className="mt-2" size="sm" variant="success">
                  Update
                </Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryView;
