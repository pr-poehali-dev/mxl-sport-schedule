import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminNavbarProps {
  onLogout: () => void;
}

const AdminNavbar = ({ onLogout }: AdminNavbarProps) => {
  return (
    <nav className="bg-dark-ice/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Button>
            <Button variant="secondary" onClick={onLogout}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
