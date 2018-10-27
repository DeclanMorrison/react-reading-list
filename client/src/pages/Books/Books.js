import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API"

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
  };

  // Add code here to get all books from the database and save them to this.state.books

  componentDidMount = () => {
    API.getBooks().then(data => {
      console.log(data);
      this.setState({books: data.data});
    });
  };

  handleOnChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  };

  handleSave = (event) => {
    API.saveBook(
      {
        title: this.state.title, 
        author: this.state.author, 
        synopsis: this.state.synopsis
      }
    ).then(() => {
      API.getBooks().then(data => {
        console.log(data);
        this.setState({books: data.data});
      });
    });
  };

  handleDelete = (event) => {
    API.deleteBook(event.target.id).then(() => {
      API.getBooks().then(data => {
        console.log(data);
        this.setState({books: data.data});
      });
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" onChange={this.handleOnChange}/>
              <Input name="author" placeholder="Author (required)" onChange={this.handleOnChange}/>
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.handleOnChange}/>
              <FormBtn onClick={this.handleSave}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn id={book._id} onClick={this.handleDelete}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
