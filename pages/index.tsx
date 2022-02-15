import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import SignIn from "./signInPage";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { subject } from "recoil/state";
import { useRecoilState } from "recoil";
import { Suspense } from "react";
import Card from "components/card";
import Sidebar from "components/Sidebar";


const Home: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [sub, setSub] = useRecoilState(subject);

  console.log(session);
  console.log(process.env.COGNITO_DOMAIN)
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
    return (<SignIn />)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Membership Portal</title>
        <meta name="description" content="Join AIS Today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="fixed flex w-full h-full">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full h-full">
          <div className="w-full pl-10 pt-5 pr-4">
            <div>
              <div className="px-6 pt-2 pb-2 flex flex-row">
                <p className="text-3xl text-center text-black font-bold tracking-wide">Welcome to AIS Membership Portal</p>
              </div>
              <div className="max-w-md rounded overflow-visible shadow-lg px-6">
                <p className="text-black font-medium text-center text-lg">Click <a className="text-blue-700" href="/checkin">here</a> to go to Check In Page</p>
              {/* <ul className="list-disc pl-2">
                  <li>Now this is a story all about how, my life got flipped turned upside down</li>
                  <li>Now this is a story all about how, my life got flipped turned upside down</li>
                  <li>Now this is a story all about how, my life got flipped turned upside down</li>
                  <li>Now this is a story all about how, my life got flipped turned upside down</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // <div>
    //   <Head>
    //     <title>Membership Portal</title>
    //     <meta name="description" content="Join AIS Today!" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <main className={styles.main}>
    //     <h1 className={styles.title}>
    //       Welcome to{" "}
    //       <a href="https://aisutd.org">Artifical Intelligence Society</a>
    //     </h1>

    //     <p className={styles.description}>AIS Membership Portal</p>

    //     <div className={styles.grid}>
    //       <a className={styles.card} onClick={() => signIn("cognito")}>
    //         <h2>Sign In &rarr;</h2>
    //       </a>

    //       <a className={styles.card} onClick={() => signOut()}>
    //         <h2>Sign Out &rarr;</h2>
    //       </a>

    //       <a className={styles.card}>
    //         <h2>Current State &rarr;</h2>
    //         <p>ID: {loading ? "Loading" : session?.user?.name}</p>
    //         <p>Email: {loading ? "Loading" : session?.user?.email}</p>
    //       </a>

    //       <a
    //         className={styles.card}
    //         onClick={() => {
    //           router.push("/secure");
    //         }}
    //       >
    //         <h2>Secure Page &rarr;</h2>
    //       </a>
    //     </div>
    //   </main>
    // </div>
  );
};

export default Home;