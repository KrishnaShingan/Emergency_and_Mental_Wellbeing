import React from 'react'
import { NavLink , Link } from 'react-router';
const Navbar = () => {
    return (
        <div>
            <nav className='bg-sky-400 shadow-lg text-white border-b-2 p-4 flex justify-between items-center'>
                <h1 className="min-w-40">
                    <Link to="/home" className="text-white text-2xl font-bold hover:text-black underline-offset-4 ">
                            Wellbeing
                    </Link>
                </h1>
                <ul className='flex gap-2'>
                    <li className="px-3 font-semibold">
                        <NavLink
                            to="/help"
                            end
                            className={({ isActive }) =>
                                ` ${isActive ? "text-black underline-offset-4 " : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                            }
                        >
                            SOS Help System
                        </NavLink>
                    </li>
                    <li className="px-3 font-semibold ">
                        <NavLink
                            to="/health"
                            end
                            className={({ isActive }) =>
                                ` ${isActive ? "text-black " : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                            }
                        >
                            Questionnaries and Management
                        </NavLink>
                    </li>
                    <li className="px-3 font-semibold">
                        <NavLink
                            to="/support"
                            end
                            className={({ isActive }) =>
                                ` ${isActive ? "text-black" : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                            }
                        >
                            ChatBot support
                        </NavLink>
                    </li>
                    <li className="px-3 font-semibold">
                    <NavLink
                        to="/video"
                        end
                        className={({ isActive }) =>
                            ` ${isActive ? "text-black" : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                        }
                    >
                        Video Recommendation system
                    </NavLink>
                    </li>
                    <li className="px-3 font-semibold">
                    <NavLink
                        to="/mood"
                        end
                        className={({ isActive }) =>
                            ` ${isActive ? "text-black" : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                        }
                    >
                        Mood Tracker
                    </NavLink>
                    </li>
                    <li className="px-3 font-semibold">
                    <NavLink
                        to="/news"
                        end
                        className={({ isActive }) =>
                            ` ${isActive ? "text-black" : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                        }
                    >
                        News
                    </NavLink>
                    </li>
                    <li className="px-3 font-semibold">
                    <NavLink
                        to="/tasks"
                        end
                        className={({ isActive }) =>
                            ` ${isActive ? "text-black" : "text-white"} font-semibold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-black lg:p-0`
                        }
                    >
                        Task Manager
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
