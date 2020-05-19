import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
function Covid19Live() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data); //latest data from 1st link
        setResults(responseArr[1].data); //countries data from 2nd link
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  //filters Countries to show just Sweden
  const filterCountry = results.filter((item) => {
    return searchCountries !== ""
      ? item.country.includes(searchCountries)
      : item;
  });
  const countries = filterCountry.map((data) => {
    return (
      <tbody>
        <tr>
          <td>
            <b>{data.country}</b>
          </td>
          <td>{data.cases}</td>
          <td>{data.deaths}</td>
          <td style={{ backgroundColor: "#c5e1a5" }}>{data.recovered}</td>
          <td style={{ backgroundColor: "#ffc107" }}>{data.todayCases}</td>
          <td style={{ backgroundColor: "#ef5350" }}>{data.todayDeaths}</td>
          <td>{data.active}</td>
          <td>{data.critical}</td>
        </tr>
      </tbody>
    );
  });
  return (
    <div className="App">
      <CardDeck>
        <Card
          text="black"
          className="text-center"
          style={{ margin: "10px", backgroundColor: "#ffc107" }}>
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          text="black"
          className="text-center"
          style={{ margin: "10px", backgroundColor: "#ef5350" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          text="black"
          className="text-center"
          style={{ margin: "10px", backgroundColor: "#c5e1a5" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlID="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Total Deaths</th>
            <th>Recovered</th>
            <th>Today's Cases</th>
            <th>Today's Deaths</th>
            <th>Active</th>
            <th>Critical</th>
          </tr>
        </thead>
        {countries}
      </Table>
    </div>
  );
}
export default Covid19Live;
