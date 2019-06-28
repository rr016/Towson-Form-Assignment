import React from 'react';

const Navbar = () => {
    return (
        <nav className="navigation">
            <h1>TU Young <br /> Professionals</h1>
            <ul>
                <li>
                    <a href="/">Request Info</a>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
