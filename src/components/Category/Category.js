import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { CategoryAsync } from '../../redux/CategorySlice';
import { CatImageAsync } from '../../redux/CatImagesSlice';
import Loading from "../Loading/Loading";
import "./Category.scss";

function Categories() {

  const [isOpen, setIsOpen] = useState(false);

  const categoriesData = useSelector(state => state.category.data);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getCats = (id) => {
    const value = {
      id: id,
      page: 1
    }
    dispatch(CatImageAsync(value))
    setLoading(true);
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(CategoryAsync())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [loading])

  console.log(isOpen)

  return (
    <div className={`${isOpen ? "main-container" : "navbar_container active"}`}>
      <div className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <div className='close'><p>X</p></div> : <div className='open'><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/></svg></div>}
      </div>
      <nav className={isOpen ? "nav_menu active" : "nav_menu"}>
        <ul>
          {categoriesData && categoriesData.map((category) => (
            <li key={category.id} className="nav_ink_items">
              <NavLink to={`categories/${category.id}`} className="nav_link">
                <p
                  onClick={() => getCats(category.id)}
                >{category.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {loading && <Loading />}
    </div>
  )
}

export default Categories