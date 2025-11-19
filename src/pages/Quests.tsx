import { Heart, Lock, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data - в будущем это будет из базы данных
const quests = [
  {
    id: 1,
    title: "Наш первый фильм",
    description: "Викторина о фильме, который мы смотрели вместе",
    status: "available", // available, locked, completed
    difficulty: "Легко",
  },
  {
    id: 2,
    title: "Любимые моменты",
    description: "Угадай, что я люблю в тебе больше всего",
    status: "locked",
    difficulty: "Средне",
  },
  {
    id: 3,
    title: "Наша история",
    description: "Вспомни важные даты нашей жизни",
    status: "locked",
    difficulty: "Сложно",
  },
  {
    id: 4,
    title: "Тайные желания",
    description: "Узнай, о чем я мечтаю",
    status: "locked",
    difficulty: "Средне",
  },
];

const Quests = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "locked":
        return <Lock className="w-6 h-6 text-muted-foreground" />;
      default:
        return <Circle className="w-6 h-6 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "locked":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const handleQuestClick = (quest: any) => {
    if (quest.status === "locked") {
      // В будущем откроем диалог для ввода кода
      return;
    }
    if (quest.status === "available") {
      navigate(`/quest/${quest.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-gradient-romantic px-6 py-8 shadow-romantic">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-primary-foreground">
              Задания
            </h1>
            <Heart className="w-8 h-8 text-primary-foreground animate-pulse-soft" fill="currentColor" />
          </div>
          <p className="text-primary-foreground/90">
            Выполняй задания и получай подсказки для поиска сюрпризов
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-6 -mt-4">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Прогресс</p>
              <p className="text-2xl font-bold text-foreground">0 / {quests.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Доступно</p>
              <p className="text-2xl font-bold text-primary">1</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-romantic w-0 transition-all duration-500" />
          </div>
        </Card>
      </div>

      {/* Quests List */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
        {quests.map((quest, index) => (
          <Card
            key={quest.id}
            className={`p-5 transition-all duration-300 animate-fade-in-up ${
              quest.status === "available"
                ? "cursor-pointer hover:shadow-romantic hover:-translate-y-1"
                : quest.status === "locked"
                ? "opacity-60"
                : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleQuestClick(quest)}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 pt-1">
                {getStatusIcon(quest.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    {quest.title}
                  </h3>
                  <Badge variant="outline" className={getStatusColor(quest.status)}>
                    {quest.status === "completed"
                      ? "Готово"
                      : quest.status === "locked"
                      ? "Заблокировано"
                      : "Доступно"}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {quest.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {quest.difficulty}
                  </Badge>
                  {quest.status === "available" && (
                    <span className="text-xs text-primary font-medium">
                      Нажми, чтобы начать →
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-8" />
    </div>
  );
};

export default Quests;
