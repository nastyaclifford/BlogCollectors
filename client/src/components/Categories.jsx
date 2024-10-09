import React from "react"
import { categories } from "../constants/categories"

export default function Categories ({selectedCategory, onCategoryChange}) {
    return(
        <div className="item">
            <h1>Category</h1>
            {categories.map((category) => (
                <div className="post" key={category}>
                    <input
                        type="radio"
                        checked={selectedCategory === category}
                        name="post"
                        value={category}
                        id={category}
                        onChange={e => onCategoryChange(e.target.value)}
                    />
                    <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                </div>
            ))}
        </div>
    )
}