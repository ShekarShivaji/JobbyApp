import {Route, Redirect, Switch} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import ProtectedRoutes from './components/ProtectedRoutes'
import Jobs from './components/Jobs'
import JobItemsDetailsRoute from './components/JobItemsDetailsRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/jobs" component={Jobs} />
    <ProtectedRoutes exact path="/jobs/:id" component={JobItemsDetailsRoute} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
