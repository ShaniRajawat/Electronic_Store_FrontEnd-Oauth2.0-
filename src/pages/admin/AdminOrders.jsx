import { useEffect } from "react";
import { useState } from "react";
import { getAllOrders, updateOrder } from "../../services/OrderService";
import {
  ADMIN_ORDER_PAGE_SIZE,
  formatDate,
} from "../../services/helper.service";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Container,
  Table,
  ListGroup,
  Badge,
  Form,
} from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";
import Pimage from "../../assets/logo.png";
import { getProductImageUrl } from "../../services/helper.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);

  const [selectedOrder, setSelectedOrder] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);

  //Order View States
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Edit Order View States
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  //Open View Modal
  const openOrderViewModal = (event, order) => {
    setSelectedOrder(order);
    handleShow();
  };

  useEffect(() => {
    getOrdersLocally();
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getOrdersLocally();
    }
  }, [currentPage]);

  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders(
        currentPage,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "asc"
      );
      console.log(data);
      if (currentPage == 0) {
        setOrdersData(data);
      } else {
        setOrdersData({
          content: [...ordersData.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      }
    } catch (error) {
      console.log("Error Occured");
      console.log(error);
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

  //load data of the Next Page
  const loadNextPage = () => {
    console.log("Loading next Page");
    setCurrentPage(currentPage + 1);
  };

  //Edit Order Function
  const openEditOrderModal = (event, order) => {
    console.log("View Modal edit");
    setSelectedOrder({ ...order });
    handleEditShow();
  };

  //Handle UPdate using Server
  const handleOrderUpdate = async (event) => {
    event.preventDefault();

    if (
      selectedOrder.billingName.trim() === "" ||
      selectedOrder.billingName === undefined
    ) {
      toast.error("Name required");
    }

    if (
      selectedOrder.billingAddress.trim() === "" ||
      selectedOrder.billingAddress === undefined
    ) {
      toast.error("Address required");
    }

    if (
      selectedOrder.billingName.trim() === "" ||
      selectedOrder.billingName === undefined
    ) {
      toast.error("Name required");
    }

    try {
      const data = await updateOrder(selectedOrder, selectedOrder.orderId);
      toast.success(" Order Updated");
      const newList = ordersData.content.map((item) => {
        if (item.orderId === selectedOrder.orderId) {
          return data;
        } else return item;
      });

      setOrdersData({
        ...ordersData,
        content: newList,
      });
    } catch (error) {
      console.log(error);
      toast.success(" Order is Not Updated");
    }
  };

  //Update or Edit Order Modal
  const updateOrderModal = () => {
    return (
      selectedOrder && (
        <>
          <Modal size="xl" show={editShow} onHide={handleEditClose}>
            <Modal.Header>
              <Modal.Title>
                <h4 className="display-5 text-center">Update Order</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="border border-0 shadow">
                <Card.Body>
                  <Form onSubmit={handleOrderUpdate}>
                    {/* Billing Name */}
                    <Form.Group>
                      <Form.Label>Billing Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedOrder.billingName}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingName: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {/* Billing Phone Number */}
                    <Form.Group>
                      <Form.Label>Billing Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedOrder.billingPhone}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingPhone: event.target.value,
                          });
                        }}
                      />
                      {/* Billing address */}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Billing Address</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        rows={5}
                        value={selectedOrder.billingAddress}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingAddress: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        {/* Payemnt Status */}
                        <Form.Group>
                          <Form.Label>Payemnt Status</Form.Label>
                          <Form.Select
                            onChange={(event) => {
                              setSelectedOrder({
                                ...selectedOrder,
                                paymentStatus: event.target.value,
                              });
                            }}
                          >
                            <option
                              selected={
                                selectedOrder.paymentStatus === "NOT_PAID"
                              }
                              value="NOT_PAID"
                            >
                              NOT_PAID
                            </option>
                            <option
                              selected={selectedOrder.paymentStatus === "PAID"}
                              value="PAID"
                            >
                              PAID
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        {/* Order Status */}
                        <Form.Group>
                          <Form.Label>Order Status</Form.Label>
                          <Form.Select
                            onChange={(event) => {
                              setSelectedOrder({
                                ...selectedOrder,
                                orderStatus: event.target.value,
                              });
                            }}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="DISPATCHED">DISPATCHED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Order Delivered Date */}
                    <Form.Group>
                      <Form.Label>Select Date</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            deliveredDate: event.target.value,
                          });
                        }}
                      />
                      <p className="text-muted">Format : YY-MM-DD</p>
                    </Form.Group>
                    <Container className="text-center">
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Container className="text-center">
                <Button variant="secondary" onClick={handleEditClose}>
                  Close
                </Button>
              </Container>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  const orderView = () => {
    return (
      <div>
        <Card className="shadow">
          <Card.Body>
            <h3 className="display-5 text-center">All Orders are Here</h3>
            <InfiniteScroll
              dataLength={ordersData.content.length}
              next={loadNextPage}
              hasMore={!ordersData.lastPage}
              loader={<h3 className="text-center my-4">Loading...</h3>}
              endMessage={<p className="text-center my-4">All orders Loaded</p>}
            >
              {ordersData.content.map((o) => {
                return (
                  <SingleOrderView
                    key={o.orderId}
                    order={o}
                    openOrderViewModal={openOrderViewModal}
                    openEditOrderModal={openEditOrderModal}
                  />
                );
              })}
            </InfiniteScroll>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Container>
        {/* {JSON.stringify(selectedOrder)} */}
        <Row>
          <Col>
            {ordersData && orderView()}
            {orderViewModal()}
            {updateOrderModal()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminOrders;
