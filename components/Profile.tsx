import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import styles from "../styles/Home.module.css";

const ProfileCard = () => {
  const user = useRecoilValue(profile_state);

  console.log(user);

  return (
    <a
      className={styles.card}
    >
      <h2>User Attributes&rarr;</h2>
      <p>Email: {user.email.substring(0, 15)}...</p>
      <p>OAuth ID: {user.cognito_username.substring(0, 12)}...</p>
      <p>Next ID: {user.next_id.substring(0, 12)}...</p>
      <p>Cognito Sub: {user.user_id.substring(0, 8)}...</p>
      <p>Creation Date: {new Date(user.creation_date).toDateString().substring(0, 8)}...</p>
      <p>NetID: {user.netid}</p>
      <p>Exists: {user.exists ? "true" : "false"}</p>
    </a>
  );
};

export default ProfileCard;
