import { useState } from "react";
import { Bell, CheckCircle, Trash2 } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New mindfulness session available!", read: false },
    { id: 2, text: "Your weekly wellness report is ready.", read: false },
    { id: 3, text: "Reminder: Practice deep breathing today!", read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 bg-white shadow-md rounded-lg border">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700">
        <Bell className="w-6 h-6" /> Notifications
      </h2>
      <div className="mt-4 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No new notifications</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex justify-between items-center p-3 rounded-lg shadow-sm border ${notif.read ? "bg-gray-100" : "bg-green-50"}`}
            >
              <p className={`${notif.read ? "text-gray-500" : "text-gray-800 font-medium"}`}>{notif.text}</p>
              <div className="flex gap-2">
                {!notif.read && (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteNotification(notif.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;