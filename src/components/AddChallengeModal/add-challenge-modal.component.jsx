import React, { useEffect, useReducer, useRef } from 'react';
import { Badge, Form, Button, Modal } from 'react-bootstrap';
import styles from './add-challenge-modal.module.css';

const DEFAULT_TAGS = [
  'hack',
  'feature',
  'tech',
  'innovation',
  'code',
  'developer',
  'programmer',
];

const INITIAL_STATE = {
  title: { value: '', error: false },
  description: { value: '', error: false },
  tags: { value: [], error: false },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: { ...state.title, value: action.payload } };
    case 'SET_TITLE_ERROR':
      return { ...state, title: { ...state.title, error: action.payload } };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: { ...state.description, value: action.payload },
      };
    case 'SET_DESCRIPTION_ERROR':
      return {
        ...state,
        description: { ...state.description, error: action.payload },
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: {
          ...state.tags,
          value: addTag(state.tags.value, action.payload),
        },
      };
    case 'SET_TAGS_ERROR':
      return {
        ...state,
        tags: { ...state.tags, error: action.payload },
      };
    case 'RESET_FORM':
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const addTag = (currentTags, tag) => {
  const tagsArr = [...currentTags];
  const tagIndex = tagsArr.indexOf(tag);

  if (tagIndex > -1) {
    tagsArr.splice(tagIndex, 1);
    return tagsArr;
  } else {
    return [...tagsArr, tag];
  }
};

function AddChallengeModal({ show = false, onHide, addChallenge }) {
  const initialRender = useRef(true);
  const [form, dispatch] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (!initialRender.current) {
      updateTagsError(form.tags.value.length === 0);
    }
  }, [form.tags.value]);

  const changeTitle = (value) => {
    dispatch({ type: 'SET_TITLE', payload: value });
    changeTitleError(value.length === 0);
  };

  const changeTitleError = (value) => {
    dispatch({ type: 'SET_TITLE_ERROR', payload: value });
  };

  const changeDescription = (value) => {
    dispatch({ type: 'SET_DESCRIPTION', payload: value });
    changeDescriptionError(value.length === 0);
  };

  const changeDescriptionError = (value) => {
    dispatch({ type: 'SET_DESCRIPTION_ERROR', payload: value });
  };

  const updateTags = (value) => {
    dispatch({ type: 'SET_TAGS', payload: value });
  };

  const updateTagsError = (value) => {
    dispatch({ type: 'SET_TAGS_ERROR', payload: value });
  };

  const handleAddChallenge = () => {
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const tags = form.tags.value;
    let valid = true;

    if (!title) {
      changeTitleError(true);
      valid = false;
    }

    if (!description) {
      changeDescriptionError(true);
      valid = false;
    }

    if (tags.length === 0) {
      updateTagsError(true);
      valid = false;
    }

    if (valid) {
      const challenge = {
        title,
        description,
        tags,
      };

      addChallenge(challenge);
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
    initialRender.current = true;
  };

  return (
    <Modal size='lg' show={show} onHide={onHide} onExited={resetForm}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              value={form.title.value}
              onChange={(e) => changeTitle(e.target.value)}
            />
            <div className={styles['helper-text-container']}>
              {form.title.error && (
                <Form.Text className='text-danger'>
                  Title is required.
                </Form.Text>
              )}
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              value={form.description.value}
              rows={3}
              style={{ resize: 'none' }}
              onChange={(e) => changeDescription(e.target.value)}
            />
            <div className={styles['helper-text-container']}>
              {form.description.error && (
                <Form.Text className='text-danger'>
                  Description is required.
                </Form.Text>
              )}
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Tags</Form.Label>
            <div>
              {DEFAULT_TAGS.map((tag, index) => (
                <Badge
                  key={index}
                  className='cursor-pointer user-select-none'
                  pill
                  onClick={() => updateTags(tag)}
                  bg={form.tags.value.includes(tag) ? 'primary' : 'secondary'}
                  style={{ padding: '0.3rem 0.6rem', margin: '0.1rem' }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className={styles['helper-text-container']}>
              {form.tags.error && (
                <Form.Text className='text-danger'>
                  At least one tag is required.
                </Form.Text>
              )}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleAddChallenge}>
          Add Challenge
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddChallengeModal;
