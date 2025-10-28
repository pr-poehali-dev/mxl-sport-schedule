import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Game } from './types';

interface GameManagementProps {
  games: Game[];
  onAddGame: (game: Omit<Game, 'id' | 'result' | 'status'>) => void;
  onUpdateResult: (id: number, result: string) => void;
  onDeleteGame: (id: number) => void;
}

const GameManagement = ({ games, onAddGame, onUpdateResult, onDeleteGame }: GameManagementProps) => {
  const { toast } = useToast();
  const [newGame, setNewGame] = useState({
    date: '',
    time: '',
    opponent: '',
    home: true,
  });

  const handleAddGame = () => {
    if (!newGame.date || !newGame.time || !newGame.opponent) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    onAddGame(newGame);
    setNewGame({ date: '', time: '', opponent: '', home: true });
  };

  return (
    <div className="space-y-6">
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
          <Button onClick={handleAddGame} className="mt-4 w-full" size="lg">
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
                              onUpdateResult(game.id, input.value);
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
                    onClick={() => onDeleteGame(game.id)}
                  >
                    <Icon name="Trash2" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GameManagement;
