import { useRecoilValue } from "recoil";
import { cognito_state } from "recoil/state";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Card = () => {
  const user = useRecoilValue(cognito_state);
  const router = useRouter();

  return (
    <a
      className={styles.card}
      onClick={() => {
        router.push(`/profile`);
      }}
    >
      <h2>Navigate to Profile &rarr;</h2>
      <p>Sub: {user.provider_sub}</p>
      <p>Token: {user.auth_token.substring(0, 8)}... view in console</p>
    </a>
  );
};

export default Card;
