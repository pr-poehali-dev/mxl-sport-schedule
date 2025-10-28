import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  date: string;
  time: string;
  opponent: string;
  home: boolean;
  result: string | null;
  status: 'upcoming' | 'finished';
}

interface Player {
  id: number;
  number: number;
  name: string;
  position: string;
  goals: number;
  assists: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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

  const [newGame, setNewGame] = useState({
    date: '',
    time: '',
    opponent: '',
    home: true,
  });

  const [newPlayer, setNewPlayer] = useState({
    number: '',
    name: '',
    position: 'Нападающий',
    goals: 0,
    assists: 0,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      toast({
        title: 'Успешно!',
        description: 'Вы вошли в админ-панель',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Неверный пароль',
        variant: 'destructive',
      });
    }
  };

  const addGame = () => {
    if (!newGame.date || !newGame.time || !newGame.opponent) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

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
    setNewGame({ date: '', time: '', opponent: '', home: true });
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

  const addPlayer = () => {
    if (!newPlayer.number || !newPlayer.name) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const player: Player = {
      id: Math.max(...players.map(p => p.id)) + 1,
      number: parseInt(newPlayer.number),
      name: newPlayer.name,
      position: newPlayer.position,
      goals: newPlayer.goals,
      assists: newPlayer.assists,
    };

    setPlayers([...players, player]);
    setNewPlayer({ number: '', name: '', position: 'Нападающий', goals: 0, assists: 0 });
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Icon name="Lock" className="mx-auto mb-4 text-primary" size={48} />
            <CardTitle className="text-3xl">Админ-панель</CardTitle>
            <CardDescription>Введите пароль для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Icon name="LogIn" className="mr-2" size={20} />
                Войти
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Подсказка: пароль "admin"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-red-50">
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
              <Button variant="secondary" onClick={() => setIsAuthenticated(false)}>
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

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

          <TabsContent value="games" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PlusCircle" className="text-primary" />
                  Добавить новый матч
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="game-date">Дата матча</Label>
                    <Input
                      id="game-date"
                      type="date"
                      value={newGame.date}
                      onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="game-time">Время начала</Label>
                    <Input
                      id="game-time"
                      type="time"
                      value={newGame.time}
                      onChange={(e) => setNewGame({ ...newGame, time: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="opponent">Соперник</Label>
                    <Input
                      id="opponent"
                      placeholder="Название команды"
                      value={newGame.opponent}
                      onChange={(e) => setNewGame({ ...newGame, opponent: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Место проведения</Label>
                    <Select
                      value={newGame.home ? 'home' : 'away'}
                      onValueChange={(value) => setNewGame({ ...newGame, home: value === 'home' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">🏠 Дома</SelectItem>
                        <SelectItem value="away">✈️ В гостях</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addGame} className="mt-4 w-full" size="lg">
                  <Icon name="Plus" className="mr-2" size={20} />
                  Добавить матч
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" className="text-primary" />
                  Все матчи ({games.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {games.map((game) => (
                  <Card key={game.id} className="border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{game.opponent}</h3>
                            <Badge variant={game.home ? 'default' : 'secondary'}>
                              {game.home ? '🏠 Дома' : '✈️ В гостях'}
                            </Badge>
                            <Badge variant={game.status === 'finished' ? 'outline' : 'default'}>
                              {game.status === 'finished' ? 'Завершён' : 'Предстоящий'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {new Date(game.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} в {game.time}
                          </p>
                          {game.status === 'upcoming' && (
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Счёт (н-р: 4:2)"
                                className="max-w-[150px]"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    const input = e.target as HTMLInputElement;
                                    updateGameResult(game.id, input.value);
                                    input.value = '';
                                  }
                                }}
                              />
                              <span className="text-sm text-muted-foreground">Нажмите Enter</span>
                            </div>
                          )}
                          {game.result && (
                            <p className="text-2xl font-bold text-primary">Счёт: {game.result}</p>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteGame(game.id)}
                        >
                          <Icon name="Trash2" size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="UserPlus" className="text-primary" />
                  Добавить игрока
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="player-number">Номер</Label>
                    <Input
                      id="player-number"
                      type="number"
                      placeholder="17"
                      value={newPlayer.number}
                      onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="player-name">Имя игрока</Label>
                    <Input
                      id="player-name"
                      placeholder="Алексей Морозов"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="player-position">Позиция</Label>
                    <Select
                      value={newPlayer.position}
                      onValueChange={(value) => setNewPlayer({ ...newPlayer, position: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Нападающий">Нападающий</SelectItem>
                        <SelectItem value="Защитник">Защитник</SelectItem>
                        <SelectItem value="Вратарь">Вратарь</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Начальная статистика</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Голы"
                        value={newPlayer.goals}
                        onChange={(e) => setNewPlayer({ ...newPlayer, goals: parseInt(e.target.value) || 0 })}
                      />
                      <Input
                        type="number"
                        placeholder="Передачи"
                        value={newPlayer.assists}
                        onChange={(e) => setNewPlayer({ ...newPlayer, assists: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={addPlayer} className="mt-4 w-full" size="lg">
                  <Icon name="Plus" className="mr-2" size={20} />
                  Добавить игрока
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-primary" />
                  Состав команды ({players.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {players.map((player) => (
                  <Card key={player.id} className="border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                            {player.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                            <Badge variant="outline" className="mb-3">{player.position}</Badge>
                            {player.position !== 'Вратарь' && (
                              <div className="flex gap-2 items-center flex-wrap">
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm">Голы:</Label>
                                  <Input
                                    type="number"
                                    className="w-20"
                                    value={player.goals}
                                    onChange={(e) => updatePlayerStats(player.id, parseInt(e.target.value) || 0, player.assists)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm">Передачи:</Label>
                                  <Input
                                    type="number"
                                    className="w-20"
                                    value={player.assists}
                                    onChange={(e) => updatePlayerStats(player.id, player.goals, parseInt(e.target.value) || 0)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deletePlayer(player.id)}
                        >
                          <Icon name="Trash2" size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
