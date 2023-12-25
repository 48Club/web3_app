import React from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import './i18n'
import routes from './router'

const App = () => {

  return <RouterProvider router={routes} />;
}

export default App;