import { useRecoilValue } from "recoil";
import { cognito_state } from "recoil/state";
import styles from "../styles/Home.module.css";

const Card = () => {
  const test = useRecoilValue(cognito_state);

  return (
    <a className={styles.card}>
      <h2>Recoil State</h2>
      <p>Sub: {test.provider_sub}</p>
      <p>Token: {test.auth_token.substring(0, 8)}... view in console</p>
    </a>
  );
};

export default Card;