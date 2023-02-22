import React from "react"
import NavBar from "./components/ui/navBar"
import { Switch, Route, Redirect } from "react-router-dom"
import Main from "./layouts/main"
import Login from "./layouts/login"
import Users from "./layouts/users"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./hooks/useProfession"
import { QualityProvider } from "./hooks/useQuality"
import AuthProvider from "./hooks/useAuth"
import ProtectedRoute from "./components/common/protectedToute"
import LogOut from "./layouts/logOut"

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />

        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route exact path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  )
}

export default App
