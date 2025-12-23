import React from "react";
import "../Pages/dish.css";

export default function MomDishManager({ dishes, setDishes }) {

  const addDish = () => {
    setDishes([
      ...dishes,
      {
        name: "",
        photo: null,
        preview: "",
        description: "",
        price: "",
        prepTime: "",
        badges: "",
        stock: 10,
        isEditing: true
      }
    ]);
  };

  const updateDish = (i, key, value) => {
    const updated = [...dishes];
    updated[i][key] = value;
    setDishes(updated);
  };

  const saveDish = (i) => {
    const updated = [...dishes];
    updated[i].isEditing = false;
    setDishes(updated);
  };

  const editDish = (i) => {
    const updated = [...dishes];
    updated[i].isEditing = true;
    setDishes(updated);
  };

  const removeDish = (i) => {
    setDishes(dishes.filter((_, index) => index !== i));
  };

  const handlePhoto = (i, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateDish(i, "photo", file);
    updateDish(i, "preview", preview);
  };

  return (
    <>
      <h3>Add dishes</h3>

      {dishes.map((dish, i) => (
        <div key={i} className="mom-dish-card">

          {/* Dish Name */}
          <label>Dish name</label>
          <input
            value={dish.name}
            disabled={!dish.isEditing}
            onChange={(e) => updateDish(i, "name", e.target.value)}
          />

          {/* Photo */}
          <label>Photo</label>
          <div className="mom-photo-upload">
            {dish.preview ? (
              <img src={dish.preview} alt="preview" />
            ) : (
              <span>Square preview</span>
            )}
            {dish.isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhoto(i, e.target.files[0])}
              />
            )}
          </div>

          {/* Description */}
          <label>Description</label>
          <textarea
            value={dish.description}
            disabled={!dish.isEditing}
            onChange={(e) =>
              updateDish(i, "description", e.target.value)
            }
          />

          {/* Price */}
          <label>Price</label>
          <input
            type="number"
            value={dish.price}
            disabled={!dish.isEditing}
            onChange={(e) =>
              updateDish(i, "price", e.target.value)
            }
          />

          {/* ACTIONS */}
          <div className="mom-dish-actions">
            {dish.isEditing ? (
              <button
                className="mom-btn-primary"
                onClick={() => saveDish(i)}
              >
                Save
              </button>
            ) : (
              <button
                className="mom-btn-secondary"
                onClick={() => editDish(i)}
              >
                Edit
              </button>
            )}

            <button
              className="mom-remove-dish"
              onClick={() => removeDish(i)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button className="mom-btn-primary" onClick={addDish}>
        ➕ Add Dish
      </button>
    </>
  );
}
