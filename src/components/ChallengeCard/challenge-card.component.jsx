import React from 'react';
import { useAuth } from 'context/auth-context-provider';
import { Card, Badge } from 'react-bootstrap';
import { formatTime } from 'utils';

function ChallengeCard({ challenge, upvote }) {
  const auth = useAuth();
  const voted = auth.user.data.upvotes.includes(challenge.id);
  const createdByYou = challenge.employee.id === auth.user.data.id;

  return (
    <Card
      style={{
        margin: '1rem 0',
      }}
    >
      <Card.Header className='text-muted'>
        <div>
          <small>
            <i class='fas fa-calendar-alt'></i>&nbsp;Created at&nbsp;
            {formatTime(challenge.createdAt)}
          </small>
        </div>
        <div>
          <small>
            <i class='fas fa-user'></i>&nbsp;Created by&nbsp;
            {createdByYou ? 'You' : challenge.employee.name}
          </small>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{challenge.title}</Card.Title>
        <Card.Text>{challenge.description}</Card.Text>
        <div className=''>
          {challenge.tags.map((tag, index) => (
            <Badge
              key={index}
              pill
              bg='primary'
              style={{ padding: '0.3rem 0.6rem', margin: '0.1rem' }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className='text-muted'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <small>
              {challenge.upvotes}&nbsp;
              {challenge.upvotes > 1 ? 'upvotes' : 'upvote'}
            </small>
          </div>
          {!createdByYou && (
            <div style={{ margin: '0 0.1rem' }} onClick={upvote}>
              <i
                className={`${
                  voted ? 'fas text-primary' : 'far'
                } fa-thumbs-up cursor-pointer`}
              ></i>
            </div>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}

export default ChallengeCard;
