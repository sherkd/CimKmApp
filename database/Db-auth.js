import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
 
async function onCreateAccount() {
  // Get the users ID
  const uid = auth().currentUser.uid;
 
  // Create a reference
  const ref = database().ref(`/users/${uid}`);
 
//   await ref.set({
//     uid,
//     name: 'Joe Bloggs',
//     role: 'admin',
//   });

  console.log('User data: ', snapshot.val());
}