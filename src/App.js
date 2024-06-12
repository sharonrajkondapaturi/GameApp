import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={RegisterForm} />
      <ProtectedRoute path="/login" component={LoginForm} />
      <ProtectedRoute path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
