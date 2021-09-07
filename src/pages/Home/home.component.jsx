import React, { useEffect, useState } from 'react';
import {
  Container,
  Dropdown,
  DropdownButton,
  Spinner,
  Button,
} from 'react-bootstrap';
import { get, post, put } from 'services/api';
import { epochTime } from 'utils';
import { useAuth } from 'context/auth-context-provider';
import Jumbotron from 'components/Jumbotron/jumbotron.component';
import AppHeader from 'components/AppHeader/app-header.component';
import ChallengeCard from 'components/ChallengeCard/challenge-card.component';
import AddChallengeModal from 'components/AddChallengeModal/add-challenge-modal.component';
import styles from './home.module.css';

const SORT_METHODS = [
  'Newest First',
  'Votes -- High to Low',
  'Votes -- Low to High',
  'Date -- Newest First',
  'Date -- Oldest First',
];

function Home() {
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getChallenges();
  }, []);

  const getChallenges = async () => {
    const res = await get('/challenges');
    setLoading(false);

    if (res.ok) {
      let result = [...res.data];
      result.sort((a, b) => b.createdAt - a.createdAt);
      setChallenges(result);
      setSortedBy('Newest First');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const upvote = async (challenge) => {
    let employeeObj = { ...auth.user.data };
    let challengeObj = { ...challenge };
    const challengeIdIndex = employeeObj.upvotes.indexOf(challengeObj.id);

    if (challengeIdIndex > -1) {
      employeeObj.upvotes.splice(challengeIdIndex, 1);
      challengeObj.upvotes--;
    } else {
      employeeObj.upvotes = [...employeeObj.upvotes, challengeObj.id];
      challengeObj.upvotes++;
    }

    const employeeRes = await put(
      '/employees/' + auth.user.data.id,
      employeeObj
    );
    const challengeRes = await put(
      '/challenges/' + challengeObj.id,
      challengeObj
    );

    if (employeeRes.ok) {
      auth.setUserAuth(employeeRes.data);
    }

    if (challengeRes.ok) {
      getChallenges();
    }
  };

  const addChallenge = async (challenge) => {
    let challengeObj = {
      ...challenge,
      upvotes: 0,
      createdAt: epochTime(),
      id: `chg${++challenges.length}`,
      employee: { id: auth.user.data.id, name: auth.user.data.name },
    };

    const res = await post('/challenges/', challengeObj);

    if (res.ok) {
      getChallenges();
      setShowModal(false);
    }
  };

  const sortBy = (method) => {
    let result = [...challenges];

    setSortedBy(method);

    switch (method) {
      case 'Votes -- High to Low':
        result.sort((a, b) => b.upvotes - a.upvotes);
        setChallenges(result);
        break;
      case 'Votes -- Low to High':
        result.sort((a, b) => a.upvotes - b.upvotes);
        setChallenges(result);
        break;
      case 'Newest First':
      case 'Date -- Newest First':
        result.sort((a, b) => b.createdAt - a.createdAt);
        setChallenges(result);
        break;
      case 'Date -- Oldest First':
        result.sort((a, b) => a.createdAt - b.createdAt);
        setChallenges(result);
        break;
      default:
        result.sort((a, b) => b.createdAt - a.createdAt);
        setChallenges(result);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AddChallengeModal
        show={showModal}
        onHide={closeModal}
        addChallenge={addChallenge}
      />
      <AppHeader />
      <Jumbotron>
        <Container style={{ paddingTop: 50, paddingBottom: 50 }}>
          <div className='d-flex justify-content-between align-items-center'>
            <h4 className='m-0'>Challenges:</h4>
            <div className='d-flex'>
              <Button
                variant='success'
                size='sm'
                style={{ marginRight: 4 }}
                onClick={openModal}
              >
                <span className='display-at-576'>Add challenge</span>&nbsp;
                <i className='fas fa-plus'></i>
              </Button>
              {challenges.length > 0 && (
                <DropdownButton
                  variant='secondary'
                  title={
                    <span>
                      Sort&nbsp;<i className='fas fa-sort'></i>
                    </span>
                  }
                  size='sm'
                  align='end'
                >
                  {SORT_METHODS.map((method) => (
                    <Dropdown.Item
                      key={method}
                      role='button'
                      active={sortedBy === method}
                      onClick={() => sortBy(method)}
                    >
                      {method}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              )}
            </div>
          </div>
          {loading ? (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{ height: 200 }}
            >
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </div>
          ) : challenges.length > 0 ? (
            <div>
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  upvote={() => upvote(challenge)}
                />
              ))}
            </div>
          ) : (
            <p>
              <em>No challenges found!</em>
            </p>
          )}
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Home;
