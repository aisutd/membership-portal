import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession, getCsrfToken } from "next-auth/client";
import { useEffect } from "react";

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const csrfToken = await getCsrfToken();
      console.log(csrfToken);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Membership Portal V2</title>
        <meta name="description" content="Join AIS Today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://aisutd.org">The Student Org</a>
        </h1>

        <p className={styles.description}>Membership Portal V2</p>

        <div className={styles.grid}>
          <a className={styles.card} onClick={() => signIn("cognito")}>
            <h2>Sign In &rarr;</h2>
          </a>

          <a className={styles.card} onClick={() => signOut()}>
            <h2>Sign Out &rarr;</h2>
          </a>

          {session ? (
            <a className={styles.card}>
              <h2>Current State &rarr;</h2>
              <p>ID: {loading ? "Loading" : session?.user?.name}</p>
              <p>Email: {loading ? "Loading" : session?.user?.email}</p>
            </a>
          ) : (
            <a className={styles.card}>
              <h2>Current State &rarr;</h2>
              <p>ID: Not Signed In</p>
              <p>Email: Not Signed In</p>
            </a>
          )}

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

export default Home;
