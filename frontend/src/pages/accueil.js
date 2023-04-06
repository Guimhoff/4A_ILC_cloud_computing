import React from 'react';
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'



const Accueil = () => {
    return (
        <GlobalLayout title="Accueil">
            <p style={styles.paragraphStyles}>
                Plein de trucs cools ici !
            </p>
        </GlobalLayout>
    );
}

export default Accueil;


