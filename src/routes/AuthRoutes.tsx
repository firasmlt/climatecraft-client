import ForgotPassword from "../views/authentication/ForgotPassword"
import LoginPage from "../views/authentication/LoginPage"
import RegisterPage from "../views/authentication/RegisterPage"
import ResetPassword from "../views/authentication/ResetPasswordPage"
const AuthRoutes = {
    path: "/",
    children: [
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            path: "/forgotpassword",
            element: <ForgotPassword />,
        },
        {
            path: "/reset",
            element: <ResetPassword />,
        },
    ],
}

export default AuthRoutes
