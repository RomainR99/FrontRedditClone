
import React from "react";

const Notif = ({ notification, onClick }) => {
  return (
    <div
      className={`p-4 mb-2 border rounded-lg ${notification.isRead ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100 cursor-pointer`}
      onClick={() => onClick(notification)}
    >
      <p className="text-sm text-gray-800">{notification.content}</p>
      <span className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
    </div>
  );
};

export default Notif;
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className={`notif-icon ${unreadNotificationsCount > 0 ? "has-notif" : ""}`}
  width="24"
  height="24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 17h5l-1.405-1.405A2.99 2.99 0 0019 13V7a7 7 0 10-14 0v6a2.99 2.99 0 00-1.595 2.595L4 17h5m6 0v2a2 2 0 11-4 0v-2m4 0H9"
/>
</svg>
