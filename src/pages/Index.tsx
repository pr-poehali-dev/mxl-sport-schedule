import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mockGames = [
  { id: 1, date: '2025-11-01', time: '19:00', opponent: 'Спартак', home: true, result: '4:2', status: 'finished' },
  { id: 2, date: '2025-11-05', time: '18:30', opponent: 'Динамо', home: false, result: '3:3', status: 'finished' },
  { id: 3, date: '2025-11-10', time: '20:00', opponent: 'ЦСКА', home: true, result: null, status: 'upcoming' },
  { id: 4, date: '2025-11-15', time: '19:30', opponent: 'Локомотив', home: false, result: null, status: 'upcoming' },
];

const mockPlayers = [
  { id: 1, number: 17, name: 'Алексей Морозов', position: 'Нападающий', goals: 12, assists: 8 },
  { id: 2, number: 27, name: 'Дмитрий Волков', position: 'Нападающий', goals: 9, assists: 11 },
  { id: 3, number: 88, name: 'Иван Смирнов', position: 'Защитник', goals: 3, assists: 15 },
  { id: 4, number: 5, name: 'Сергей Петров', position: 'Защитник', goals: 2, assists: 12 },
  { id: 5, number: 1, name: 'Максим Козлов', position: 'Вратарь', goals: 0, assists: 0 },
  { id: 6, number: 10, name: 'Артём Новиков', position: 'Нападающий', goals: 15, assists: 6 },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const upcomingGames = mockGames.filter(game => game.status === 'upcoming');
  const finishedGames = mockGames.filter(game => game.status === 'finished');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-red-50 dark:from-background dark:via-slate-900 dark:to-slate-800">
      <nav className="bg-dark-ice/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-white">Хоккейная Команда</h1>
            </div>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {[
                  { id: 'home', label: 'Главная', icon: 'Home' },
                  { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
                  { id: 'roster', label: 'Состав', icon: 'Users' },
                  { id: 'results', label: 'Результаты', icon: 'TrendingUp' },
                  { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className={activeSection === item.id ? 'bg-primary text-white' : 'text-white hover:bg-white/10'}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon name={item.icon as any} size={16} className="mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.href = '/admin'}
                className="ml-4"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <div className="relative z-10 text-center text-white">
                <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">Вперёд к победе!</h2>
                <p className="text-2xl font-light mb-6">Сезон 2025/2026</p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Icon name="Trophy" size={20} className="mr-2" />
                    Чемпионы региона
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CalendarClock" className="text-primary" />
                    Ближайшие матчи
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingGames.slice(0, 2).map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                      <div>
                        <p className="font-bold text-lg">{game.opponent}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(game.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} • {game.time}
                        </p>
                      </div>
                      <Badge variant={game.home ? 'default' : 'secondary'}>
                        {game.home ? 'Дома' : 'В гостях'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-secondary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" className="text-secondary" />
                    Лучшие игроки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockPlayers.slice(0, 3).map((player, idx) => (
                    <div key={player.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg border border-secondary/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                          {player.number}
                        </div>
                        <div>
                          <p className="font-bold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{player.goals}🥅 {player.assists}🎯</p>
                        <p className="text-xs text-muted-foreground">{idx + 1} место</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'schedule' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="Calendar" className="text-primary" />
                  Расписание игр
                </CardTitle>
                <CardDescription>Все матчи сезона 2025/2026</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
                    <TabsTrigger value="all">Все матчи</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="space-y-4 mt-4">
                    {upcomingGames.map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{new Date(game.date).getDate()}</p>
                            <p className="text-sm text-muted-foreground">{new Date(game.date).toLocaleDateString('ru-RU', { month: 'short' })}</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{game.opponent}</p>
                            <p className="text-muted-foreground">Время: {game.time}</p>
                          </div>
                        </div>
                        <Badge variant={game.home ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                          {game.home ? '🏠 Дома' : '✈️ В гостях'}
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {mockGames.map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-6 bg-card rounded-lg border hover:border-primary/40 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{new Date(game.date).getDate()}</p>
                            <p className="text-sm text-muted-foreground">{new Date(game.date).toLocaleDateString('ru-RU', { month: 'short' })}</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{game.opponent}</p>
                            <p className="text-muted-foreground">Время: {game.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {game.result ? (
                            <Badge variant="outline" className="text-xl px-4 py-2 font-bold">
                              {game.result}
                            </Badge>
                          ) : (
                            <Badge variant={game.home ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                              {game.home ? '🏠 Дома' : '✈️ В гостях'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'roster' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="Users" className="text-primary" />
                  Состав команды
                </CardTitle>
                <CardDescription>Наши игроки сезона 2025/2026</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockPlayers.map((player) => (
                    <Card key={player.id} className="hover:shadow-lg transition-shadow border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                            {player.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                            <Badge variant="outline" className="mb-3">
                              {player.position}
                            </Badge>
                            {player.position !== 'Вратарь' && (
                              <div className="flex gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  🥅 <strong>{player.goals}</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                  🎯 <strong>{player.assists}</strong>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'results' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-primary" />
                  Результаты матчей
                </CardTitle>
                <CardDescription>Итоги прошедших игр</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {finishedGames.map((game) => {
                  const [ourScore, theirScore] = game.result!.split(':').map(Number);
                  const won = ourScore > theirScore;
                  const draw = ourScore === theirScore;

                  return (
                    <div key={game.id} className="p-6 bg-gradient-to-r from-card to-muted/20 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xl font-bold">{new Date(game.date).getDate()}</p>
                            <p className="text-xs text-muted-foreground">{new Date(game.date).toLocaleDateString('ru-RU', { month: 'short' })}</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{game.opponent}</p>
                            <p className="text-sm text-muted-foreground">{game.home ? 'Домашний матч' : 'Гостевой матч'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={won ? 'default' : draw ? 'secondary' : 'destructive'}
                            className="text-3xl px-6 py-3 font-bold"
                          >
                            {game.result}
                          </Badge>
                          <div className="text-right">
                            {won && <p className="text-green-600 font-bold flex items-center gap-1"><Icon name="Trophy" size={20} /> Победа</p>}
                            {draw && <p className="text-yellow-600 font-bold">Ничья</p>}
                            {!won && !draw && <p className="text-red-600 font-bold">Поражение</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="animate-fade-in space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="BarChart3" className="text-primary" />
                  Статистика игроков
                </CardTitle>
                <CardDescription>Индивидуальные показатели сезона</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="scorers">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="scorers">Бомбардиры</TabsTrigger>
                    <TabsTrigger value="assists">Ассистенты</TabsTrigger>
                    <TabsTrigger value="all">Общая</TabsTrigger>
                  </TabsList>
                  <TabsContent value="scorers" className="mt-6">
                    <div className="space-y-3">
                      {[...mockPlayers]
                        .sort((a, b) => b.goals - a.goals)
                        .map((player, idx) => (
                          <div key={player.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                              </div>
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold">
                                {player.number}
                              </div>
                              <div>
                                <p className="font-bold text-lg">{player.name}</p>
                                <p className="text-sm text-muted-foreground">{player.position}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-primary">{player.goals}</p>
                              <p className="text-sm text-muted-foreground">голов</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="assists" className="mt-6">
                    <div className="space-y-3">
                      {[...mockPlayers]
                        .sort((a, b) => b.assists - a.assists)
                        .map((player, idx) => (
                          <div key={player.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/5 to-transparent rounded-lg border border-secondary/10">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                              </div>
                              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center font-bold">
                                {player.number}
                              </div>
                              <div>
                                <p className="font-bold text-lg">{player.name}</p>
                                <p className="text-sm text-muted-foreground">{player.position}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-secondary">{player.assists}</p>
                              <p className="text-sm text-muted-foreground">передач</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="all" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-primary">
                            <th className="text-left p-3 font-bold">№</th>
                            <th className="text-left p-3 font-bold">Игрок</th>
                            <th className="text-left p-3 font-bold">Позиция</th>
                            <th className="text-center p-3 font-bold">Голы</th>
                            <th className="text-center p-3 font-bold">Передачи</th>
                            <th className="text-center p-3 font-bold">Очки</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockPlayers.map((player) => (
                            <tr key={player.id} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-3">
                                <Badge variant="outline">{player.number}</Badge>
                              </td>
                              <td className="p-3 font-bold">{player.name}</td>
                              <td className="p-3 text-muted-foreground">{player.position}</td>
                              <td className="p-3 text-center font-bold text-primary">{player.goals}</td>
                              <td className="p-3 text-center font-bold text-secondary">{player.assists}</td>
                              <td className="p-3 text-center font-bold text-lg">{player.goals + player.assists}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-dark-ice text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Icon name="Shield" className="text-primary" size={28} />
            <p className="text-xl font-bold">Хоккейная Команда</p>
          </div>
          <p className="text-muted-foreground">© 2025 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;