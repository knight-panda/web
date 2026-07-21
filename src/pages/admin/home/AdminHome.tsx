import React from 'react'
import './AdminHome.css'
import CrazoWebHomeImage from "../../../assets/CrazoWeb_Home_Page.png"

interface AdminNavbarProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminHome:  React.FC<AdminNavbarProps> = ({ setOpenLogin }) => {

    return (
        <div className='ah-container'>
            <div className='ah-left-side'>
                <div className='ah-intro-title'>Create Your Nexr startup</div>
                <div className='ah-intro-desc'>Bring your vision to life with the website builder that gives you the tools you need to succeed. rege erge erge eerh. Bring your vision to life with the website builder that gives you the tools you need to succeed. rege erge erge eerh</div>
                <button className='ah-intro-btn'  onClick={() => setOpenLogin(true)}>Get Start</button>
            </div>

            <div className='ah-right-side'>
                <img className="ah-intro-img" src={CrazoWebHomeImage} alt="logo" />
            </div>
        </div>
    )
}

export default AdminHome