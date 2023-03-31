import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full bg-[#FFC72A]">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className="flex items-center flex-shrink-0  mr-6">
                            <img
                                className='fill-current h-12 w-12 mr-2'
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/CSU-Longbeach_seal.svg/1200px-CSU-Longbeach_seal.svg.png"
                                alt="csulb-logo"
                            />
                            <span className="font-semibold text-xl tracking-tight">CECS 443 - Project</span>
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 outline-none rounded-md focus:border-gray-400 focus:border"
                                onClick={toggleMenu}
                            >
                                {isMenuOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${isMenuOpen ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-black hover:text-white">
                                <a href="/">Home</a>
                            </li>
                            <li className="text-black hover:text-white">
                                <a href="/budgets">Budgets</a>
                            </li>
                            <li className="text-black hover:text-white">
                                <a href="/budget">Transactions</a>
                            </li>
                            <li className="text-black hover:text-white">
                                <a href="/dashboard">Reports</a>
                            </li>
                            <li className="text-black hover:text-white">
                                <a href="/">Settings</a>
                            </li>
                            <li className="text-black hover:text-white">
                                <a href="/">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;