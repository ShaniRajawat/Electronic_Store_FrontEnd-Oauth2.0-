import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategories } from "../../services/category.service";
import { useState } from "react";
import { useEffect } from "react";
import { getAllLiveProducts } from "../../services/product.service";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service";
import CategoryView from "./CategoryView";

const Store = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCategories(0, 100000);
    loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "asc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "asc");
    }
  }, [currentPage]);

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadCategories = (pageNumber, pageSize) => {
    getCategories(pageNumber, pageSize)
      .then((data) => {
        console.log(data);
        setCategories({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Products");
      });
  };

  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);

        if (currentPage > 0) {
          setProducts({
            content: [...products.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        } else {
          setProducts({
            ...data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Categories");
      });
  };

  const productsView = () => {
    return (
      products && (
        <Container>
          <InfiniteScroll
            dataLength={products.content.length}
            next={loadNextPage}
            hasMore={!products.lastPage}
            loader={
              <h3 className="my-5 text-center">Loading more Products...</h3>
            }
            endMessage={
              <h3 className="my-5 text-center">All Products Loaded</h3>
            }
          >
            <Container fluid>
              <Row>
                {products.content.map((product) => (
                  <Col md={6} lg={4} key={product.productId}>
                    <SingleProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Container>
          </InfiniteScroll>
        </Container>
      )
    );
  };

  return (
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={2}>{<CategoryView/>}</Col>
        <Col md={10}>{productsView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
