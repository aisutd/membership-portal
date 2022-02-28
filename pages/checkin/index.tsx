import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { subject } from "recoil/state";
import { useRecoilState } from "recoil";
import EventCheckinBase from "components/EventCheckinBase";
import { Suspense } from "react";
import AccessDenied from "components/AccessDenied";
import Sidebar from "components/Sidebar";

const Profile: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [sub, setSub] = useRecoilState(subject);

  // for testing, will fetch profile information & load into recoil global state
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
        <title>Event Checkin</title>
        <meta name="description" content="Join AIS Today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="fixed flex w-full h-full">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full h-full">
          <h1 className="text-left text-3xl font-bold pl-16 pt-12">Check In</h1>
          <div className="w-full pl-10 pt-5 pr-4">
            <Suspense fallback={<span>Loading...</span>}>
              <EventCheckinBase />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;