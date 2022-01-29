import type { NextPage } from "next";
import Head from "next/head";
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/client";

const SignIn: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign In to AIS Portal!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col lg:flex-row">
          <div className="bg-gray w-screen min-h-screen left-0 relative">
            <div className="flex flex-row justify-center items-center h-1/3 pt-10 relative ">
              <Image
                src="/AIS_Black_Square-removebg-preview.png"
                alt="AIS logo"
                width={190}
                height={144}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <div>
                <p className="text-white text-5xl font-sans subpixel-antialiase tracking-wide font-bold text-center">AIS Membership</p>
              </div>
              <div>
                <p className="text-white text-5xl font-sans subpixel-antialiase justify-center tracking-wide font-bold text-center">Portal</p>
              </div>
              <div className="justify-center mt-2">
                <p className="text-white text-lg font-sans subpixel-antialiase tracking-wide font-bold text-center">
                  Welcome to the Membership Portal. Here you can find
                </p>
                <p className="text-white text-lg font-sans subpixel-antialiase tracking-wide font-bold text-center">
                  information about our exclusive events, open
                </p>
                <p className="text-white text-lg font-sans subpixel-antialiase tracking-wide font-bold text-center">
                  applications, and attendance information
                </p>
              </div>
              <div className="pt-5 place-items-center lg:hidden">
                <p className="text-white text-2xl font-bold tracking-wide text-center">
                  Sign In/ Sign <br />
                </p>
                <p className="text-white text-2xl font-bold tracking-wide text-center">
                  Up
                </p>
                <div className="items-center">
                  <a onClick={() => signIn("cognito")}>
                    <img src="/google_btn.png" alt="AIS logo" width={330} />
                  </a>
                  <a href="https://coda.io/form/AIS-Membership-Application_dNezXZc0_Z1">
                    <div className="flex flex-row rounded border border-gray-400 mt-5 ml-1 w-80">
                      <svg className="mt-1 ml-1" width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect x="0.622314" width="48.5576" height="51" fill="url(#pattern0)" />
                        <defs>
                          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_456_1656" transform="translate(-0.0251493) scale(0.00525149 0.005)" />
                          </pattern>
                          <image id="image0_456_1656" width="200" height="200" xlinkHref="data:image/png;base64,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" />
                        </defs>
                      </svg>
                      <p className="m-4 font-bold tracking-wide text-lg text-gray-400">Apply to be a Member</p>
                    </div>
                  </a>
                </div>

                <div className="mt-4 mb-20">
                  <p className="text-center">
                    <a className="text-blue-600" href="https://aisutd.org">Learn more</a> about AIS <br />
                  </p>
                  <p className="text-center">
                    Membership!
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-5 flex flex-row justify-center space-x-8 ">
              <div>
                <svg width="40" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="https://discord.com/invite/7fZQZyP">
                    <path d="M33.7693 8.61568C30.6137 6.05318 25.6216 5.6188 25.408 5.60318C25.0766 5.57505 24.7607 5.76255 24.6245 6.07193C24.6121 6.09068 24.5037 6.3438 24.3829 6.73755C26.4702 7.0938 29.0343 7.80943 31.3538 9.26255C31.7254 9.4938 31.84 9.98755 31.6108 10.3626C31.4591 10.6094 31.2021 10.7438 30.9357 10.7438C30.7933 10.7438 30.6477 10.7032 30.5177 10.6219C26.529 8.12505 21.5494 8.00005 20.5894 8.00005C19.6294 8.00005 14.6466 8.12505 10.6611 10.6219C10.2894 10.8563 9.80015 10.7407 9.57099 10.3657C9.33873 9.98755 9.45331 9.49693 9.82492 9.26255C12.1444 7.81255 14.7086 7.0938 16.7958 6.74068C16.675 6.3438 16.5666 6.0938 16.5573 6.07193C16.418 5.76255 16.1052 5.5688 15.7708 5.60318C15.5571 5.6188 10.5651 6.05318 7.36607 8.65005C5.6969 10.2094 2.35547 19.3219 2.35547 27.2001C2.35547 27.3407 2.39263 27.4751 2.46076 27.5969C4.76477 31.6844 11.0543 32.7532 12.4882 32.8001C12.4944 32.8001 12.5036 32.8001 12.5129 32.8001C12.7669 32.8001 13.0053 32.6782 13.154 32.4719L14.6033 30.4594C10.692 29.4407 8.6946 27.7094 8.58002 27.6063C8.25176 27.3157 8.22079 26.8094 8.51189 26.4782C8.79989 26.1469 9.30157 26.1157 9.62983 26.4063C9.67628 26.4501 13.3553 29.6001 20.5894 29.6001C27.8358 29.6001 31.5148 26.4376 31.552 26.4063C31.8803 26.1188 32.3788 26.1469 32.6699 26.4813C32.9579 26.8126 32.927 27.3157 32.5987 27.6063C32.4841 27.7094 30.4867 29.4407 26.5755 30.4594L28.0248 32.4719C28.1734 32.6782 28.4118 32.8001 28.6658 32.8001C28.6751 32.8001 28.6844 32.8001 28.6906 32.8001C30.1244 32.7532 36.414 31.6844 38.718 27.5969C38.7861 27.4751 38.8233 27.3407 38.8233 27.2001C38.8233 19.3219 35.4818 10.2094 33.7693 8.61568ZM15.4363 24.0001C13.9034 24.0001 12.6616 22.5688 12.6616 20.8001C12.6616 19.0313 13.9034 17.6001 15.4363 17.6001C16.9692 17.6001 18.211 19.0313 18.211 20.8001C18.211 22.5688 16.9692 24.0001 15.4363 24.0001ZM25.7424 24.0001C24.2095 24.0001 22.9677 22.5688 22.9677 20.8001C22.9677 19.0313 24.2095 17.6001 25.7424 17.6001C27.2753 17.6001 28.5171 19.0313 28.5171 20.8001C28.5171 22.5688 27.2753 24.0001 25.7424 24.0001Z" fill="white" />
                  </a>
                </svg>
              </div>
              <div>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="https://www.linkedin.com/company/ais-utd/">
                    <path d="M31.768 5.33337H7.98463C6.5246 5.33337 5.34204 6.52671 5.34204 8.00004V32C5.34204 33.4734 6.5246 34.6667 7.98463 34.6667H31.768C33.228 34.6667 34.4106 33.4734 34.4106 32V8.00004C34.4106 6.52671 33.228 5.33337 31.768 5.33337ZM14.5303 29.3334H10.6325V16.6774H14.5303V29.3334ZM12.5418 14.868C11.2852 14.868 10.2692 13.84 10.2692 12.5747C10.2692 11.3094 11.2866 10.2827 12.5418 10.2827C13.7944 10.2827 14.8131 11.3107 14.8131 12.5747C14.8131 13.84 13.7944 14.868 12.5418 14.868ZM29.1307 29.3334H25.2355V23.1787C25.2355 21.7107 25.2091 19.8227 23.2099 19.8227C21.1817 19.8227 20.8699 21.4214 20.8699 23.072V29.3334H16.9747V16.6774H20.714V18.4067H20.7669C21.2874 17.412 22.5585 16.3627 24.4546 16.3627C28.4013 16.3627 29.1307 18.984 29.1307 22.392V29.3334Z" fill="white" />
                  </a>
                </svg>
              </div>
              <div>
                <svg width="40" height="40" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="https://www.instagram.com/utdais/?hl=en">
                    <path d="M9.85703 1.80005C5.59386 1.80005 2.12744 5.29805 2.12744 9.60005V20.4C2.12744 24.702 5.59386 28.2 9.85703 28.2H20.5595C24.8227 28.2 28.2891 24.702 28.2891 20.4V9.60005C28.2891 5.29805 24.8227 1.80005 20.5595 1.80005H9.85703ZM22.3433 6.60005C22.9973 6.60005 23.5325 7.14005 23.5325 7.80005C23.5325 8.46005 22.9973 9.00005 22.3433 9.00005C21.6892 9.00005 21.1541 8.46005 21.1541 7.80005C21.1541 7.14005 21.6892 6.60005 22.3433 6.60005ZM15.2083 8.40005C18.8174 8.40005 21.7487 11.358 21.7487 15C21.7487 18.642 18.8174 21.6 15.2083 21.6C11.5992 21.6 8.66786 18.642 8.66786 15C8.66786 11.358 11.5992 8.40005 15.2083 8.40005ZM15.2083 9.60005C12.2591 9.60005 9.85703 12.024 9.85703 15C9.85703 17.976 12.2591 20.4 15.2083 20.4C18.1574 20.4 20.5595 17.976 20.5595 15C20.5595 12.024 18.1574 9.60005 15.2083 9.60005Z" fill="white" />
                  </a>
                </svg>
              </div>
            </div>
          </div>
          <div className="hidden lg:block bg-white w-screen h-screen right-0 relative">
            <div className="flex flex-col justify-center items-center pt-30%">
              <p className="text-black text-2xl font-bold tracking-wide">
                Sign In/ Sign <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Up
              </p>
              <a onClick={() => signIn("cognito")}>
                <img src="/google_btn.png" alt="AIS logo" width={330} />
              </a>
              <a href="https://coda.io/form/AIS-Membership-Application_dNezXZc0_Z1">
                <div className="flex flex-row rounded border border-gray-400 mt-5 w-80">
                  <svg className="mt-1 ml-1" width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect x="0.622314" width="48.5576" height="51" fill="url(#pattern0)" />
                    <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_456_1656" transform="translate(-0.0251493) scale(0.00525149 0.005)" />
                      </pattern>
                      <image id="image0_456_1656" width="200" height="200" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAALNUlEQVR4Ae2dSag2RxWGTyYNgiCEiKDZBERdxAHcq4tAVoJLN4Kb4ELcujFqTIxj4hTHmDhPuNGdIIiIChERQUMEcSNKUCQbXTiBUv9/3z+55+vqrq+6q0931/PB5dzq7qpz6jn9fJ07/DdmvCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAS2SOBtZva/HX9skSk1HYgAghyomWxleQIIsjxTVjwQAQQ5UDPZyvIEEGR5pqx4IAIIcqBmspXjE7jVzH5zxnfVjk+EHULggsC5cqRvT/OCQBcEauRAkC5uDTZZKweCcO8cnkCJHN8d+Zrk8IDYYL8ESuT4jpndiCD93iS97vwcORKj3O+L9cqPfR+YwLlyIMgKN8N1ZvZiM3ulmb22s48V8BanKJHj22Z2g1uRJ4gDssTw+WZ2t5n9wMz+PvKYzsE/yvElWC6xRq0cKXeuF0vU1d0aN5nZO83s6RGwOeBHPL6FG6BEjm8NPDlUe64vOk8sJHC7mf0KMS694xaia3ZZiRzfHJEjFYYgC7TnDjP7ywjMHOSjH18AbfUSS8iBINX4n5n4EjN7CjkG32mfobTuZyVyfGPiyaGKc29iOk8cIZC+Q/WTAjn+cfGbor80s54+RtA1O7WkHKlIBJnRqreOAExgf2pmd138RHZGGqYWEiiR4+uFTw6lRBCRODNeb2Z/GBHkHjNLTxhe6xBoIUeqHEEq+3fnCLwHKtdkWh2BUjnSm9q5LwQ5l9jF9Z/MCPIk/0lVSbRuWokcXzOzGjlSRQhS1xd7PAMv/VtrXusQKJHjqzPkSLtAkMpe/i0DL/3AkFd7AmvIkXaBIJW9/G8GXvo3BLzaEkhy/DbDXzf0V2Y+ObQDreejzhMzBDwwjTOXc3ghAiVyfHkhOVLJ6quPC23nuMt4YBofd8fxO1tbjrRj9dXHeBobr8AD03jjZe+2vBI5vrTgk0Og1FcfdZ6YIeCBaZy5nMMzCETJkUpWX32csZ0+pnpgGvex+/V2WSLHYw2eHNqh+uqjzhMzBDwwjTOXc7iCQLQcqWT11ceK7fQ1xQPTuC8K7Xa7BTnS7tRXH9vt/CAre2AaH2R7odsokePRlX4ZVH31MRTQHpJ7YBrvofYt11gixxdXkiNxUl993DLDTdTmgWm8ieJ2WsTW5EgY1Vcfd4p4vbI9MI3Xq+BYmUrkeGTFJ4foqq8+6jwxQ8AD0zhzOYdHCJTI8YUAOVLJ6quPI9vhFOCWuwe2LAd9ntFn/46i8Ywlu5taIsfng54caob66qPOEzMEPDCNM5dz2BEokeNzwXKkktVXH912GHoCHpjG/jrGpwT2IkeqXH318XRXHLlEwAPT+NJFDE4IlMjx2Q08OVS4+uqjzhMzBDwwjTOXc9jM9iZHapr66iMNnSDggWk8Ma3b0y8s+Geyn9nQk0ONUl991HlihoAHpnHm8q4Pl8jx6Q3KkZr26sxH1w0t2byE8LFkbk/X7FmOnvq0+F69GBovnmjHC5bKseMtUnqOgITwMXd9b8dL5Hi4Nyg97deLoXFPDHJ7RY4cmY6OSwgfO0IwuNUSOT41OJODhyLgxdD4UJs8czMlcqQ/+s2rAwISwscOtj64ReQYxNLvQS+Gxj0SKZHjEz2C6XnPEsLH3pggR28dL9yvF0PjwumHuKxEjo9vYKfvNrP0hx78x20bqO2wJUgIHw+7YbexEjk+5uZEDX+d+aXD9GskvBoR8GJo3CjdppbdkxwJHIIE3D4SwseAUlZNWSLHQ6tWNJ0MQaYZLX6FF0PjxRNtaMESOR7cUL0qBUFEYsUoIXxcsYRVU+1VjgQJQVa9Va4m82JoHFBK85Qlcny0eRX1CRCknl31TAnhY/WCG51YIsdHNlq7ykIQkVgxejE0XrGE5qmOIEeChCDNb5XTBBLCx9Mr93mkRI4P72RrCBLQKC+GxgGlLJ4yyfFE5odr2ueHFs/abkEEacc2u7JuFB+zE3Zy4mhyJOwIEnDzeTE0DihlsZQlcnxwsWzrLYQg67G+lklC+Hjtgp19clQ5UhsQJOBm9GJoHFDK7JQlcnxgdpa4BRAkgL2E8DGglFkpS+R4YFaG+MkIEtADL4bGAaVUp+xBjgQHQapvkfqJEsLH+hXXnVkix/vXLalZNgRphja/sBdD4/yM7ZwpkeP+7ZQ7uxIEmY3w/AUkhI/nr7TujN7kSHQRZN177Eo2L4bGAaUUpyyR477i1fZzIYIE9EpC+BhQSlHKEjneV7TS/i5CkICeeTE0DihlMmXPciQ4CDJ5iyx/gYTwcflM81YskePeeSk2PxtBAlrkxdA4oJRsSuS4igZBsrdIuxMSwsd2Gc9buUSO95635G6vRpCA1nkxNA4o5SQlclxGgiCXeawykhA+rpJ8JAlynMJBkFMmzY94MTRunngkQYkc7xmZf9RTCBLQWQnhY0ApV1KWyJH+iHOPLwQJ6LoXQ+OAUq6kvMvM/j3y78h7lSPBQZCAu1JC+BhQyrWUb8pIcs+1K/r8BEEC+u7F0DiglEspvSTvunS2zwGCBPRdQvgYUMpJSkmCHFfRIMjJLdL+gBdD4/aZyzK8rOyyLq5CkIA2SwgfA0oh5QQBBJkA1OK0F0PjFrlYcx4BBJnHr2q2hPCxajEmNSWAIE3xDi/uxdB4+GqORhJAkAD6EsLHgFJIOUEAQSYAtTjtxdC4RS7WnEcAQebxq5otIXysWoxJTQkgSFO8w4t7MTQevpqjkQQQJIC+hPAxoBRSThBAkAlALU57MTRukYs15xFAkHn8qmZLCB+rFmNSUwII0hTv8OJeDI2Hr+ZoJAEECaAvIXwMKIWUEwQQZAJQi9NeDI1b5GLNeQQQZB6/qtkSwseqxZjUlACCNMU7vLgXQ+PhqzkaSQBBAuhLCB8DSiHlBAEEmQDU4rQXQ+MWuVhzHgEEmcevaraE8LFqMSY1JYAgTfEOL+7F0Hj4ao5GEkCQAPoSwseAUkg5QQBBJgC1OO3F0LhFLtacRwBB5vGrmi0hfKxajElNCSBIU7zDi+f+Du5zhy/naCCB32X+ZvErAms6fOqnMtDvOPzO97XB9Ib1z0yvbt3XVvZV7Y8z0Plzn9vq4xszfXp6W2Uer5r7MuD/amYvON52d7mj683sF5k+fX+XO9pR0a/JgE9ftH/PzFJzeMUSuH+kR2+JLa2P7D8faUCShCdJzH3wHDN7cKQ36Sn/vJjS+sr6hpEmpCdJakT6Pzu9ysxu7gvN6ru90cxeamZvN7PfT/TlHatX13HCRyea4X9OwtgskkF66t/Q8f26+tbTozr3hWDkjUDuUxH/ZGa3rX6HkNBuMbPHeZKEPhmm3hD+aGYv516NI5CeJI8gySYl+aGZvSju1iDzswm83sx+hiibECX9ismbn90cPt8OgfSdq3vN7Edm9mcz+xfSNJXmPxffNUxfhKdv8b7OzK7bzu1AJRCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAYJrA/wFfSLbmA/WTIQAAAABJRU5ErkJggg==" />
                    </defs>
                  </svg>
                  <p className="m-4 font-bold tracking-wide text-lg text-gray-400">Apply to be a Member</p>
                </div>
              </a>

              <div className="mt-4">
                <p>
                  <a className="text-blue-600" href="https://aisutd.org">Learn more</a> about AIS <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Membership!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;