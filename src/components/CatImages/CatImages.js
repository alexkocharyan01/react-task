import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { CatImageAsync } from '../../redux/CatImagesSlice';
import Categories from '../Category/Category';
import './CatImages.scss';

function CatImages() {

  const [page, setPage] = useState(1);
  const [catsData, setCatsData] = useState([]);

  const images = useSelector(state => state.catImage.data);

  const {id} = useParams();

  const dispatch = useDispatch();

  const loadMore = () => {
    setPage(page + 1);

    const value = {
      page: page,
      id: id,
    };
    dispatch(CatImageAsync(value));
  }

  useEffect(() => {
    dispatch(CatImageAsync())
  }, [])

  useEffect(() => {
    setCatsData([]);
  }, [id])

  useEffect(() => {
    setCatsData([...catsData , ...images]);
  }, [images])

  return (
    <div className='products_list'>
      <div className='main_product'>
        <div className='prod_cats'>
        {catsData.length > 0 && catsData.map((item) => (
          <div className='products' >
            <div className='products_img'>
              <img src={item.url} />
            </div>
          </div>
        ))}
        </div>
       <button className='load_more_btn' onClick={loadMore}>Load more</button>
      </div>    
  </div>
  )
}

export default CatImages