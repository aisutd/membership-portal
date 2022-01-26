import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { event } from "util/db/event";
import { profile } from "util/db/profile";
import axios from "axios";
import AccessDenied from "components/AccessDenied";

const EventAttendance = () => {
  const user = useRecoilValue(profile_state);
  const router = useRouter();

  const [events, setEvents] = useState<event[]>([]);

  const submit = async () => {
    const res = await axios.get(router.basePath + "/api/event");

    console.log(user);

    setEvents(res.data.events);
  };

  useEffect(() => {
    if (events.length === 0) {
      return;
    }
  }, [events]);

  if (!user.roles.includes('Officers')) {
    return (<AccessDenied />)
  }

  return (
    <a className={styles.card}>
      <h2>Longer String Here&rarr;</h2>

      {events.map((event: event, index: number) => {
        return (
          <div key={index}>
            <h4>{event.Name}</h4>
            {(event.Attendees as profile[]).map(
              (attendee: profile, index: number) => {
                return <p key={index}>{attendee.email}</p>;
              }
            )}
          </div>
        );
      })}

      <Button
        style={{ marginTop: 10, marginLeft: 10 }}
        color="primary"
        onClick={submit}
      >
        Fetch All Events
      </Button>
    </a>
  );
};

export default EventAttendance;
