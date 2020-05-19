import React from 'react';
import '../../style/PersonCard.css';
import { FaGithub } from 'react-icons/fa'
import {FaLinkedin} from 'react-icons/fa'

function PersonCard(props) {

    return (
        <div className="card person-card text-center">

            <div className="card-body">
                <img src={require(`../../assets/developers/${props.person.image}`)} alt="Viji" id="team" className="img-fluid rounded-circle w-50 mb-3" />
                <h3>{props.person.name}</h3>
                <h5>{props.person.title}</h5>
                <p>{props.person.description}</p>

                <section>
                    <a href={props.person.github} target="_blank"><FaGithub color="white" size='2rem' /> </a>
                    <a href="https://www.linkedin.com/in/viji-radhakrishnan-b05577aa/" target="_blank"><FaLinkedin color="white" size='2rem' /> </a>
                </section>
            </div>

        </div>
    )
}

export default PersonCard;
