import React from 'react';

function Heading(props) {
  return (
  <div className={props.design}>{props.content}</div>
  )
  ;
}

export default Heading;
