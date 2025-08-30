import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Droplets, CheckCircle, Star, TrendingDown } from "lucide-react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  waterSaved: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "shower" | "kitchen" | "laundry" | "garden" | "general";
  icon: string;
  implemented?: boolean;
}

interface WaterSavingSuggestionsProps {
  dailyUsage: number;
  showers: number;
  buckets: number;
  bottles: number;
}

const WaterSavingSuggestions = ({ dailyUsage, showers, buckets, bottles }: WaterSavingSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [implementedSuggestions, setImplementedSuggestions] = useState<Set<string>>(new Set());
  const [totalPotentialSavings, setTotalPotentialSavings] = useState(0);

  useEffect(() => {
    generatePersonalizedSuggestions();
  }, [dailyUsage, showers, buckets, bottles]);

  const generatePersonalizedSuggestions = () => {
    const personalizedSuggestions: Suggestion[] = [];

    // Shower-based suggestions
    if (showers > 1) {
      personalizedSuggestions.push({
        id: "shorter-showers",
        title: "Take Shorter Showers",
        description: `Reduce shower time by 2 minutes to save ~25 liters per shower. With ${showers} showers daily, that's ${25 * showers} liters saved per day!`,
        waterSaved: 25 * showers,
        difficulty: "Easy",
        category: "shower",
        icon: "🚿"
      });
    }

    if (showers >= 1) {
      personalizedSuggestions.push({
        id: "shower-alternate",
        title: "Shower Every Other Day",
        description: "Consider showering every alternate day when possible. This could save up to 150 liters every other day.",
        waterSaved: 75,
        difficulty: "Medium",
        category: "shower",
        icon: "🗓️"
      });
    }

    // Bucket usage suggestions
    if (buckets > 5) {
      personalizedSuggestions.push({
        id: "efficient-buckets",
        title: "Optimize Bucket Usage",
        description: `You're using ${buckets} buckets daily. Reusing water from washing vegetables for plants can reduce usage by 2-3 buckets.`,
        waterSaved: 50,
        difficulty: "Easy",
        category: "kitchen",
        icon: "♻️"
      });
    }

    // Bottle suggestions
    if (bottles > 3) {
      personalizedSuggestions.push({
        id: "refillable-bottles",
        title: "Switch to Refillable Bottles",
        description: `Using ${bottles} bottles daily? Get a good filter and refill bottles to reduce waste and save water used in manufacturing.`,
        waterSaved: bottles * 3, // Manufacturing water saved
        difficulty: "Easy",
        category: "general",
        icon: "♻️"
      });
    }

    // General suggestions based on total usage
    if (dailyUsage > 300) {
      personalizedSuggestions.push({
        id: "fix-leaks",
        title: "Check for Water Leaks",
        description: "A dripping faucet can waste 15-20 liters per day. Check all taps, pipes, and toilets for leaks.",
        waterSaved: 20,
        difficulty: "Easy",
        category: "general",
        icon: "🔧"
      });

      personalizedSuggestions.push({
        id: "rainwater-harvesting",
        title: "Collect Rainwater",
        description: "Set up a simple rainwater collection system for watering plants and cleaning. Can save 50+ liters daily during rainy season.",
        waterSaved: 50,
        difficulty: "Hard",
        category: "garden",
        icon: "🌧️"
      });
    }

    // Always applicable suggestions
    personalizedSuggestions.push(
      {
        id: "turn-off-tap",
        title: "Turn Off Tap While Brushing",
        description: "Keep the tap off while brushing teeth or soaping hands. This simple habit saves 10-15 liters daily.",
        waterSaved: 12,
        difficulty: "Easy",
        category: "general",
        icon: "🦷"
      },
      {
        id: "full-load-washing",
        title: "Wash Full Loads Only",
        description: "Wait for a full load before running washing machine or dishwasher. Can save 30-50 liters per wash cycle.",
        waterSaved: 40,
        difficulty: "Easy",
        category: "laundry",
        icon: "👕"
      },
      {
        id: "water-efficient-plants",
        title: "Choose Water-Efficient Plants",
        description: "Replace high-water plants with drought-resistant varieties. Native plants typically need 50% less water.",
        waterSaved: 30,
        difficulty: "Medium",
        category: "garden",
        icon: "🌵"
      }
    );

    setSuggestions(personalizedSuggestions);
    setTotalPotentialSavings(personalizedSuggestions.reduce((sum, s) => sum + s.waterSaved, 0));
  };

  const toggleSuggestionImplementation = (id: string) => {
    const newImplemented = new Set(implementedSuggestions);
    if (newImplemented.has(id)) {
      newImplemented.delete(id);
    } else {
      newImplemented.add(id);
    }
    setImplementedSuggestions(newImplemented);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const implementedSavings = suggestions
    .filter(s => implementedSuggestions.has(s.id))
    .reduce((sum, s) => sum + s.waterSaved, 0);

  const implementationProgress = suggestions.length > 0 
    ? (implementedSuggestions.size / suggestions.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Your Water Saving Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{implementedSuggestions.size}</div>
              <div className="text-sm text-muted-foreground">Tips Implemented</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{implementedSavings}L</div>
              <div className="text-sm text-muted-foreground">Daily Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(implementedSavings * 365)}L</div>
              <div className="text-sm text-muted-foreground">Yearly Impact</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Implementation Progress</span>
              <span>{Math.round(implementationProgress)}%</span>
            </div>
            <Progress value={implementationProgress} className="h-2" />
          </div>

          {implementedSavings > 50 && (
            <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-700 dark:text-green-300 font-medium">
                🎉 Amazing! You're saving enough water to fill a bathtub every week!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personalized Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Personalized Water Saving Tips
          </CardTitle>
          <CardDescription>
            Based on your usage of {dailyUsage}L daily, here are targeted suggestions to reduce consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <Card 
                key={suggestion.id} 
                className={`cursor-pointer transition-all ${
                  implementedSuggestions.has(suggestion.id) 
                    ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/20" 
                    : "hover:shadow-md"
                }`}
                onClick={() => toggleSuggestionImplementation(suggestion.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{suggestion.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 text-xs ${getDifficultyColor(suggestion.difficulty)} text-white border-0`}
                        >
                          {suggestion.difficulty}
                        </Badge>
                      </div>
                    </div>
                    {implementedSuggestions.has(suggestion.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        -{suggestion.waterSaved}L/day
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={implementedSuggestions.has(suggestion.id) ? "default" : "outline"}
                      className="text-xs"
                    >
                      {implementedSuggestions.has(suggestion.id) ? "Implemented" : "Mark Done"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Potential Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Potential Water Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {totalPotentialSavings}L
              </div>
              <div className="text-muted-foreground">
                Maximum daily savings possible
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(totalPotentialSavings * 365)}L
                </div>
                <div className="text-xs text-muted-foreground">Yearly Impact</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {Math.round((totalPotentialSavings / dailyUsage) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Reduction Possible</div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              💡 Implementing all suggestions could reduce your water footprint significantly and save money on water bills!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterSavingSuggestions;