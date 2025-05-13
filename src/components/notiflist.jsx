// components/notifications/NotifList.jsx
import React, { useEffect, useState } from "react";
import Notif from "./notif";

const NotifList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Appel à l'API pour récupérer les notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications"); // Endpoint de Strapi
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur de récupération des notifications", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotifClick = (notif) => {
    // Logique pour marquer la notif comme lue et rediriger
    console.log("Notif cliquée:", notif);
    // Tu peux ici appeler une API PUT pour marquer comme lue si nécessaire
  };

  return (
    <div className="absolute top-0 right-0 mt-12 mr-4 w-80 p-4 bg-white border rounded-lg shadow-md">
      <h3 className="text-xl mb-2">Notifications</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          {notifications.length === 0 ? (
            <p>Aucune notification.</p>
          ) : (
            notifications.map((notif) => (
              <Notif key={notif.id} notification={notif} onClick={handleNotifClick} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotifList;
