import { Badge, Card, Col, Row } from "react-bootstrap";
import { getUserImageUrl } from "../services/helper.service";
import defaultImage from "../assets/user.png";
import { Link } from "react-router-dom";

const SingleUserView = ({ user }) => {
  return (
    <div>
      <Card>
        <Card.Body className="mt-3 border border-0 shadow">
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <div>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  className="rounded-circle"
                  src={
                    user.imageName ? getUserImageUrl(user.userId) : defaultImage
                  }
                  alt=""
                  onError={(event) => {
                    console.log("error");
                    event.currentTarget.setAttribute("src", defaultImage)
                  }}
                />
              </div>
            </Col>
            <Col md={11} className="ps-4">
              <Link to={`/users/profile/`+user.userId}><h5>{user.name}</h5></Link>
              <p className="text-muted">{user.about}</p>
              <p className="text-muted">{user.email}</p>
            {
                user.roles.map(role=>{
                    return(
                        <Badge key={role.roleId} pill className="mx-2">{role.roleName}</Badge>
                    )
                })
            }
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleUserView;
