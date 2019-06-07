
import React from 'react';
import { Route} from 'react-router-dom';

import MoneyView from '../../vendingmachine/components/MoneyView';
import DrinksView from '../../vendingmachine/components/DrinksView';
import AdminDashboardView from '../../vendingmachine/components/AdminDashboardView';

const Router = () => {

    return (
        <div>
          <Route path="/money" component={MoneyView} />
          <Route path="/drinks" component={DrinksView} />
          <Route path="/admindashboard" component={AdminDashboardView} />
        </div>

    );

};

export default Router;
