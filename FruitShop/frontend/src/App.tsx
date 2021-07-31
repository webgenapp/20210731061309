import React, { useEffect } from 'react'

import CreateFruit from './fruits/CreateFruit'
import ListFruit from './fruits/ListFruit'
import DetailFruit from './fruits/DetailFruit'
import UpdateFruit from './fruits/UpdateFruit'

import CreatePaycheck from './paychecks/CreatePaycheck'
import ListPaycheck from './paychecks/ListPaycheck'
import DetailPaycheck from './paychecks/DetailPaycheck'
import UpdatePaycheck from './paychecks/UpdatePaycheck'

import CreateUser from './users/CreateUser'
import ListUser from './users/ListUser'
import DetailUser from './users/DetailUser'
import UpdateUser from './users/UpdateUser'

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import client, { fetchCSRFToken, hasCSRFToken } from './api'

function App() {
  const { data: user } = useQuery('user', () => client.get('/auth/me'), {
    retry: false,
  })

  useEffect(() => {
    if (!hasCSRFToken()) fetchCSRFToken()
  }, [])

  return (
    <Router>
      <nav>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/register'>Register</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/fruits'>Fruits</Link>
            <br />
            <Link to='/fruits/create'>Create a Fruit</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/paychecks'>Paychecks</Link>
            <br />
            <Link to='/paychecks/create'>Create a Paycheck</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/users'>Users</Link>
            <br />
            <Link to='/users/create'>Create a User</Link>
            <br />
          </li>
        </ul>
      </nav>
      <main>
        <Route path='/fruits'>
          <h1>Fruits</h1>
        </Route>

        <Route path='/paychecks'>
          <h1>Paychecks</h1>
        </Route>

        <Route path='/users'>
          <h1>Users</h1>
        </Route>

        <Switch>
          {/* Fruit routes */}
          <Route path='/fruits/create' component={CreateFruit} />
          <Route path='/fruits/update/:id' component={UpdateFruit} />
          <Route path='/fruits/detail/:id' component={DetailFruit} />
          <Route path='/fruits' component={ListFruit} />,{/* Paycheck routes */}
          <Route path='/paychecks/create' component={CreatePaycheck} />
          <Route path='/paychecks/update/:id' component={UpdatePaycheck} />
          <Route path='/paychecks/detail/:id' component={DetailPaycheck} />
          <Route path='/paychecks' component={ListPaycheck} />,
          {/* User routes */}
          <Route path='/users/create' component={CreateUser} />
          <Route path='/users/update/:id' component={UpdateUser} />
          <Route path='/users/detail/:id' component={DetailUser} />
          <Route path='/users' component={ListUser} />
          {/* auth routes */}
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
