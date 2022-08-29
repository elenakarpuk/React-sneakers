import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorites() {
    const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return (
        <div className="content">
            <div className="content__block">
                <h1 className="content__title">Мои закладки</h1>
            </div>
            <div>
                <div className="sneakers">
                    {favorites.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            id={item.id}
                            favoriteLike={true}
                            onFavorite={onAddToFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favorites;