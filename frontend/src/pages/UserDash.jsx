import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';


const UserDash = () => {
    const styles = {
        display: 'grid',
        gridTemplateColumns: '0.2fr 1.2fr',
        gridTemplateRows: '0.4fr 2.3fr 0.2fr',
        gridTemplateAreas: `
            "navbar navbar"
            "sidebar content"
            "footer footer"
        `,
    };
    const [selectedElement, setSelectedElement] = useState(null);
    return (
        <div style={styles}>
            <div style={{ gridArea: 'navbar' }}>
                <Navbar />
            </div>
            <div style={{ gridArea: 'sidebar' }}>
                <Sidebar onSelectElement={setSelectedElement}/>
            </div>
            <div style={{ gridArea: 'content' }}>
                {selectedElement}
            </div>
            <div style={{ gridArea: 'footer' }}>
                <Footer/>
            </div>
        </div>
    );
};

export default UserDash;
