import { useRecoilValue, useRecoilState } from "recoil";
import { profile_state, subject } from "recoil/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import "tailwindcss/tailwind.css";
import AccessDenied from "components/AccessDenied";

const EventCreation = () => {
  const user = useRecoilValue(profile_state);
  const router = useRouter();
  const [session] = useSession();
  const [sub, setSub] = useRecoilState(subject);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    if (session) {
      setSub({
        email: session.user?.email as string,
        next_id: session.sub as string,
      });
    }
  }, [session, setSub]);

  const submit = async () => {
    if (!user) {
      return;
    }

    const payload = {
      event: {
        EventName: eventName,
        url: eventCode,
        date: new Date(eventDate),
      },
    };

    setLoading(true);
    setCheck(true);
    const res = await axios.post(router.basePath + "/api/event", payload);

    if(res.data.message === "success") {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (!user.roles.includes("Officers")) {
    return <AccessDenied />;
  }

  return (
    //className="max-w-md rounded overflow-visible shadow-lg"
    <div>
      {/* <div className="px-6 py-4">
        <div className="font-bold text-sm text-indigo-600">SOCIAL EVENT</div>
        <div className="font-bold text-xl">AIS Member-Wide Meeting</div>
        <p className="text-gray-700 text-base">
          Want to get invloved and learn more about AI? Come get some pizza and listen to what AIS has to offer.
        </p>
        <p className="text-base mt-1">
          {moment().format('dddd, MMMM Do YYYY')} <br />
          {moment().format('h:mm a') + ' CDT'} <br />
          ECSS 2.102
        </p>
      </div>
      <div className="px-6 pb-2">
        <div className="font-bold text-sm mb-2">Tags</div>
        <span className="inline-block bg-indigo-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">social</span>
        <span className="inline-block bg-indigo-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">members</span>
      </div> */}
      {success ? (
        <>
          <div className="px-6 font-bold text-md ">Success &#9989;</div>
        </>
      ) : (
        <>
          <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Event Name"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-200 rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring w-80"
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Event Date Format: YYYY-MM-DD"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-200 rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring w-80"
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Code"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-200 rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring w-80"
                onChange={(e) => {
                  setEventCode(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <button
              className=" rounded-full text-white bg-blue-500 font-bold uppercase px-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-36 h-12"
              type="button"
              onClick={submit}
            >
              Create Event
            </button>
          </div>
        </>
      )}
      {/* <div className="px-6 pt-2 pb-2 flex flex-row">
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Code"
            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </div>
        <button className="text-blue-500 background-transparent font-bold uppercase px-3 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={submit}>
          Check in
        </button>
      </div> */}
      <div className="px-6 mb-2">
        <p className="text-gray-500 text-sm">
          {check
            ? loading
              ? "loading..."
              : success
              ? ``
              : "Error. Please try again."
            : ""}
        </p>
      </div>
    </div>
  );
};

export default EventCreation;
