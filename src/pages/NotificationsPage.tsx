mport { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  related_listing_id: string | null;
  created_at: string;
};

type NotificationsPageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      onNavigate('login');
      return;
    }
    loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setNotifications(data);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, is_read: true } : n
    ));
  };

  const markAllAsRead = async () => {
    if (!user) return;

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  const deleteNotification = async (id: string) => {
    await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'listing_approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'listing_rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'listing_expiring':
      case 'subscription_expiring':
        return <Clock className="h-6 w-6 text-orange-500" />;
      default:
        return <Bell className="h-6 w-6 text-[#156D3E]" />;
    }
  };

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? (
              <span><strong>{unreadCount}</strong> notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}</span>
            ) : (
              <span>Aucune nouvelle notification</span>
            )}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-[#156D3E] text-white rounded-md hover:bg-[#0f5630] transition-colors text-sm font-medium"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Chargement des notifications...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !notification.is_read ? 'border-l-4 border-[#156D3E]' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleDateString('fr-MA', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{notification.message}</p>

                  <div className="flex gap-2">
                    {!notification.is_read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-[#156D3E] hover:underline font-medium"
                      >
                        Marquer comme lu
                      </button>
                    )}

                    {notification.related_listing_id && (
                      <button
                        onClick={() => onNavigate('listing-detail', { id: notification.related_listing_id })}
                        className="text-sm text-[#156D3E] hover:underline font-medium"
                      >
                        Voir l'annonce
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="ml-auto text-sm text-red-600 hover:underline font-medium flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Aucune notification</h3>
          <p className="text-gray-600">
            Vous n'avez pas encore reçu de notifications
          </p>
        </div>
      )}
    </div>
  );
}
