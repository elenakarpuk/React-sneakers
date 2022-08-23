import "./style.css"
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

//console.log(AppContext);
function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch('https://62ec127355d2bd170e7c282d.mockapi.io/items').then(res => {
    //   return res.json();
    // }).then((json) => {
    //   setItems(json)
    // });

    async function fetchData() {
      const cartResponse = await axios.get('https://62ec127355d2bd170e7c282d.mockapi.io/Cart'); // то же, что и fetch, но сам конвертирует json тогда когда ему нужно, сам понимает
      const favoritesResponse = await axios.get('https://62ec127355d2bd170e7c282d.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62ec127355d2bd170e7c282d.mockapi.io/items');

      setItems(itemsResponse.data)
      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
    }

    fetchData()

  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
        axios.delete(`https://62ec127355d2bd170e7c282d.mockapi.io/Cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://62ec127355d2bd170e7c282d.mockapi.io/Cart', obj);
        setCartItems((prev) => [...prev, obj])
      }

    } catch (error) {
      alert('Не удалось добавить в корзину')
    }

  }

  const RemoveItemCart = (id) => {
    axios.delete(`https://62ec127355d2bd170e7c282d.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62ec127355d2bd170e7c282d.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://62ec127355d2bd170e7c282d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }

  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAddedToCart = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  }


  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAddedToCart,
      onAddToFavorite,
      setCartOpened,
      setCartItems,
      onAddToCart
    }}>
      <div className="wrapper">
        {cartOpened && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} onRemove={RemoveItemCart} />}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}

            />
          }
          />

          <Route path="/favorites" exact element={
            <Favorites />
          }
          />

          <Route path="/orders" exact element={
            <Orders />
          }
          />
        </Routes>

      </div >
    </AppContext.Provider>
  );
}

export default App;
