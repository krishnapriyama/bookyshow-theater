import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// components
const Dashboard = lazy(() => import('./Pages/Dashboard/dashboard'));
const Sidebar = lazy(() => import('./Pages/Dashboard/sidebar'));
const Signup = lazy(() => import('./Pages/Authentication/signup'));
const Login = lazy(() => import('./Pages/Authentication/login'));
const Approval = lazy(() => import('./Pages/404/approval'));
const Addscreen = lazy(() => import('./Pages/screen/addscreen'));
const Viewscreen = lazy(() => import('./Pages/screen/viewscreen'));
const Addmovies = lazy(() => import('./Pages/Movie/addmovies'));
const Viewmovies = lazy(() => import('./Pages/Movie/viewmovies'));
const AddBooking = lazy(() => import('./Pages/Bookings/addbooking'));
const ViewBooking = lazy(() => import('./Pages/Bookings/viebookings'));
const ReportScreens = lazy(() => import('./Pages/Reports/reportScreen'));


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/waiting'} element={<Approval />} />
        {/* child component */}
        <Route path={'/'} element={<Suspense fallback={<div>Loading...</div>}> <Sidebar /> </Suspense>}>
          <Route index element={<Suspense fallback={<div>Loading...</div>}> <Dashboard /> </Suspense>} />
          <Route path={'/add-screen'} element={<Suspense fallback={<div>Loading...</div>}> <Addscreen /> </Suspense>} />
          <Route path={'/add-movies'} element={<Suspense fallback={<div>Loading...</div>}> <Addmovies /> </Suspense>} />
          <Route path={'/view-screens'} element={<Suspense fallback={<div>Loading...</div>}> <Viewscreen /> </Suspense>} />
          <Route path={'/view-movies'} element={<Suspense fallback={<div>Loading...</div>}> <Viewmovies /> </Suspense>} />
          <Route path={'/add-booking'} element={<Suspense fallback={<div>Loading...</div>}> <AddBooking /> </Suspense>} />
          <Route path={'/view-booking'} element={<Suspense fallback={<div>Loading...</div>}> <ViewBooking /> </Suspense>} />
          <Route path={'/report-screen'} element={<Suspense fallback={<div>Loading...</div>}> <ReportScreens /> </Suspense>} />
        </Route>
        {/* end */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
