import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import SignIn from "./signInPage";
import { signIn, signOut, useSession } from "next-auth/client";

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  console.log(session);
  console.log(process.env.COGNITO_DOMAIN)

  return (
    <div>
      <Head>
        <title>Membership Portal</title>
        <meta name="description" content="Join AIS Today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to{" "}
              <a href="https://aisutd.org">Artifical Intelligence Society</a>
            </h1>

            <p className={styles.description}>AIS Membership Portal</p>

            <div className={styles.grid}>
              <a className={styles.card} onClick={() => signIn("cognito")}>
                <h2>Sign In &rarr;</h2>
              </a>

              <a className={styles.card} onClick={() => signOut()}>
                <h2>Sign Out &rarr;</h2>
              </a>

              <a className={styles.card}>
                <h2>Current State &rarr;</h2>
                <p>ID: {loading ? "Loading" : session?.user?.name}</p>
                <p>Email: {loading ? "Loading" : session?.user?.email}</p>
              </a>

              <a
                className={styles.card}
                onClick={() => {
                  router.push("/secure");
                }}
              >
                <h2>Secure Page &rarr;</h2>
              </a>
            </div>
          </main>
        </>
      ) : (
        <>
          <SignIn></SignIn>
        </>
      )}
    </div>
  );
};

export default Home;