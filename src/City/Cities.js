import React from 'react';
const City = (props) => {

  
  const outputstyle = {
  color: 'white',
  fontSize: '80%',

  };

  const divStyle = {
  	border: '4px white solid',
  	margin: '10px',
  	width: '25vw',
  	display: 'inline-block',
  }
 
  return (
      
      <div style={divStyle}>
      <h1 style={outputstyle}>
        {props.name}
      </h1>
      <p>
        {props.temp}°C
      </p>
      </div>
  )
}

export default City;