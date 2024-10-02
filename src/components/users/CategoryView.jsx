import { getCategories } from "../../services/category.service";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/defCat.jpg";

const CategoryView = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    loadCategories(0, 100000);
  }, []);

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

  const categoryView = () => {
    return (
      categories && (
        <>
          <ListGroup variant="flush">
            <ListGroup.Item action as={Link} to={'/store'}>
              <img
                className="rounded-circle"
                src={defaultImage}
                alt="Default Category"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
                onError={(event) => {
                  event.currentTarget.setAttribute("src", defaultImage);
                }}
              />
              <span className="ms-2">All Products</span>
            </ListGroup.Item>
            {categories.content.map((cat) => (
              <ListGroup.Item
                as={Link}
                to={`/store/${cat.categoryId}/${cat.title}`}
                action
                key={cat.categoryId}
              >
                <img
                  className="rounded-circle"
                  src={cat.coverImage}
                  alt={cat.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                  onError={(event) => {
                    event.currentTarget.setAttribute("src", defaultImage);
                  }}
                />
                <span className="ms-2">{cat.title}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )
    );
  };

  return categories && categoryView()
};

export default CategoryView;
