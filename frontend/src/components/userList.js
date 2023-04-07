import * as React from 'react';
import * as styles from '../styles/globalStyles.js';
import User from './user.js';


const UserList = (props) => {

    const users = props.users

    function drawUsers() {
        const userList = []
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            userList.push(<User user={user} key={i} />)
        }
        return userList
    }

    return (
        <div style={styles.userListStyle}>
            {drawUsers()}
        </div>
    )
}

export default UserList

