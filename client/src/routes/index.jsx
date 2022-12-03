/* Pages */
import Home from "../pages/Home";

import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Profile from "../pages/Auth/Profile.jsx";

import Error404 from "../pages/Error/Error404.jsx";

import BookingView from "../pages/Bookings";

import BookablesView from "../pages/Bookables";
import BookablesEdit from "../pages/Bookables/Edit.jsx";
import BookablesNew from "../pages/Bookables/New.jsx";

import UserView from "../pages/Users";

const routes = [


  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },

  { path: "/bookings", component: BookingView },

  { path: "/bookables", component: BookablesView },
  { path: "/bookables/new", component: BookablesNew },
  { path: "/bookables/:id/edit", component: BookablesEdit },
  { path: "/bookables/:id", component: BookablesView },

  { path: "/users", component: UserView },

  { path: "/", component: Home},
  
  { path: "/*", component: Error404},

];

export default routes;
