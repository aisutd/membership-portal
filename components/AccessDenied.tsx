import { signIn } from "next-auth/client";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>
        <Link href="/api/auth/signin" passHref>
          <a
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            You must be signed in to view this page
          </a>
        </Link>
      </p>
    </div>
  );
}
