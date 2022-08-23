import React from "react";
import { AppContext } from "../App";

function Info({ title, description, image }) {
    const { setCartOpened } = React.useContext(AppContext);

    return (
        <div className="empty">
            <img className="empty__cart"
                width={120}
                height={120}
                src={image}
                alt="empty-cart" />
            <h2>{title}</h2>
            <div className="empty__description">{description}</div>
            <button onClick={() => setCartOpened(false)} className="green__button">
                <img src="/images/arrow.svg" alt="arrow" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info;