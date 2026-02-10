import React from 'react'
import './AppDownload.css'
 import download from "../../assets/download.png";
  import play_store from "../../assets/play_store.png";
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
    <p>Download our E-Commerce App and experience online shopping the way. <br /> it’s meant to be — fast, smooth, and personalized</p>
    <div className="app-download-platforms">
        <img src={download} alt="" />
        <img src={play_store} alt="" />
    </div>


  
</div>
  )
}

export default AppDownload