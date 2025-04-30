import React, { useState, useEffect } from 'react';
import "../Notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Exemple de notifications (à remplacer par des données réelles)
    useEffect(() => {
        const mockNotifications = [
            {
                id: 1,
                type: 'comment',
                message: 'Nouveau commentaire sur votre post',
                read: false,
                timestamp: '2024-03-20T10:30:00',
                link: '/post/123'
            },
            {
                id: 2,
                type: 'mention',
                message: '@user vous a mentionné dans un commentaire',
                read: false,
                timestamp: '2024-03-20T09:15:00',
                link: '/post/456'
            },
            {
                id: 3,
                type: 'upvote',
                message: 'Votre post a reçu 100 upvotes',
                read: true,
                timestamp: '2024-03-19T15:45:00',
                link: '/post/789'
            }
        ];
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Marquer toutes les notifications comme lues
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="notifications-container">
            <button className="notifications-button" onClick={toggleNotifications}>
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            
            {isOpen && (
                <div className="notifications-dropdown">
                    <div className="notifications-header">
                        <h3>Notifications</h3>
                        <button className="mark-all-read">Tout marquer comme lu</button>
                    </div>
                    <div className="notifications-list">
                        {notifications.map(notification => (
                            <div 
                                key={notification.id} 
                                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                            >
                                <div className="notification-icon">
                                    {notification.type === 'comment' && <i className="bi bi-chat"></i>}
                                    {notification.type === 'mention' && <i className="bi bi-at"></i>}
                                    {notification.type === 'upvote' && <i className="bi bi-arrow-up-circle"></i>}
                                </div>
                                <div className="notification-content">
                                    <p>{notification.message}</p>
                                    <span className="notification-time">{formatTime(notification.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications; 