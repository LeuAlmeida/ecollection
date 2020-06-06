import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";

import api from "../../services/api";
import "./styles.css";

import logo from "../../assets/logo.svg";

interface Item {
  id: number;
  name: string;
  image_url: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecollection" />

        <Link to="/">
          <FiArrowLeft /> Back to home
        </Link>
      </header>

      <form>
        <h1>
          Registration of
          <br /> the collection point
        </h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on map</span>
          </legend>

          <Map center={[-23.6544493, -46.5836981]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-23.6544493, -46.5836981]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Select a state</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a city</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collection items</h2>
            <span>Select one or more items below</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Register collection point</button>
      </form>
    </div>
  );
};

export default CreatePoint;
