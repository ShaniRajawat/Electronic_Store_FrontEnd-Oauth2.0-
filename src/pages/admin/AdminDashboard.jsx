import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";

const AdminDashboard = () => {
  const userContext = useContext(UserContext);

  const dashboardView = () => {
    return (
      <div>
        <Container className="p-5">
          <Row>
            <Col
              md={{
                span: 2,
              }}
              className=""
            >
              <SideMenu />
            </Col>
            <Col md={9} className="ps-3 pt-2">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return isAdminUser() ? dashboardView() : <Navigate to={"/admin/home"} />;
};
export default AdminDashboard;
