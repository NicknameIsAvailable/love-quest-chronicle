import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import questsData from "@/data/quests.json";
import confetti from "canvas-confetti";

const Quest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questItem = questsData.quests.find(q => q.id === Number(id));
  const quest = questItem?.questData;

  if (!quest) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-6">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Задание не найдено</p>
          <Button onClick={() => navigate("/quests")}>Вернуться к списку</Button>
        </Card>
      </div>
    );
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Проверяем все ответы
    const allAnswered = quest.questions.every((q: any) => answers[q.id] !== undefined);
    
    if (!allAnswered) {
      toast.error("Пожалуйста, ответь на все вопросы");
      setIsSubmitting(false);
      return;
    }

    // Проверяем правильность ответов
    const allCorrect = quest.questions.every(
      (q: any) => answers[q.id] === q.correctAnswer
    );

    setTimeout(() => {
      setIsSubmitting(false);
      
      if (allCorrect) {
        // Конфетти эффект
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        toast.success("Отлично! Все ответы верны! 🎉");
        setShowHint(true);
      } else {
        toast.error("Некоторые ответы неверны. Попробуй ещё раз!");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      {/* Header */}
      <div className="bg-gradient-romantic px-6 py-6 shadow-romantic">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/quests")}
            className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к списку
          </Button>
          
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">
            {quest.title}
          </h1>
          <p className="text-primary-foreground/90 text-sm">
            {quest.description}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {quest.questions.map((question: any, qIndex: number) => (
          <Card
            key={question.id}
            className="p-6 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${qIndex * 100}ms` }}
          >
            <div className="mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{qIndex + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground text-lg pt-0.5">
                  {question.question}
                </h3>
              </div>
            </div>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
            >
              {question.options.map((option: any, optionIndex: number) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`q${question.id}-option${optionIndex}`}
                  />
                  <Label
                    htmlFor={`q${question.id}-option${optionIndex}`}
                    className="flex-1 cursor-pointer text-foreground"
                  >
                    {option.type === "image" ? (
                      <img 
                        src={option.content} 
                        alt={`Вариант ${optionIndex + 1}`}
                        className="w-full max-w-[200px] h-auto rounded-lg"
                      />
                    ) : (
                      option.content
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        ))}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold bg-gradient-romantic hover:opacity-90 transition-opacity shadow-romantic"
        >
          {isSubmitting ? (
            "Проверяем..."
          ) : (
            <>
              Проверить ответы
              <CheckCircle2 className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>

      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Heart className="w-6 h-6 text-primary animate-pulse-soft" fill="currentColor" />
              {quest.hint.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-xl p-6 border-2 border-primary/20">
              <pre className="text-foreground font-medium leading-relaxed whitespace-pre-wrap text-center">
                {quest.hint.poem}
              </pre>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Найди сюрприз и не забудь взять код с бумажки! Он понадобится для следующего задания.
              </p>
              
              <Button
                onClick={() => {
                  setShowHint(false);
                  navigate("/quests");
                }}
                className="w-full bg-gradient-romantic hover:opacity-90"
              >
                Отправляюсь на поиски!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quest;
