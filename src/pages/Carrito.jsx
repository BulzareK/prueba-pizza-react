import { Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";
import context from "../context";

function Carrito() {
  const {
    totalCarrito,
    carrito,
    encontrarPizza,
    incrementarCarrito,
    decrementarCarrito,
  } = useContext(context);
  return (
    <Row className="p-4 bg-secondary border border-2 border-dark">
      <h3>Detalles del pedido</h3>
      <Row className="bg-body p-3">
        {carrito.map((item) => {
          const pizza = encontrarPizza(item.id);

          return (
            <Row key={item.id} className="justify-content-between">
              <Col xs={2} className="d-flex mb-2 align-items-center">
                <img src={pizza.img} alt={pizza.name} className="w-75 me-2" />
                <h5>{pizza.name}</h5>
              </Col>
              <Col xs={2} className="d-flex mb-2 align-items-center">
                <h4>$ {pizza.price * item.cantidad}</h4>
                <Button
                  variant="info"
                  onClick={() => incrementarCarrito(pizza.id)}
                >
                  +
                </Button>{" "}
                <span className="mx-2">{item.cantidad}</span>
                <Button
                  variant="danger"
                  onClick={() => decrementarCarrito(pizza.id)}
                >
                  -
                </Button>
              </Col>
              <hr />
            </Row>
          );
        })}
        <h2>TOTAL: $ {totalCarrito(carrito)}</h2>
      </Row>
    </Row>
  );
}

export default Carrito;
