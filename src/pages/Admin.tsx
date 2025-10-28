import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import LoginForm from '@/components/admin/LoginForm';
import AdminNavbar from '@/components/admin/AdminNavbar';
import GameManagement from '@/components/admin/GameManagement';
import PlayerManagement from '@/components/admin/PlayerManagement';
import { Game, Player } from '@/components/admin/types';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [games, setGames] = useState<Game[]>([
    { id: 1, date: '2025-11-01', time: '19:00', opponent: 'Спартак', home: true, result: '4:2', status: 'finished' },
    { id: 2, date: '2025-11-05', time: '18:30', opponent: 'Динамо', home: false, result: '3:3', status: 'finished' },
    { id: 3, date: '2025-11-10', time: '20:00', opponent: 'ЦСКА', home: true, result: null, status: 'upcoming' },
    { id: 4, date: '2025-11-15', time: '19:30', opponent: 'Локомотив', home: false, result: null, status: 'upcoming' },
  ]);

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, number: 17, name: 'Алексей Морозов', position: 'Нападающий', goals: 12, assists: 8 },
    { id: 2, number: 27, name: 'Дмитрий Волков', position: 'Нападающий', goals: 9, assists: 11 },
    { id: 3, number: 88, name: 'Иван Смирнов', position: 'Защитник', goals: 3, assists: 15 },
    { id: 4, number: 5, name: 'Сергей Петров', position: 'Защитник', goals: 2, assists: 12 },
    { id: 5, number: 1, name: 'Максим Козлов', position: 'Вратарь', goals: 0, assists: 0 },
    { id: 6, number: 10, name: 'Артём Новиков', position: 'Нападающий', goals: 15, assists: 6 },
  ]);

  const addGame = (newGame: Omit<Game, 'id' | 'result' | 'status'>) => {
    const game: Game = {
      id: Math.max(...games.map(g => g.id)) + 1,
      date: newGame.date,
      time: newGame.time,
      opponent: newGame.opponent,
      home: newGame.home,
      result: null,
      status: 'upcoming',
    };

    setGames([...games, game]);
    toast({
      title: 'Успешно!',
      description: 'Матч добавлен',
    });
  };

  const updateGameResult = (id: number, result: string) => {
    setGames(games.map(g => 
      g.id === id ? { ...g, result, status: 'finished' as const } : g
    ));
    toast({
      title: 'Успешно!',
      description: 'Результат обновлён',
    });
  };

  const deleteGame = (id: number) => {
    setGames(games.filter(g => g.id !== id));
    toast({
      title: 'Успешно!',
      description: 'Матч удалён',
    });
  };

  const addPlayer = (newPlayer: Omit<Player, 'id'>) => {
    const player: Player = {
      id: Math.max(...players.map(p => p.id)) + 1,
      number: newPlayer.number,
      name: newPlayer.name,
      position: newPlayer.position,
      goals: newPlayer.goals,
      assists: newPlayer.assists,
    };

    setPlayers([...players, player]);
    toast({
      title: 'Успешно!',
      description: 'Игрок добавлен',
    });
  };

  const updatePlayerStats = (id: number, goals: number, assists: number) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, goals, assists } : p
    ));
    toast({
      title: 'Успешно!',
      description: 'Статистика обновлена',
    });
  };

  const deletePlayer = (id: number) => {
    setPlayers(players.filter(p => p.id !== id));
    toast({
      title: 'Успешно!',
      description: 'Игрок удалён',
    });
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-red-50">
      <AdminNavbar onLogout={() => setIsAuthenticated(false)} />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">
              <Icon name="Calendar" className="mr-2" size={20} />
              Управление матчами
            </TabsTrigger>
            <TabsTrigger value="players">
              <Icon name="Users" className="mr-2" size={20} />
              Управление игроками
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <GameManagement
              games={games}
              onAddGame={addGame}
              onUpdateResult={updateGameResult}
              onDeleteGame={deleteGame}
            />
          </TabsContent>

          <TabsContent value="players">
            <PlayerManagement
              players={players}
              onAddPlayer={addPlayer}
              onUpdateStats={updatePlayerStats}
              onDeletePlayer={deletePlayer}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
