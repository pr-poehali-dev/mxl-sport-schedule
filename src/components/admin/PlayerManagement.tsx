import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Player } from './types';

interface PlayerManagementProps {
  players: Player[];
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
  onUpdateStats: (id: number, goals: number, assists: number) => void;
  onDeletePlayer: (id: number) => void;
}

const PlayerManagement = ({ players, onAddPlayer, onUpdateStats, onDeletePlayer }: PlayerManagementProps) => {
  const { toast } = useToast();
  const [newPlayer, setNewPlayer] = useState({
    number: '',
    name: '',
    position: 'Нападающий',
    goals: 0,
    assists: 0,
  });

  const handleAddPlayer = () => {
    if (!newPlayer.number || !newPlayer.name) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    onAddPlayer({
      number: parseInt(newPlayer.number),
      name: newPlayer.name,
      position: newPlayer.position,
      goals: newPlayer.goals,
      assists: newPlayer.assists,
    });
    setNewPlayer({ number: '', name: '', position: 'Нападающий', goals: 0, assists: 0 });
  };

  return (
    <div className="space-y-6">
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
          <Button onClick={handleAddPlayer} className="mt-4 w-full" size="lg">
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
                              onChange={(e) => onUpdateStats(player.id, parseInt(e.target.value) || 0, player.assists)}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Передачи:</Label>
                            <Input
                              type="number"
                              className="w-20"
                              value={player.assists}
                              onChange={(e) => onUpdateStats(player.id, player.goals, parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDeletePlayer(player.id)}
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

export default PlayerManagement;
