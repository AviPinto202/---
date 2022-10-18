import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, get, child, set, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react';
import EditInput from '../components/EditInput';


const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const { user } = UserAuth();

    const getUser = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const updateUser = () => {
        const db = getDatabase();
        if (firstName && lastName === '')
            update(ref(db, `users/${user.uid}`), {
                firstName: firstName,
                lastName: lastName,
            })
                .then(() => {
                    console.log('update user sucssesfully')
                })
                .catch((error) => {
                    console.log(error)
                });
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className='profile_container'>
            <h1>Profile</h1>
            <div className='detailsBox'>
                <form className='editUser' onSubmit={updateUser}>
                    <label>
                        Edit Your First Name
                        <EditInput id='firstName' valueof={userData.firstName} set={setFirstName}
                        />
                    </label>
                    <label>
                        Edit Your Last Name
                        <EditInput id='lastName' valueof={userData.lastName} set={setLastName} />
                    </label>
                    {/* <input type="reset" /> */}
                    <input type='submit' value="Update" />
                </form>
            </div>
        </div>
    );
}

export default Profile;