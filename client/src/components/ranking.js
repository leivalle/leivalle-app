import React from 'react';
import UserRank from './user_rank';
import 'react-bootstrap'
import '../styles/ranking.css';
import { ListGroup, Jumbotron } from 'react-bootstrap';
function Ranking() {
  return (
    <div className='rankingBody'>
      <Jumbotron>
        <ListGroup>
          <ListGroup.Item><UserRank name='Martti'/></ListGroup.Item>
          <ListGroup.Item><UserRank name='Testo'/></ListGroup.Item>
          <ListGroup.Item><UserRank name='Riku'/></ListGroup.Item>
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default Ranking;
