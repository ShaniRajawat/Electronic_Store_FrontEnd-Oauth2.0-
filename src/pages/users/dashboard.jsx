import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../auth/HelperAuth";

const Dashboard = () => {
  //logged in View
  const dashboardView = () => {
    return (
      <div>
        {/* <h1>this is user dashboard</h1> */}

        {/* nested */}
        <Outlet />
      </div>
    );
  };

  // //not logged in view
  // const notLoggedinView = () => {
  //   return (
  //     <Container>
  //       <Row>
  //         <Col
  //           md={{
  //             span: 8,
  //             offset: 2,
  //           }}
  //         >
  //           <Card className="border-0 shadow">
  //             <CardBody className="text-center">
  //               <h3>You are not Logged In</h3>
  //               <p>Please do Login to view</p>
  //               <Button as={NavLink} to={"/Login"} variant="success">
  //                 Login now
  //               </Button>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // };
  return isLoggedIn() ? dashboardView() : <Navigate to={"/login"} />;
};

export default Dashboard;
