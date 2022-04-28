import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SearchPage } from 'pages/search';

import { NotFoundPage } from 'pages/not-found-page';
import { routes } from './routes';

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.search} element={<SearchPage />} />
        <Route path={`${routes.results}/:login`} element={<div />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
