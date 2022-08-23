import React from "react";
import axios from "axios";
import Info from "./Info";
import { AppContext } from "../App";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


function Drawer({ onClose, onRemove }) {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [isOrderComplete, setisOrderComplete] = React.useState(false);
    const [isOrderId, setIsOrderId] = React.useState(null);
    const totalPrice = cartItems.reduce((prev, obj) => Number(obj.price) + prev, 0) // 0 - точка отсчета

    const onClickOrder = async () => {
        try {
            const { data } = await axios.post('https://62ec127355d2bd170e7c282d.mockapi.io/orders', { items: cartItems });
            setIsOrderId(data.id);
            setisOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://62ec127355d2bd170e7c282d.mockapi.io/Cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Не удалось создать заказ :(')
        }

    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h2>Корзина < img onClick={onClose} src="/images/remove.svg" alt="remove" /> </h2>

                {
                    cartItems.length > 0 ? (
                        <div>
                            <div className="items">
                                {cartItems.map((obj) => (
                                    <div key={obj.id} className="cart__item">
                                        <div className="cart__image"> <img width={70} height={70} src={obj.imageUrl} alt="sneakers" /> </div>
                                        <div className="cart__name">
                                            <p>{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        <div className="cart__remove"><img onClick={() => onRemove(obj.id)} src="/images/remove.svg" alt="remove" /></div>

                                    </div>
                                ))}
                            </div>
                            <div className="result__block">
                                <ul className="result">
                                    <li>
                                        <span>Итого: </span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.round((totalPrice * 5 / 105) * 100) / 100} руб.</b>
                                    </li>
                                </ul>
                                <button onClick={onClickOrder} className="green__button" >Оформить заказ <img src="/images/arrow.svg" alt="sneakers" /> </button>
                            </div>
                        </div>

                    )
                        : (
                            <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                                description={isOrderComplete ? `Ваш заказ #${isOrderId} скоро будет передан курьерской доставке` : "Добавьте пару кроссовок, что бы сделать заказ"}
                                image={isOrderComplete ? "/images/order-complete.svg" : "/images/cart-empty.svg"} />

                        )}








            </div>

        </div>

    )
}

export default Drawer;