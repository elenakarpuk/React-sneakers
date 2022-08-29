import React from "react";
import { Link } from "react-router-dom"
import { AppContext } from "../App";

function Header(props) {
    const { cartItems } = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((prev, obj) => Number(obj.price) + prev, 0) // 0 - точка отсчета

    return (
        <header>
            <Link to="/">
                <div className="header__left">
                    <img width={40} height={40} src="/images/header-logo.svg" alt="logo" />
                    <div className="header__info">
                        <h3>React Sneakers</h3>
                        <p>Магазин кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="header__right">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="/images/header-basket.svg" alt="cart" />
                    <span className="header__price">{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} height={18} src="/images/header-like.svg" alt="закладки" />
                    </Link>

                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/images/header-сabinet.svg" alt="user" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;