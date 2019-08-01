import React from 'react';
import UserRank from './user_rank';
import 'react-bootstrap'
import { ListGroup } from 'react-bootstrap';
function Ranking() {
  return (
    <div>
        <ListGroup>
          <ListGroup.Item><UserRank name='Martti'/></ListGroup.Item>
          <ListGroup.Item><UserRank name='Testo'/></ListGroup.Item>
          <ListGroup.Item><UserRank name='Riku'/></ListGroup.Item>
        </ListGroup>
    </div>
  );
}

export default Ranking;
