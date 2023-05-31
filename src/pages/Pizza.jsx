import { useContext } from "react";
import { useParams } from "react-router-dom";
import context from "../context";
import { Row, Col, Stack, Button } from "react-bootstrap";

function Pizza() {
  const { id } = useParams();
  const { encontrarPizza, incrementarCarrito } = useContext(context);
  const pizza = encontrarPizza(id);

  return (
    <Row>
      <Col xs={5}>
        <img src={pizza?.img} alt={pizza?.name} className="w-100" />
      </Col>
      <Col xs={7}>
        <h3>{pizza?.name}</h3>
        <p>{pizza?.desc}</p>
        <h4>Ingredientes:</h4>
        {pizza?.ingredients.map((ingredient) => (
          <div key={ingredient}>🍕 {ingredient}</div>
        ))}
        <Stack gap={3} direction="horizontal" className="mt-3">
          <div className="fs-3 fw-bold">$ {pizza?.price}</div>
          <Button
            variant="danger"
            size="lg"
            className="ms-auto"
            onClick={() => incrementarCarrito(pizza.id)}
          >
            Añadir
          </Button>
        </Stack>
      </Col>
    </Row>
  );
}

export default Pizza;
