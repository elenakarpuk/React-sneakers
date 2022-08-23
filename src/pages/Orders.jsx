import axios from "axios";
import React from "react";
import { useState } from "react";
import { AppContext } from "../App";
import Card from "../components/Card";

function Orders() {
    const { onAddToCart, onAddToFavorite } = React.useContext(AppContext)
    const [orders, setOrders] = useState([])

    React.useEffect(() => {
        try {
            async function getOrders() {
                const { data } = await axios.get('https://62ec127355d2bd170e7c282d.mockapi.io/orders');
                setOrders(data.map((obj) => obj.items).flat())
                //setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                //setOrders(data.map((obj) => obj.items).flat())
            };
            getOrders();
        } catch {
            alert('Ошибка при запросе заказов')
        }


    }, []);

    return (
        <div className="content">
            <div className="content__block">
                <h1 className="content__title">Мои заказы</h1>
            </div>
            <div className="sneakers">
                <div className="sneakers">
                    {orders.map((item, index) => (
                        <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}

                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders;