import { useEffect } from "react";
import { getAllUsers } from "../../services/user.service";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";

const AdminUsers = () => {
  const [users, setUsers] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getUsers(currentPage, 5, "name", "asc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, 5, "name", "asc");
    }
  }, [currentPage]);

  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        if(currentPage === 0){
            setUsers({
                ...data,
              });
        }else{
            setUsers({
                content:[...users.content, ...data.content],
                lastPage: data.lastPage,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h3 className="text-center display-5">User List</h3>
                <InfiniteScroll
                  dataLength={users.content.length}
                  next={loadNextPage}
                  hasMore={!users.lastPage}
                  loader={<h3 className="text-center my-3">...Loading</h3>}
                  endMessage={
                    <p className="text-center py-3 text-muted">
                      All Users are loaded
                    </p>
                  }
                >
                  {users.content.map((user) => {
                    return <SingleUserView key={user.userId} user={user} />;
                  })}
                </InfiniteScroll>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  return <div>{users && userView()}</div>;
};

export default AdminUsers;
