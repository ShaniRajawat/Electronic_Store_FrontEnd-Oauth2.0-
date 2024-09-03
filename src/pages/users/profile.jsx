import {
  Container,
  Row,
  Col,
  Alert,
  Modal,
  Button,
  Card,
  Table,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import {
  getUser,
  updateUser,
  updateUserProfilepic,
} from "../../services/user.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import defaultImage from "../../assets/user.png";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  //Modals States
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModel = () => setShow(true);

  //State to handle Loding for button
  const [updateLoading, setUpdateLoading] = useState(false);

  //State to handle Image Update
  const [image, setImage] = useState({
    placeholder: defaultImage,
    file: null,
  });

  useEffect(() => {
    if (userContext.userData) {
      getUserData();
    }
  }, [userContext.userData]);

  const getUserData = () => {
    getUser(userId)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in Loading in Data");
      });
  };

  const updateFeildHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  //Function for image Change

  const handleProfileImage = (event) => {
    console.log(event.target.files[0]);

    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });

        console.log(r.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File type");
      image.file = null;
    }
  };

  //Update user data and Image Both by API
  const updateUserData = () => {
    console.log("Updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }
    if (user.about === undefined || user.about.trim() === "") {
      toast.error("About is required !!");
      return;
    }
    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User Details Updated");
        //update Image
        if (image.file === null) {
          setUpdateLoading(false);
          handleClose();
          return;
        }
        updateUserProfilepic(image.file, user.userId)
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded");
          })
          .finally(() => {
            setUpdateLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        // if(error.response.status===400){
        //   toast.error(error.response.data.name)
        // }
        toast.error("Not updated !! Error");
        setUpdateLoading(false);
      });
  };

  //ClearImage

  const clearImage =()=>{
    setImage({
      placeholder: defaultImage,
      file:null
    })
  }

  //update view
  const updateViewModal = () => {
    return (
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update the Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              style={{
                borderRadius: "40px",
              }}
            >
              <Card.Body>
                <Table className="text-center" hover borderless responsive>
                  <tbody>
                    <tr>
                      <td>Profile Image</td>
                      <td>
                        <Container className="text-center mb-3">
                          {/* image for the preview */}
                          <img
                            style={{
                              objectFit: "cover",
                            }}
                            src={image.placeholder}
                            width={150}
                            height={150}
                            alt=""
                          />
                        </Container>
                        <InputGroup>
                          <Form.Control
                            type="file"
                            onChange={handleProfileImage}
                          />
                          <Button variant="outline-secondary" onClick={clearImage}>
                            Clear
                          </Button>
                        </InputGroup>
                        <p className="mt-2 text-muted">
                          Select Square size image for better UI
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={user.name}
                          onChange={(event) =>
                            updateFeildHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>New Password</td>
                      <td>
                        <Form.Control
                          type="password"
                          placeholder="Enter new Password here"
                          onChange={(event) =>
                            updateFeildHandler(event, "password")
                          }
                        />
                        <p>Leave the field blank for same password</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{user.gender}</td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          className="text-center"
                          as={"textarea"}
                          value={user.about}
                          onChange={(event) =>
                            updateFeildHandler(event, "about")
                          }
                        />
                      </td>
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
          </Modal.Body>
          <Modal.Footer>
            <Container className="text-center mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                className="ms-4"
                onClick={updateUserData}
                disabled={updateLoading}
              >
                <Spinner
                  animation="border"
                  size="sm"
                  hidden={!updateLoading}
                  className="me-2"
                />
                <span hidden={!updateLoading}>Updating</span>
                <span hidden={updateLoading}>Save Changes</span>
              </Button>
            </Container>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col
            md={{
              span: 10,
              offset: 1,
            }}
          >
            {user ? (
              <>
                <UserProfileView
                  user={
                    // Dummy Data
                    //   {
                    //   name: "Shani Rajawat",
                    //   email: "rajawat.sunny512@gmail.com",
                    //   gender: "MALE",
                    //   about: "I am Java Full Stack",
                    //   roles: [
                    //     { roleId: 1, roleName: "ADMIN" },
                    //     { roleId: 2, roleName: "NORMAL" },
                    //   ],
                    // }
                    user
                  }
                  // Calling this function in another component
                  handleShowModel={handleShowModel}
                />
                {updateViewModal()}
              </>
            ) : (
              <Alert>
                <h2 className="text-center text-uppercase m-2">
                  User is not loaded from server !!!
                </h2>
              </Alert>
            )}
            {/* {JSON.stringify(userContext.userData)} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
