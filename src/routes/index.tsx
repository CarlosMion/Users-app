import React, { FC } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFoundPage } from './not-found-page';

export const routes = {
  search: '/',
  results: '/results',
};

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.search} element={<div />} />
        <Route path={`${routes.results}/:login`} element={<div />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
