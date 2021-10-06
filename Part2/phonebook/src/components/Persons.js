import React from 'react'
import Person from './Person'


const Persons = (props) => {
    return(
        <ul>
            {props.personsToShow.map((person) => <Person key={person.name} person={person} deletePerson={props.deletePerson} /> )}
        </ul>
    )
}

export default Persons;