import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import AccountID from "components/account_id";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { subject } from "recoil/state";
import { useRecoilState } from "recoil";
import EventCheckin from "components/EventCheckin";
import InputCard from "components/InputCard";
import { Suspense } from "react";
import AccessDenied from "components/AccessDenied";

const Profile: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [sub, setSub] = useRecoilState(subject);

//   // for testing, will fetch profile information & load into recoil global state
//   useEffect(() => {
//     if (session) {
//       setSub({
//         email: session.user?.email as string,
//         next_id: session.sub as string,
//       });
//     }
//   }, [session, setSub]);

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

      <main className={styles.main}>
        <h1 className={styles.title}>Event Check-in</h1>

        <p className={styles.description}>Keep attending AIS Events!</p>

        <div className={styles.grid}>
          <Suspense fallback={<span>Loading...</span>}>
            <EventCheckin />
          </Suspense>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Profile;
