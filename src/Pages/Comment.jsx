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
  BiEnvelope,
  BiMinusCircle,
  BiMessageCheck,
  BiChat,
} from "react-icons/bi";
import { toast } from "react-toastify";

function Comment() {
  const [commentList, setCommentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //PAgination
  const [pageNumber, setPageNumber] = useState(0);
  const commentPerPage = 10;
  const pagesVisited = pageNumber * commentPerPage;
  const pageCount = Math.ceil(commentList.length / commentPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //GET commment Data
  useEffect(() => {

    if (searchTerm === "") {
      Axios.get(` https://jsonplaceholder.typicode.com/comments`, {
        headers: { Accept: "application/json" },
      }).then((response) => {
        setCommentList(response.data);
      });
    } else {
      Axios.get(
        ` https://jsonplaceholder.typicode.com/comments?postId=` + searchTerm,
        {
          headers: { Accept: "application/json" },
        }
      ).then((response) => {
        setCommentList(response.data);
      });
    }
  }, [searchTerm]);

  //Delete COmment
  const deleteComment = (event) => {
    const deleteCommentID = event.target.value;

    Axios.delete(
      `https://jsonplaceholder.typicode.com/comments/` + deleteCommentID
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
          setCommentList(
            commentList.filter((commentDetails) => {
              /* eslint-disable-next-line */
              return commentDetails.id != deleteCommentID;
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
            placeholder="Search by Post ID"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
        </Form.Group>
      </Row>

      {commentList

        .slice(pagesVisited, pagesVisited + commentPerPage)

        .map((commentDetails, key) => {
          const commentID = commentDetails.id;
          const postID = commentDetails.postId;
          const userName = commentDetails.name;
          const userEmail = commentDetails.email;
          const commentBody = commentDetails.body;

          return (
            <Container key={commentID} className="border p-2 mb-3">
              <Row className="mb-3">
                <Col xs={10} sm={10} className="text-start">
                  postID: {postID}
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
                          value={commentID}
                          onClick={deleteComment}
                        >
                          <BiTrash /> Delete
                        </Button>
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col sm={12}>
                    <Heading content={userName} design="heading fs-6 text-capitalize my-auto fw-bold" />
                    </Col>
                    <Col sm={12}>
                      <p className="text-muted fw-light fs-7">
                        <BiEnvelope size={14} className="me-1" />
                        {userEmail}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12}>
                  <p className="fs-6">{commentBody}</p>
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

export default Comment;
