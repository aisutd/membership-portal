import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/AccessDenied";
import styles from "../styles/Home.module.css";


const Authenticated: NextPage = () => {
  const [ session, loading ] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Authenticated</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        { !session ? <AccessDenied /> : <h1 className={styles.title}>Welcome back {session.user?.name}</h1>}
      </main>
    </div>
  );
};

export default Authenticated;
