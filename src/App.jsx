import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db';
// import './App.css'

function App() {


  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])


  const MAX_ITEM = 5

  function addToCart(item) {
    // console.log("Agregando al carrito")
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    console.log(itemExist)

    if (itemExist >= 0) {
      console.log("Item existe")
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else {
      // console.log("No existe agregando...")
      item.quantity = 1
      setCart([...cart, item])
    }


  }


  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
  }


  function increaseQuantity(id) {
    // console.log("incrementenado... ", id)
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEM) {

        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    // console.log("disminuyendo... ", id)
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (

              //CONCEPTO DE PROPS  Y FRAGMENTS

              <Guitar
                key={guitar.id}
                guitar={guitar}
                // cart={cart} 
                setCart={setCart}
                addToCart={addToCart}
              />
            )
          }
          )}





        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
