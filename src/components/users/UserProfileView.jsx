import { Button, Card, Container, Table } from "react-bootstrap";
import profile from "../../assets/user.png";
import { BASE_URL_R } from "../../services/helper.service";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const UserProfileView = ({ user = null, handleShowModel }) => {
  const { isLogin, userData } = useContext(UserContext);

  const profileStyle = {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  };
  return (
    <>
      {user && (
        <Card className="m-3 border-0 shadow">
          <Card.Body>
            <Container className="text-center my-3">
              <img
                className="border border-dark"
                style={profileStyle}
                src={
                  user.imageName
                    ? BASE_URL_R +
                      `/users/image/` +
                      user.userId +
                      '?' +
                      new Date().getTime()
                    : profile
                }
                alt="Profile"
                onError={(event) => {
                  console.log("error");
                  event.currentTarget.setAttribute("src", profile)
                }}
              />
            </Container>
            <h2 className="text-center text-uppercase fw-bold text-primary">
              {user.name}
            </h2>
            <div className="mt-3">
              <Card
                style={{
                  borderRadius: "40px",
                }}
              >
                <Card.Body>
                  <Table className="text-center" hover borderless responsive>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{user.gender}</td>
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>{user.about}</td>
                      </tr>
                      <tr>
                        <td>Roles</td>
                        <td>
                          {user.roles.map((role) => (
                            <div key={role.roleId}>{role.roleName + ", "}</div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>

            {isLogin && userData.userId === user.userId ? (
              <Container className="text-center mt-3">
                <Button variant="success" size="lg" onClick={handleShowModel}>
                  Update
                </Button>
                <Button className="ms-5" variant="warning" size="lg">
                  Orders
                </Button>
              </Container>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};
export default UserProfileView;
