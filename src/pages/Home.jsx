import { Fragment, useContext } from "react";
import context from "../context";
import { Row, Col, Card, ListGroup, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const { pizzas, incrementarCarrito } = useContext(context);
  const navigate = useNavigate();

  return (
    <>
      <Container
        className="banner"
        fluid
        style={{
          height: "400px",
          background:
            "linear-gradient(#000, #00000030), url('https://tofuu.getjusto.com/orioneat-local/resized2/jXdakdyD7GEeu8EEz-1200-1600.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h1 className="text-light">Las mejores Pizzas</h1>
      </Container>
      <Container>
        <Row className="g-2">
          {pizzas.map((pizza) => (
            <Col key={pizza.id} xs={10} md={6} lg={4} xl={3}>
              <Card>
                <Card.Img src={pizza.img} />
                <Card.Body>
                  <Card.Title>{pizza.name}</Card.Title>
                  <Card.Text className="fw-bold">Ingredientes</Card.Text>
                  <ListGroup>
                    {pizza.ingredients.map((ingredient) => (
                      <ListGroup.Item key={ingredient}>
                        {ingredient}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <strong className="fs-4">$ {pizza.price}</strong>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => navigate("/pizza/" + pizza.id)}
                  >
                    Ver más
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => incrementarCarrito(pizza.id)}
                  >
                    Añadir
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
