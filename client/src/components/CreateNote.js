// src/components/CenteredForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { setTitle, setDescription, addNote,resetNote } from '../slices/createNoteSlice';
import { useAddNoteMutation  } from '../api/createNoteApi';
const CreateNote = () => {
  const dispatch = useDispatch();
  const title = useSelector(state => state.notes.title);
  const description = useSelector(state => state.notes.description);
  const [addNoteMutation, {isLoading,isError,error}] =useAddNoteMutation();
  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(setDescription(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description cannot be empty");
      return;
    }
  
    try {
    await addNoteMutation({ title, description }).unwrap();
      dispatch(addNote(title,description)); // Update Redux state with the new note
      dispatch(resetNote()); // Optionally reset form fields
      window.location.reload();
    } catch (error) {
      console.error('Failed to save the note:', error);
      alert('Failed to save the note. Please try again.'); // Provide user feedback
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="p-2 border-primary">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Control
                    as="textarea"
                    placeholder="Description..."
                    
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button type="submit" className="btn btn-primary">{isLoading ? 'Saving...' : 'Save Note'}</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNote;