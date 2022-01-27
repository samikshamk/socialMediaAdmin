import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";

import Heading from "../Components/Heading";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from "react-bootstrap";
import {
  BiDotsVerticalRounded,
  BiTrash,
  BiMinusCircle,
  BiMessageCheck,
  BiChat,
} from "react-icons/bi";
import { toast } from "react-toastify";

function Post() {
  const [postList, setPostList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 10;
  const pagesVisited = pageNumber * postPerPage;

  const pageCount = Math.ceil(postList.length / postPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  

  //Get Post Data
  useEffect(() => {
    Axios.get(`https://jsonplaceholder.typicode.com/posts`, {
      headers: { Accept: "application/json" },
    }).then((response) => {
      setPostList(response.data);
    });
  }, []);


  //Delete post
  const deletePost = (event) => {
    const deletePostID = event.target.value;

    Axios.delete(
      `https://jsonplaceholder.typicode.com/posts/` + deletePostID
    ).then((response) => {
      if (response.data.error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span> System is Error. Please Try Again!</span>
          </Fragment>
        );
      } else {
        return [
          toast.success(
            <Fragment>
              <BiMessageCheck /> <span>Successfully deleted the post.</span>
            </Fragment>
          ),
          setPostList(
            postList.filter((postDetails) => {
              /* eslint-disable-next-line */
              return postDetails.id != deletePostID;
            })
          ),
        ];
      }
    });
  };

  return (
    <Container className="my-5 mx-auto w-50">
      <Row className="my-3 p-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="search"
            placeholder="Search by the Title"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
        </Form.Group>
      </Row>

      {postList
        .slice(pagesVisited, pagesVisited + postPerPage)

        .filter((postDetails) => {
          if (searchTerm === "") {
            return postDetails;
          } else if (
            postDetails.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return postDetails;
          } 
          return false;
        })

        .map((postDetails, key) => {
          const postID = postDetails.id;
          const userID = postDetails.userId;
          const postTitle = postDetails.title;
          const postBody = postDetails.body;

          return (
            <Container key={postID} className="border p-2 mb-3">
              <Row className="mb-3">
                <Col xs={10} sm={10} className="text-start">
                  UserID: {userID}
                </Col>
                <Col xs={2} sm={2} className="text-end">
                  <DropdownButton
                    title={<BiDotsVerticalRounded />}
                    variant="light"
                    bg="light"
                    align="end"
                    size="sm"
                  >
                    <Dropdown.Item>
                      <div className="d-grid gap-2">
                        <Button
                          variant="link"
                          className="text-decoration-none text-dark"
                          value={postID}
                          onClick={deletePost}
                        >
                          <BiTrash /> Delete
                        </Button>
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col sm={12}>
                  <Heading content={postTitle} design="heading h4 my-2" />
                  <p className="fs-6">{postBody}</p>
                </Col>
              </Row>
            </Container>
          );
        })}


        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginateBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginateDisabled"}
        activeClassName={"paginateActive"}
      />
    </Container>
  );
}

export default Post;
