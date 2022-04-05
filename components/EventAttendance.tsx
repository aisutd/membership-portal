import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { event } from "util/db/event";
import { profile } from "util/db/profile";
import axios from "axios";
import AccessDenied from "components/AccessDenied";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

const EventAttendance = () => {
  const user = useRecoilValue(profile_state);
  const router = useRouter();
  const [session, loading] = useSession();
  const [success, setSuccess] = useState(false);

  const [events, setEvents] = useState<event[]>([]);

  const submit = async () => {
    const res = await axios.get(router.basePath + "/api/event");
    setEvents(res.data.events);
    setSuccess(true);
  };

  useEffect(() => {
    if (events.length === 0) {
      return;
    }
  }, [events]);

  if (!user.roles.includes("Officers")) {
    return <AccessDenied />;
  }

  return (
    //className="max-w-md rounded overflow-visible shadow-lg"
    <div>
      <>
        <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
          <button
            className=" rounded-full text-white bg-blue-500 font-bold uppercase px-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-36 h-12"
            type="button"
            onClick={submit}
          >
            Refresh
          </button>
          <Link href="/newevent" passHref>
            <button
              className=" rounded-full text-white bg-blue-500 font-bold uppercase px-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-36 h-12"
              type="button"
            >
              Create Event
            </button>
          </Link>
        </div>
      </>
      <>
        {events.map((event, index) => {
          return (
            <div key={index}>
              <div className="px-6 font-bold text-md ">
                Event Name: {event.Name}
              </div>
              {(event.Attendees as profile[]).map((attendee, index) => {
                return (
                  <div key={index} className="px-6 text-md ">
                    {attendee.email ? attendee.email : attendee.user_id}
                  </div>
                );
              })}
              <br />
              <hr />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default EventAttendance;
