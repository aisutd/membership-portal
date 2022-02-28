import { useRecoilValue } from "recoil";
import { profile_state } from "recoil/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import 'tailwindcss/tailwind.css'
import moment from 'moment';

const EventCheckinBase = () => {
  const user = useRecoilValue(profile_state);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState("");
  const [eventName, setEventName] = useState("");

  const submit = async () => {

    const payload = {
      code: data,
      cognito_id: user.user_id,
    }

    setLoading(true);
    setCheck(true);
    const res = await axios.put(router.basePath + "/api/event", payload);

    setSuccess(res.data.status);
    if (res.data.status) {
      setEventName(res.data.event.EventName);
    }
    setLoading(false);
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
          <div className="px-6 font-bold text-md ">CHECKED IN &#9989;</div>
        </>
      ) : (
        <>
          <div className="px-6 pt-2 pb-2 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Code"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-200 rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring w-56"
                onChange={(e) => {
                  setData(e.target.value);
                }}
              />
            </div>
            <button className=" rounded-full text-white bg-blue-500 font-bold uppercase px-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-36 h-12" type="button" onClick={submit}>
              Check in
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
          {check ? loading ? "loading..." : success ? `` : "Wrong Code. Please try again." : ""}
        </p>
      </div>
    </div>
  );
};

export default EventCheckinBase;