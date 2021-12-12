import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import styles from "../styles/Home.module.css";

const ProfileCard = () => {
  const user = useRecoilValue(profile_state);

  return (
    <a
      className={styles.card}
    >
      <h2>User Attributes&rarr;</h2>
      <p>Email: {user.email}</p>
      <p>OAuth ID: {user.cognito_username}</p>
      <p>Next ID: {user.next_id}</p>
      <p>Cognito Sub: {user.user_id}</p>
      <p>Creation Date: {new Date(user.creation_date).toDateString()}</p>
      <p>NetID: {user.netid}</p>
      <p>Exists: {user.exists}</p>
    </a>
  );
};

export default ProfileCard;
