import { Heart, Map, Gift, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Heart className="w-20 h-20 text-primary relative animate-pulse-soft" fill="currentColor" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Романтический Квест
          </h1>
          <p className="text-muted-foreground text-lg">
            Путешествие начинается здесь
          </p>
        </div>

        {/* Rules Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft space-y-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Как играть?
          </h2>

          <div className="space-y-4">
            <RuleItem
              icon={Map}
              title="Шаг 1: Выполни задание"
              description="Реши викторину или выполни задание в приложении"
            />
            
            <RuleItem
              icon={Gift}
              title="Шаг 2: Найди приз"
              description="Получи подсказку и найди сюрприз в реальном мире"
            />
            
            <RuleItem
              icon={Lock}
              title="Шаг 3: Открой следующее"
              description="Введи код с бумажки, чтобы разблокировать новое задание"
            />
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/quests")}
          className="w-full h-14 text-lg font-semibold bg-gradient-romantic hover:opacity-90 transition-opacity shadow-romantic"
        >
          Начать приключение
          <Heart className="ml-2 w-5 h-5" fill="currentColor" />
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Приготовься к незабываемым впечатлениям 💕
        </p>
      </div>
    </div>
  );
};

const RuleItem = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    <div className="flex-1 pt-1">
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Welcome;
