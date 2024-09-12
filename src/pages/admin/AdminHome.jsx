import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { IoReorderFour } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DashBoardCardView from "../../components/DashBoardCardView";

const AdminHome = () => {
  return (
    <Container>
      <Row>
        <Col
          md={{
            span: 8,
            offset: 2,
          }}
        >
          <Card className="shadow">
            <Card.Body className="text-center">
              <h3 className="text-center">Welcome to admin Dashboard</h3>
              <p>
                Customise Dashboard For Admin, To add Categories , Product and
                Manage User, Categories, Order and Products and Do amny more
                things
              </p>
              <p>Start with Managing Products</p>
              <Container className="d-grid gap-2">
                <Button
                  as={Link}
                  to={`/admin/categories`}
                  variant="outline-secondary"
                >
                  Start Managing Categories
                </Button>
                <Button
                  as={Link}
                  to={`/admin/products`}
                  variant="outline-secondary"
                >
                  Start Managing Products
                </Button>
                <Button
                  as={Link}
                  to={`/admin/users`}
                  variant="outline-secondary"
                >
                  Start Managing Users
                </Button>
                <Button
                  as={Link}
                  to={`/admin/orders`}
                  variant="outline-secondary"
                >
                  Start Managing Orders
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <DashBoardCardView
            icon={<AiFillProduct size={80} />}
            text={"Number of Products"}
            number={345}
          />
        </Col>
        <Col md={6}>
          <DashBoardCardView
            icon={<MdOutlineCategory size={80} />}
            text={"Number of Categories"}
            number={4}
          />
        </Col>
        <Col className="mt-3" md={6}>
          <DashBoardCardView
            icon={<IoReorderFour size={80} />}
            text={"Number of Orders"}
            number={29}
          />
        </Col>
        <Col className="mt-3" md={6}>
          <DashBoardCardView
            icon={<FaRegUser size={80} />}
            text={"Number of Users"}
            number={9}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default AdminHome;
