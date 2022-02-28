/* eslint-disable @next/next/no-html-link-for-pages */
import 'tailwindcss/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCalendar, faHandPaper, faHome, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/client";
import { slide as Menu } from 'react-burger-menu'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
    const [session, loading] = useSession();
    return (
        <div>
            <div className="hidden md:block overflow-hidden w-30 md:w-80 space-y-6 relative inset-y-0 left-0 transition duration-200 ease-in-out h-screen shadow-md bg-gray-900 overflow-y-auto">
                <div className="pt-8 pb-2 px-6">
                    <div className="hidden md:flex flex-col items-center">
                        <div className="shrink-0">
                            <div className="rounded-full w-20 h-20  border-white bg-gradient-to-bl from-blue-400 to-blue-800 " alt="Avatar" > </div>
                            {/* <img src="/favicon.ico" className="rounded-full w-20 h-20 border-2 border-white" alt="Avatar" /> */}
                        </div>
                        <div className="grow ml-3 text-center">
                            <p className="text-sm font-semibold text-white pt-6">AIS Member</p>
                            <p className="text-sm font-semibold text-white">{session.user?.email}</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-grow items-center  space-y-4 px-4">
                    <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                        <div className="flex flex-row">
                            <p className="w-1/4">
                                <FontAwesomeIcon className="w-6 h-6" icon={faHome} />
                            </p>
                            <p className="hidden md:block w-3/4 text-left  mt-1 text-md">Home</p>
                        </div>
                    </a>
                    {/* <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            <FontAwesomeIcon className="w-6 h-6" icon={faNewspaper} />
                        </p>
                        <p className="hidden md:block w-3/4 text-left  mt-1 text-md">News</p>
                    </div>
                </a>
                <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            <FontAwesomeIcon className="w-6 h-6" icon={faCalendar} />
                        </p>
                        <p className="hidden md:block w-3/4 text-left  mt-1 text-md">Member Calendar</p>
                    </div>
                </a>
                <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            <FontAwesomeIcon className="w-6 h-6" icon={faUser} />
                        </p>
                        <p className="hidden md:block w-3/4 text-left  mt-1 text-md">User Profile</p>
                    </div>
                </a> */}
                    <a href="/checkin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                        <div className="flex flex-row">
                            <p className="w-1/4">
                                <FontAwesomeIcon className="w-6 h-6" icon={faHandPaper} />
                            </p>
                            <p className="hidden md:block w-3/4 text-left  mt-1 text-md">Attendance</p>
                        </div>
                    </a>
                    {/* <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            <FontAwesomeIcon className="w-6 h-6" icon={faBriefcase} />
                        </p>
                        <p className="hidden md:block w-3/4 text-left  mt-1 text-md">Open Applications</p>
                    </div>
                </a> */}
                </nav>
                <div className="hidden md:flex md:flex-row px-6 pb-8 fixed bottom-0 justify-center space-x-10 ml-6">
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
            <div className="md:hidden">
                <Menu styles={ styles }>
                    <div className=" md:flex flex-col items-center justify-center pb-8">
                        <div className="shrink-0 flex justify-center">
                            <div className="rounded-full w-20 h-20  border-white bg-gradient-to-bl from-blue-400 to-blue-800 " alt="Avatar" > </div>
                            {/* <img src="/favicon.ico" className="rounded-full w-20 h-20 border-2 border-white" alt="Avatar" /> */}
                        </div>
                        <div className="grow ml-3 text-center">
                            <p className="text-sm font-semibold text-white pt-6">AIS Member</p>
                            <p className="text-sm font-semibold text-white">{session.user?.email}</p>
                        </div>
                    </div>
                    <a href="/" className="menu-item block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                        <div className="flex flex-row">
                            <p className="w-1/4">
                                <FontAwesomeIcon className="w-6 h-6" icon={faHome} />
                            </p>
                            <p className=" md:block w-3/4 text-left  mt-1 text-md">Home</p>
                        </div>
                    </a>
                    <a href="/checkin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white">
                        <div className="flex flex-row">
                            <p className="w-1/4">
                                <FontAwesomeIcon className="w-6 h-6" icon={faHandPaper} />
                            </p>
                            <p className=" md:block w-3/4 text-left text-md">Attendance</p>
                        </div>
                    </a>
                    
                
                </Menu>
                
            </div>
        </div>
    )
}

var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '30px',
      height: '30px',
      left: '10px',
      top: '10px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '34px',
      width: '34px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#111827',
      padding: '2.5em 1.5em 0',
      fontSize: '1.25em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

export default Sidebar;