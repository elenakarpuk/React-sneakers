import React from "react"
import { AppContext } from "../../App";
import styles from "./Card.module.css"

function Card({
    id,
    imageUrl,
    title,
    price,
    onFavorite,
    onPlus,
    favoriteLike = false,
}) {

    const { isItemAddedToCart } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favoriteLike)

    const onClickPlus = () => {
        onPlus({ id, parentId: id, title, price, imageUrl });

    }

    const onClickFavorite = () => {
        onFavorite({ id, title, price, imageUrl });
        setIsFavorite(!isFavorite)
    }

    return (
        < div className={styles.card} >
            {onFavorite &&
                <div className={styles.favorite} onClick={onClickFavorite} >
                    <img
                        src={isFavorite ? "/images/like.svg" : "/images/unlike.svg"}
                        alt="like" />
                </div>}


            <img className={styles.card__img} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className={styles.info}>
                <div className={styles.item}>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {onPlus && (
                    <img className={styles.plus}
                        onClick={onClickPlus}
                        src={isItemAddedToCart(id) ? "/images/button-checked.svg" : "/images/button-plus.svg"}
                        alt="plus" />)}


            </div>
        </div >
    )
}

export default Card;


