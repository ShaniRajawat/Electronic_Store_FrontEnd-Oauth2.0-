import { Card, Row, Col, Table, Container, Button } from "react-bootstrap";
import { formatDate } from "../services/helper.service";
import { Link } from "react-router-dom";

const SingleOrderView = ({
    order,
    openOrderViewModal,
    openEditOrderModal
}) => {
  return (
    <Card className="border border-0 shadow mb-5">
      <Card.Body>
        <Row>
          <Col><b>Order Id: </b>{order.orderId}</Col>
          <Col><b>Ordered By: </b><Link to={`/users/profile/${order.user.userId}`} >{order.user.name}</Link></Col>
        </Row>
        <Row>
          <Col>
            <Table bordered striped className={order.paymentStatus === 'PAID' ? "table-success":"table-danger"}>
              <tbody>
              <tr>
                  <td>Billing Name</td>
                  <td>{order.billingName}</td>
                </tr>
                <tr>
                  <td>Billing Phone</td>
                  <td>{order.billingPhone}</td>
                </tr>
                <tr>
                  <td>Items</td>
                  <td>{order.orderItems.length}</td>
                </tr>
                <tr className={ order.paymentStatus === 'NOT_PAID' ? 'table table-danger':'table table-success'}>
                  <td>Payemnt Status</td>
                  <td>{order.paymentStatus}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>{order.orderStatus}</td>
                </tr>
                <tr>
                  <td>Orderd Date</td>
                  <td>{formatDate(order.orderedDate)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container className="text-center">
          {openEditOrderModal && <Button className="me-3" onClick={(event)=>{openEditOrderModal(event, order)}} variant="danger" size="sm">
            Update
          </Button>}
          {(!openEditOrderModal && order.paymentStatus === 'NOT_PAID') && <Button className="me-3" onClick={(event)=>{openEditOrderModal(event, order)}} variant="success" size="sm">
            Pay to Complete Order
          </Button>}
            <Button size="sm" onClick={(event)=>{}} variant="info">
                Order Details
            </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
