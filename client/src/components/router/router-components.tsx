import React from 'react';

export const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ '../dashboard/dashboard'));

export const Spending = React.lazy(() =>
  import(/* webpackChunkName: "spending" */ '../spending/spending'));

export const Error = React.lazy(() => import(/* webpackChunkName: "error" */ '../error/error'));

export const CreateSpending = React.lazy(() =>
  import(/* webpackChunkName: "create-spending" */ '../spending/create-spending'));

export const EditUser = React.lazy(() =>
  import(/* webpackChunkName: "edit-user" */ '../user/edit-user/edit-user'));
