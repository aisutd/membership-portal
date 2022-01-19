import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const EventCheckin = () => {
  const user = useRecoilValue(profile_state);
  const router = useRouter();


  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const payload = {
      code: router.asPath.split("/checkin/")[1],
      cognito_id: user.user_id,
    };

    (async() => {
      setLoading(true);
      const res = await axios.put(router.basePath + "/api/event", payload);

      if (res.data.status) {
        setEventName(res.data.event.EventName);
      }
      setSuccess(res.data.status);
      setLoading(false);
    })();
  }, []);

  return (
    <a
      className={styles.card}
    >
      <h2>Checkin Status&rarr;</h2>
      <p>{loading ? "loading..." : success ? `Checked In to ${eventName}!` : "Failed!"}</p>
    </a>
  );
};

export default EventCheckin;
