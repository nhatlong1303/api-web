import React from 'react';
import ModuleNotFound from '../components/ModuleNotFound';
import Index from '../components/home/index';
import ListProducts from '../components/home/products/listProducts';
import ListCategories from '../components/home/categories/listCategories';
const routes = [
    
    {
        path: '/home',
        exact: true,
        main: ({match,location,history}) => <Index match={match} location={location}  history={history}/>
    },
    {
        path: '/category/:id',
        exact: false,
        main: ({match,location,history}) => <ListProducts match={match} location={location}  history={history}/>
    },
    {
        path: '/categories',
        exact: false,
        main: ({match,location,history}) => <ListCategories match={match} location={location}  history={history}/>
    },
    {
        path: '',
        exact: false,
        main: ({match,location,history}) => <Index match={match} location={location}  history={history}/>
    },
    {
        path: '/',
        exact: false,
        main: () => <ModuleNotFound />
    },
   
    

]
export default routes;



