import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top">
      <WifiOff className="w-4 h-4 flex-shrink-0 animate-bounce" />
      <span>
        Você está sem conexão com a internet. O VanBora continua exibindo os dados salvos em cache.
      </span>
    </div>
  );
};
