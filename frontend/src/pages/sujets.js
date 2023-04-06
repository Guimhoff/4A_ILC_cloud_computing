import React from 'react';
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'



const Sujets = () => {
    return (
        <GlobalLayout title="Sujets">
            <p style={styles.paragraphStyles}>
                Les sujets
            </p>
        </GlobalLayout>
    );
}

export default Sujets;


