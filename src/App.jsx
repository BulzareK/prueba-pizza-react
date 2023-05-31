import Navigation from "./components/Navbar";
import AppContext from "./context";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import Pizza from "./pages/Pizza";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("/pizzas.json")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error(err));
  }, []);

  const encontrarPizza = (id) => {
    return pizzas.find((pizza) => pizza.id === id);
  };

  const totalCarrito = (items) => {
    const total = items.reduce((acc, item) => {
      const pizza = encontrarPizza(item.id);
      return (acc + pizza.price) * item.cantidad;
    }, 0);
    return total;
  };

  const incrementarCarrito = (id) => {
    setCarrito((itemsActuales) => {
      if (itemsActuales.find((item) => item.id === id) === undefined) {
        return [...itemsActuales, { id, cantidad: 1 }];
      } else {
        return itemsActuales.map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: item.cantidad + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decrementarCarrito = (id) => {
    setCarrito((itemsActuales) => {
      if (itemsActuales.find((item) => item.id === id).cantidad === 1) {
        return itemsActuales.filter((item) => item.id != id);
      } else {
        return itemsActuales.map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        pizzas,
        encontrarPizza,
        totalCarrito,
        carrito,
        incrementarCarrito,
        decrementarCarrito,
      }}
    >
      <Navigation />

      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Container className="my-5">
        <Routes>
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pizza/:id" element={<Pizza />} />
        </Routes>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
