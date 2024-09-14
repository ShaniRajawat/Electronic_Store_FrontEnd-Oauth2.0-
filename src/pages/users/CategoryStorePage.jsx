import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service";
import { getProductOfCategories } from "../../services/product.service";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/users/SingleProductCard";
import CategoryView from "../../components/users/CategoryView";

const CategoryStorePage = () => {
  const { categoryId, categoryTitle } = useParams();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadProductsOfCategories(
      categoryId,
      0,
      STORE_PAGE_PRODUCT_SIZE,
      "addedDate",
      "desc"
    );
  }, [categoryId]);

  useEffect(() => {
    if (currentPage > 0) {
      loadProductsOfCategories(
        currentPage,
        STORE_PAGE_PRODUCT_SIZE,
        "addedDate",
        "asc"
      );
    }
  }, [currentPage]);

  const loadProductsOfCategories = (
    categoryId,
    pageNumber,
    pageSize,
    sortBy,
    sortDir
  ) => {
    getProductOfCategories(categoryId, pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
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
        toast.error("Error occured in getting Products");
      });
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
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
    products && (
      <Container fluid className="px-5 pt-5">
        <Row>
          <Col md={2}>
            <CategoryView />
          </Col>
          <Col md={10}>
            <Breadcrumb className="mx-5">
              <Breadcrumb.Item>Store</Breadcrumb.Item>
              <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
            </Breadcrumb>
            {products.content.length > 0 ? (
              productsView()
            ) : (
              <h3 className="mt-5 text-center">No Items in the Category</h3>
            )}
          </Col>
        </Row>
      </Container>
    )
  );
};

export default CategoryStorePage;
