import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({user}) => {
  return(
    <div className="header">
                    <div className="user-info">
                        {user?.first_name ? (
                            <>
{user.your_image && user.your_image.url ? (
                <img
                    src={`${baseURL}${user.your_image.url}`}
                    alt="Profile from your_image"
                    className="profile-picture"
                    onClick={() => handleTabClick('myaccount')}
                />
            ) : user.image !=""? (
                <img
                    src={user.image}
                    alt="Profile from image field"
                    className="profile-picture"
                    onClick={() => handleTabClick('myaccount')}
                />
            ) : (
                <img
                    src={`${baseURL}/uploads/default_avatar_42affc6124.png`}
                    alt="Default Profile"
                    className="profile-picture"
                    onClick={() => handleTabClick('myaccount')}
                />
            )}
            <span>Hello {user.first_name}</span>
        </>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                    <input type="text" placeholder="Search" className="search-box" />
                </div>
  );

};

export default Header;
