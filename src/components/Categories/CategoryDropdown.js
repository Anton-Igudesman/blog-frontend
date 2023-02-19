import React from 'react';
import Select from "react-select";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAction } from '../../redux/slices/categories/categorySlice';

const CategoryDropdown = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryAction())
    }, [dispatch]);
    
    const category = useSelector(state => state?.category);
    const { categoryList, loading, appError, serverError} = category;

    const allCategories = categoryList?.data?.map(category => {
        return {
            label: category?.title,
            value: category?._id
        };
    });

    const handleChange = value => {props.onChange('category', value)};

    const handleBlur = () => {props.onBlur('category', true)};
    return (
        <div>
            {loading ? <h3 className='text-base text-green-600'>Category List Loading...</h3> : (
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                id='category' 
                options={allCategories} 
                value={props?.value?.label}
                />  
            )}
          {props?.error && <div style={{color:'red', marginTop:'.5rem'}}>{props?.error}</div>}  
        </div>
        
            
    )
};

export default CategoryDropdown;