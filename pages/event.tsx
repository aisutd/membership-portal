import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { useSession } from "next-auth/client";
import EventAttendance from "components/EventAttendance";
import { Suspense, useEffect } from "react";
import { subject } from "recoil/state";
import { useRecoilState } from "recoil";
import AccessDenied from "components/AccessDenied";
import Sidebar from "components/Sidebar";

const Profile: NextPage = () => {
  const [session, loading] = useSession();
  const [sub, setSub] = useRecoilState(subject);


  useEffect(() => {
    if (session) {
      setSub({
        email: session.user?.email as string,
        next_id: session.sub as string,
      });
    }
  }, [session, setSub]);

  if (!session) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <AccessDenied />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Event Attendees</title>
        <meta name="description" content="Join AIS Today!" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main className="fixed flex w-full h-full">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full h-full overflow-y-scroll">
          <h1 className="text-left text-3xl font-bold pl-16 pt-12">Event Attendees</h1>
          <div className="w-full pl-10 pt-5 pr-4">
            <Suspense fallback={<span>Loading...</span>}>
              <EventAttendance />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
