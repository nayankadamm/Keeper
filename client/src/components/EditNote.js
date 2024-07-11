import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  useUpdateNoteMutation } from '../api/createNoteApi';
import { Container, Form, Button } from 'react-bootstrap'; // Import components from react-bootstrap

const EditNoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote({ id,title, description });
      
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Failed to update the note:', error);
    }
  };



  return (
    <Container className="mt-5">
      <div className="p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Edit Note</h2>
        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Note'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditNoteForm;
