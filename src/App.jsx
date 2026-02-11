import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './Pages/LandingPage/LandingPage.jsx';
import MobilePage from './Pages/MobilePage.jsx';
import ComputerPage from './Pages/ComputerPage.jsx';
import MenPage from './Pages/MenPage.jsx';
import WomanPage from './Pages/Womanpage.jsx';
 import WatchPage from './Pages/Watchpage.jsx';
import FurniturePage from './Pages/FurniturePage.jsx';
import AcPage from './Pages/Acpage.jsx';
import Kitchenpage from './Pages/Kitchenpage.jsx';
import Fridgepage from './Pages/Fridgepage.jsx';
import Speakerpage from './Pages/Speakerpage.jsx';
import Tvpage from './Pages/Tvpage.jsx';
import Bookpage from './Pages/Bookpage.jsx';

import Mobilesingle from './Singles/Mobliesingle.jsx';
import Computersingle from './Singles/Computersingle.jsx';
import Mensingle from './Singles/Mensingle.jsx';
import Womansingle from './Singles/Womansingle.jsx';
import Watchsingle from './Singles/Watchsingle.jsx';
import Furnituresingle from './Singles/Furnituresingle.jsx';
import Acsingle from './Singles/Acsingle.jsx';
import Kitchensingle from './Singles/Kitchensingle.jsx';
import Fridgesingle from './Singles/Fridgesingle.jsx';
import Speakersingle from './Singles/Speakersingle.jsx';
import Tvsingle from './Singles/Tvsingle.jsx';
import Booksingle from './Singles/Booksingle.jsx';

import Login from './Components/Login/Login.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';

import SigninPopup from './Components/Login/Login.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Orders from './Components/Order/Order.jsx';
 import BodyLotion from './Components/Explore/BodyLotion.jsx';
import Womenwear from './Components/Explore/womenwear.jsx';
import HomeDecor from './Components/Explore/Home decor.jsx';
import StudyTable from './Components/Explore/studytable.jsx';
import Menswear from './Components/Explore/Menswear.jsx';
import Jewellery from './Components/Explore/Jewellery.jsx';
import Footwear from './Components/Explore/Footwear.jsx';
import Makeup from './Components/Explore/Makeup.jsx';
import Kidswear from './Components/Explore/Kidswear.jsx';


const App = () => {
  const [showLogin, setShowlogin] = useState(false);

  return (
    <>
      {showLogin ? <SigninPopup setShowlogin={setShowlogin} /> : <></>}

      <Navbar setShowlogin={setShowlogin} showLogin={showLogin} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
      


        <Route path="/mobiles" element={<MobilePage />} />
        <Route path="/mobiles/:id" element={<Mobilesingle />} />

        <Route path="/computers" element={<ComputerPage />} />
        <Route path="/computers/:id" element={<Computersingle />} />

        <Route path="/mens" element={<MenPage />} />
        <Route path="/men/:id" element={<Mensingle />} />

        <Route path="/woman" element={<WomanPage />} />
        <Route path="/woman/:id" element={<Womansingle />} />

        <Route path="/watches" element={<WatchPage />} />
        <Route path="/watch/:id" element={<Watchsingle />} />

        <Route path="/furniture" element={<FurniturePage />} />
        <Route path="/furniture/:id" element={<Furnituresingle />} />

        <Route path="/ac" element={<AcPage />} />
        <Route path="/ac/:id" element={<Acsingle />} />

        <Route path="/kitchen" element={<Kitchenpage />} />
        <Route path="/kitchen/:id" element={<Kitchensingle />} />

        <Route path="/fridges" element={<Fridgepage />} />
        <Route path="/fridge/:id" element={<Fridgesingle />} />

        <Route path="/speakers" element={<Speakerpage />} />
        <Route path="/speaker/:id" element={<Speakersingle />} />

        <Route path="/tv" element={<Tvpage />} />
        <Route path="/tv/:id" element={<Tvsingle />} />

        <Route path="/books" element={<Bookpage />} />
        <Route path="/books/:id" element={<Booksingle />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/orders" element={<Orders />} />
          <Route path="/bodylotion" element={<BodyLotion />} />
           <Route path="/womenwear" element={<Womenwear />} />
            <Route path="/homedecor" element={<HomeDecor />} />
             <Route path="/studytable" element={<StudyTable />} />
               <Route path="/menswear" element={<Menswear />} />
                <Route path="/jewellery" element={<Jewellery />} />
                 <Route path="/jewellery" element={<Jewellery />} />
                 <Route path="/footwear" element={<Footwear />} />
                 <Route path="/makeup" element={<Makeup />} />
                 <Route path="/kidswear" element={<Kidswear />} />
      </Routes>

    
      <Footer />
    </>
  );
};

export default App;
