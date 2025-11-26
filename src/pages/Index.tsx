import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [meteorType, setMeteorType] = useState('iron');
  const [meteorSize, setMeteorSize] = useState([100]);
  const [meteorAngle, setMeteorAngle] = useState([45]);
  const [impactSpeed, setImpactSpeed] = useState([20]);
  const [bombType, setBombType] = useState('nuclear');
  const [bombYield, setBombYield] = useState([100]);
  const [simulationResults, setSimulationResults] = useState<any>(null);

  const calculateImpact = () => {
    const diameter = meteorSize[0];
    const angle = meteorAngle[0];
    const speed = impactSpeed[0];
    
    const energy = 0.5 * (diameter ** 3) * (speed ** 2) * 0.001;
    const craterDiameter = diameter * 20 * (angle / 90);
    const devastationRadius = craterDiameter * 5;
    
    setSimulationResults({
      energy: energy.toFixed(2),
      craterDiameter: craterDiameter.toFixed(0),
      devastationRadius: devastationRadius.toFixed(0),
      casualties: (devastationRadius * devastationRadius * 0.001).toFixed(0)
    });
  };

  const calculateBombImpact = () => {
    const yield_kt = bombYield[0];
    const fireball = Math.sqrt(yield_kt) * 0.15;
    const radiation = Math.sqrt(yield_kt) * 1.5;
    const blast = Math.sqrt(yield_kt) * 3;
    const thermalRadiation = Math.sqrt(yield_kt) * 4;
    
    setSimulationResults({
      fireballRadius: fireball.toFixed(2),
      radiationRadius: radiation.toFixed(2),
      blastRadius: blast.toFixed(2),
      thermalRadius: thermalRadiation.toFixed(2),
      casualties: (blast * blast * 0.1).toFixed(0)
    });
  };

  const facts = [
    {
      title: "Челябинский метеорит",
      description: "15 февраля 2013 года над Челябинском взорвался метеорит диаметром около 17 метров. Взрывная волна повредила более 7000 зданий.",
      icon: "Flame"
    },
    {
      title: "Тунгусский метеорит",
      description: "В 1908 году взрыв над тайгой повалил 80 миллионов деревьев на площади 2150 км². Мощность взрыва оценивается в 10-15 мегатонн.",
      icon: "Zap"
    },
    {
      title: "Астероид Апофис",
      description: "Астероид диаметром 370 метров пролетит на расстоянии 31 000 км от Земли в 2029 году. Это ближе, чем спутники связи.",
      icon: "Orbit"
    },
    {
      title: "Царь-бомба",
      description: "Самая мощная ядерная бомба в истории была испытана СССР в 1961 году. Мощность 50 мегатонн, огненный шар 8 км в диаметре.",
      icon: "Bomb"
    }
  ];

  const knowledgeBase = [
    {
      category: "Метеориты",
      items: [
        "Железные метеориты составляют 5% всех падений, но 90% находок",
        "Скорость входа в атмосферу: 11-72 км/с",
        "Крупнейший метеорит Гоба весит 60 тонн"
      ]
    },
    {
      category: "Ядерные взрывы",
      items: [
        "1 килотонна = энергия 1000 тонн тротила",
        "Зона полного разрушения: радиус √мощность_кт км",
        "Радиоактивное заражение зависит от высоты взрыва"
      ]
    },
    {
      category: "Кратеры",
      items: [
        "Диаметр кратера в 20 раз больше диаметра метеорита",
        "Аризонский кратер: диаметр 1200м, глубина 170м",
        "На Земле известно около 190 ударных кратеров"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Rocket" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">Impact Simulator</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={activeSection === 'simulator' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('simulator')}
                className="gap-2"
              >
                <Icon name="Flame" size={18} />
                Симулятор
              </Button>
              <Button
                variant={activeSection === 'facts' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('facts')}
                className="gap-2"
              >
                <Icon name="Lightbulb" size={18} />
                Факты
              </Button>
              <Button
                variant={activeSection === 'knowledge' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('knowledge')}
                className="gap-2"
              >
                <Icon name="BookOpen" size={18} />
                База знаний
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="animate-fade-in space-y-12">
            <section className="text-center py-20 space-y-6">
              <Badge className="mb-4 px-4 py-2 text-sm">Научный симулятор катастроф</Badge>
              <h2 className="text-6xl font-bold tracking-tight">
                Изучайте последствия
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  космических угроз
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Интерактивный симулятор для расчета последствий падения метеоритов и ядерных взрывов на основе научных данных
              </p>
              <div className="flex gap-4 justify-center pt-8">
                <Button size="lg" onClick={() => setActiveSection('simulator')} className="gap-2 text-lg px-8">
                  <Icon name="Rocket" size={20} />
                  Запустить симулятор
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection('facts')} className="gap-2 text-lg px-8">
                  <Icon name="Lightbulb" size={20} />
                  Узнать факты
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:scale-105 transition-transform cursor-pointer border-primary/20">
                <Icon name="Target" size={40} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Точные расчеты</h3>
                <p className="text-muted-foreground">
                  Реалистичные модели воздействия на основе физических формул и научных данных
                </p>
              </Card>
              <Card className="p-6 hover:scale-105 transition-transform cursor-pointer border-secondary/20">
                <Icon name="MapPin" size={40} className="text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Интерактивная карта</h3>
                <p className="text-muted-foreground">
                  Выбирайте точку удара на карте и наблюдайте зоны поражения в реальном времени
                </p>
              </Card>
              <Card className="p-6 hover:scale-105 transition-transform cursor-pointer border-destructive/20">
                <Icon name="BarChart3" size={40} className="text-destructive mb-4" />
                <h3 className="text-xl font-semibold mb-2">Визуализация данных</h3>
                <p className="text-muted-foreground">
                  Наглядные диаграммы и графики последствий для лучшего понимания масштабов
                </p>
              </Card>
            </section>
          </div>
        )}

        {activeSection === 'simulator' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Симулятор катастроф</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 space-y-6">
                <Tabs defaultValue="meteor" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="meteor" className="gap-2">
                      <Icon name="Orbit" size={18} />
                      Метеорит
                    </TabsTrigger>
                    <TabsTrigger value="bomb" className="gap-2">
                      <Icon name="Bomb" size={18} />
                      Ядерная бомба
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="meteor" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Тип метеорита</label>
                        <Select value={meteorType} onValueChange={setMeteorType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iron">Железный (плотность 7.8 г/см³)</SelectItem>
                            <SelectItem value="stone">Каменный (плотность 3.5 г/см³)</SelectItem>
                            <SelectItem value="ice">Ледяной (плотность 0.9 г/см³)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Диаметр: {meteorSize[0]} метров
                        </label>
                        <Slider
                          value={meteorSize}
                          onValueChange={setMeteorSize}
                          min={10}
                          max={1000}
                          step={10}
                          className="py-4"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Угол входа: {meteorAngle[0]}°
                        </label>
                        <Slider
                          value={meteorAngle}
                          onValueChange={setMeteorAngle}
                          min={15}
                          max={90}
                          step={5}
                          className="py-4"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Скорость: {impactSpeed[0]} км/с
                        </label>
                        <Slider
                          value={impactSpeed}
                          onValueChange={setImpactSpeed}
                          min={11}
                          max={72}
                          step={1}
                          className="py-4"
                        />
                      </div>

                      <Button 
                        onClick={calculateImpact} 
                        className="w-full gap-2 text-lg py-6"
                        size="lg"
                      >
                        <Icon name="Zap" size={20} />
                        Рассчитать удар
                      </Button>
                    </div>

                    <Card className="p-6 bg-muted/50 border-2 border-primary/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon name="MapPin" size={24} className="text-primary" />
                        <h3 className="text-lg font-semibold">Место удара</h3>
                      </div>
                      <div className="aspect-video bg-background rounded-lg flex items-center justify-center border-2 border-border relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-destructive/5"></div>
                        <div className="relative z-10 text-center space-y-2">
                          <Icon name="MapPin" size={48} className="mx-auto text-destructive animate-pulse-glow" />
                          <p className="text-sm text-muted-foreground">Интерактивная карта</p>
                          <p className="text-xs text-muted-foreground">Выберите точку для симуляции удара</p>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="bomb" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Тип ядерного заряда</label>
                        <Select value={bombType} onValueChange={setBombType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nuclear">Термоядерная бомба</SelectItem>
                            <SelectItem value="atomic">Атомная бомба</SelectItem>
                            <SelectItem value="dirty">Грязная бомба</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Мощность: {bombYield[0]} килотонн
                        </label>
                        <Slider
                          value={bombYield}
                          onValueChange={setBombYield}
                          min={1}
                          max={50000}
                          step={10}
                          className="py-4"
                        />
                      </div>

                      <Button 
                        onClick={calculateBombImpact} 
                        className="w-full gap-2 text-lg py-6"
                        size="lg"
                      >
                        <Icon name="Flame" size={20} />
                        Рассчитать взрыв
                      </Button>
                    </div>

                    <Card className="p-6 bg-muted/50 border-2 border-destructive/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon name="MapPin" size={24} className="text-destructive" />
                        <h3 className="text-lg font-semibold">Точка взрыва</h3>
                      </div>
                      <div className="aspect-video bg-background rounded-lg flex items-center justify-center border-2 border-border relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-primary/5"></div>
                        <div className="relative z-10 text-center space-y-2">
                          <Icon name="Crosshair" size={48} className="mx-auto text-destructive animate-pulse-glow" />
                          <p className="text-sm text-muted-foreground">Интерактивная карта</p>
                          <p className="text-xs text-muted-foreground">Выберите точку для симуляции взрыва</p>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </Card>

              <Card className="p-6 space-y-6 h-fit">
                <div className="flex items-center gap-2">
                  <Icon name="LineChart" size={24} className="text-secondary" />
                  <h3 className="text-xl font-semibold">Результаты</h3>
                </div>
                <Separator />
                
                {simulationResults ? (
                  <div className="space-y-4 animate-scale-in">
                    {simulationResults.energy && (
                      <>
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Энергия удара</p>
                          <p className="text-2xl font-bold text-primary">{simulationResults.energy} Мт</p>
                        </div>
                        <div className="p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Диаметр кратера</p>
                          <p className="text-2xl font-bold text-destructive">{simulationResults.craterDiameter} м</p>
                        </div>
                        <div className="p-4 bg-secondary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Радиус разрушений</p>
                          <p className="text-2xl font-bold text-secondary">{simulationResults.devastationRadius} км</p>
                        </div>
                      </>
                    )}
                    
                    {simulationResults.fireballRadius && (
                      <>
                        <div className="p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Радиус огненного шара</p>
                          <p className="text-2xl font-bold text-destructive">{simulationResults.fireballRadius} км</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Радиус радиации</p>
                          <p className="text-2xl font-bold text-primary">{simulationResults.radiationRadius} км</p>
                        </div>
                        <div className="p-4 bg-secondary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Радиус ударной волны</p>
                          <p className="text-2xl font-bold text-secondary">{simulationResults.blastRadius} км</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Радиус теплового излучения</p>
                          <p className="text-2xl font-bold">{simulationResults.thermalRadius} км</p>
                        </div>
                      </>
                    )}
                    
                    {simulationResults.casualties && (
                      <div className="p-4 bg-muted rounded-lg border-2 border-destructive/30">
                        <p className="text-sm text-muted-foreground mb-1">Предполагаемые жертвы</p>
                        <p className="text-2xl font-bold text-destructive">{simulationResults.casualties} тыс.</p>
                      </div>
                    )}

                    <Card className="p-4 bg-background/50">
                      <div className="flex items-start gap-2">
                        <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Расчеты основаны на упрощенных физических моделях и служат для образовательных целей
                        </p>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <Icon name="Calculator" size={48} className="mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Выберите параметры и нажмите кнопку расчета
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'facts' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Интересные факты</h2>
              <p className="text-xl text-muted-foreground">Реальные события и научные данные</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {facts.map((fact, index) => (
                <Card key={index} className="p-6 hover:scale-105 transition-all hover:border-primary/50 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon name={fact.icon as any} size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
                      <p className="text-muted-foreground">{fact.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'knowledge' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">База знаний</h2>
              <p className="text-xl text-muted-foreground">Научная информация о метеоритах и катастрофах</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {knowledgeBase.map((section, index) => (
                <Card key={index} className="p-6 space-y-4 hover:border-secondary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="BookOpen" size={24} className="text-secondary" />
                    <h3 className="text-xl font-semibold">{section.category}</h3>
                  </div>
                  <Separator />
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Rocket" size={24} className="text-primary" />
              <span className="font-semibold">Impact Simulator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Научный симулятор для образовательных целей
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
