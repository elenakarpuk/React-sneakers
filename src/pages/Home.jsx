import Card from "../components/Card";

import React from "react";

function Home({ items, searchValue, setSearchValue, onAddToFavorite, onChangeSearchInput, onAddToCart }) {

    return (
        <div className="content">
            <div className="content__block">
                <h1 className="content__title">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search__block">
                    {searchValue && <img
                        onClick={() => setSearchValue('')}
                        className="clear"
                        src="/images/remove.svg"
                        alt="clear"
                    />}
                    <img src="/images/search.svg" alt="search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск" />
                </div>
            </div>
            <div className="sneakers">
                {items
                    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item, index) => (
                        <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                        //added={isItemAddedToCart(item.id)} //выдаст true, если хотя бы что то совпало, если нет - false
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home;