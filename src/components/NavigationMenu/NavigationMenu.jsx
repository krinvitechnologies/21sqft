import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { FaBars } from 'react-icons/fa';

function NavigationMenu() {

    return (
        <>
            <div
            // className={`burger ${isBurgerOpen ? "open" : ""}`}
            // onClick={toggleMenu}
            >
                <FaBars />
            </div>
            <Drawer
                anchor="right"
                open={true}
                onClose={service0}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                }}
            >
                <div className="sidebar-slide">
                    <Link className="navbar-link-color" to="/">
                        Home
                    </Link>
                    <Link
                        className="navbar-link-color"
                        to="/category"
                    >
                        Categories
                    </Link>
                    <Link
                        className="navbar-link-color"
                        to="/blog"
                    >
                        Blog
                    </Link>
                    <Link
                        className="navbar-link-color"
                        to="/contact"
                    >
                        Contact Us
                    </Link>
                </div>
            </Drawer>
        </>
    )
}

export default NavigationMenu
