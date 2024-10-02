import { toast } from "react-toastify";
import { getAllOrdersOfUser } from "../../services/OrderService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Pimage from "../../assets/logo.png";
import {
  Card,
  Col,
  Row,
  Button,
  Container,
  Modal,
  Badge,
  Table,
  ListGroup,
  Alert,
} from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";
import { formatDate, getProductImageUrl } from "../../services/helper.service";

const Order = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);

  //Order View States
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isLogin) {
      loadOrderOfUsers();
    }
  }, [isLogin]);

  const loadOrderOfUsers = async () => {
    try {
      const result = await getAllOrdersOfUser(userData.userId);
      console.log(result);
      setOrders(result);
    } catch (error) {
      toast.error("Error in Getting Orders");
    }
  };

  //view order Modal
  const orderViewModal = (event, order) => {
    return (
      selectedOrder && (
        <>
          <Modal centered size="xl" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <h4 className="text-center display-5">Order Details</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <b>Order Id: </b>
                  {selectedOrder.orderId}
                </Col>
                <Col>
                  <b>Billing Name: </b>
                  {selectedOrder.billingName}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table bordered striped>
                    <tbody>
                      <tr>
                        <td>Billing Phone</td>
                        <td>{selectedOrder.billingPhone}</td>
                      </tr>
                      <tr>
                        <td>Items</td>
                        <td>{selectedOrder.orderItems.length}</td>
                      </tr>
                      <tr
                        className={
                          selectedOrder.paymentStatus === "NOT_PAID"
                            ? "table table-danger"
                            : "table table-success"
                        }
                      >
                        <td>Payemnt Status</td>
                        <td>{selectedOrder.paymentStatus}</td>
                      </tr>
                      <tr>
                        <td>Order Status</td>
                        <td>{selectedOrder.orderStatus}</td>
                      </tr>
                      <tr>
                        <td>Orderd Date</td>
                        <td>{formatDate(selectedOrder.orderedDate)}</td>
                      </tr>
                      <tr>
                        <td>Delivered Date</td>
                        <td>
                          {selectedOrder.deliveredDate
                            ? formatDate(selectedOrder.deliveredDate)
                            : "Not Delivered"}
                        </td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>₹{selectedOrder.orderAmount}</td>
                      </tr>
                      <tr>
                        <td>Billing Address</td>
                        <td>{selectedOrder.billingAddress}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Card>
                    <Card.Body>
                      <h4>Ordered Items</h4>
                      <ListGroup>
                        {selectedOrder.orderItems.map((item) => {
                          return (
                            <ListGroup.Item action key={item.orderItemId}>
                              <Row>
                                <Col md={2}>
                                  <Container className="text-center py-3">
                                    <img
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                      }}
                                      src={
                                        item.product.productImageName
                                          ? getProductImageUrl(
                                              item.product.productId
                                            )
                                          : Pimage
                                      }
                                      alt=""
                                    />
                                  </Container>
                                </Col>
                                <Col md={10}>
                                  <h5>{item.product.title}</h5>
                                  <Badge pill>Quantity: {item.quantity}</Badge>
                                  <Badge pill bg="success" className="ms-2">
                                    Amount for this Item: ₹{item.totalPrice}
                                  </Badge>
                                </Col>
                                <Container className="text-center my-2">
                                  <Button variant="info" size="sm">
                                    View Product
                                  </Button>
                                </Container>
                              </Row>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  //Open View Modal
  const openOrderViewModal = (event, order) => {
    setSelectedOrder(order);
    handleShow();
  };

  const orderView = () => {
    return (
      <div>
        <Card className="shadow">
          <Card.Body>
            <h3 className="display-5 text-center">Previous Orders are Here</h3>
            {/* <InfiniteScroll
              dataLength={orders.content.length}
              next={loadNextPage}
              hasMore={!orders.lastPage}
              loader={<h3 className="text-center my-4">Loading...</h3>}
              endMessage={<p className="text-center my-4">All orders Loaded</p>}
            > */}
            {orders.map((o) => {
              return (
                <SingleOrderView
                  key={o.orderId}
                  order={o}
                  openOrderViewModal={openOrderViewModal}
                />
              );
            })}
            {/* </InfiniteScroll> */}
            {orders.length <= 0 && (
              <Alert className="border border-0 text-center">
                <h3>No items in your order</h3>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Row>
        <Col
          md={{
            span: 9,
            offset: 2,
          }}
        >
          {orderView()}
          {orderViewModal()}
        </Col>
      </Row>
    </>
  );
};

export default Order;
