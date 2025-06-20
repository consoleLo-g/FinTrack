import React from "react";

const Nav = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-white space-y-2 sm:space-y-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          Welcome to Your Finance Tracker
        </h1>
        <p className="text-xs sm:text-sm text-blue-100">
          Manage your money wisely 💰
        </p>
      </div>

      <div className="text-sm sm:text-lg font-semibold tracking-wide">
        Personal Finance Dashboard
      </div>
    </div>
  );
};

export default Nav;
