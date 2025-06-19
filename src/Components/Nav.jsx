import React from "react";

const Nav = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center text-white">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Your Finance Tracker</h1>
        <p className="text-sm text-blue-100">Manage your money wisely 💰</p>
      </div>

      <div className="text-lg font-semibold tracking-wide hidden sm:block">
        Personal Finance Dashboard
      </div>
    </div>
  );
};

export default Nav;
