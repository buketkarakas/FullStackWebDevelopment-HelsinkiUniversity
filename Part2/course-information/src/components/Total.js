import React from 'react'

const Total = ({ course }) => {
  const sum = course.parts.reduce(
      (total, part) => {
          return total + part.exercises
        }, 0
  );
  return(
    <p>total of {sum} exercises</p>
  ) 
}

export default Total;