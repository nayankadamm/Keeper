import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useGetNoteQuery,useDeleteNoteMutation } from '../api/createNoteApi';
import { useNavigate } from 'react-router-dom';
const NotesList = () => {
  const { data: notes = [], error, isLoading } = useGetNoteQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <Container className="mt-3">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          An error occurred: {error.message}
        </Alert>
      </Container>
    );
  }

  const handleEditNote = (id) => {
    navigate(`/notes/edit/${id}`)
    console.log(`Edit note with id ${id}`);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id).unwrap();
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete the note: ', err);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        {notes.map((note) => (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.description}</Card.Text>
                <Button variant="info" onClick={() => handleEditNote(note._id)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteNote(note._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NotesList;
