import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Droplets, TrendingUp, TrendingDown, Target, Save } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface DailyUsage {
  date: string;
  showers: number;
  buckets: number;
  bottles: number;
  total: number;
}

interface TrackerData {
  showers: number;
  buckets: number;
  bottles: number;
}

const WaterTracker = () => {
  const [usage, setUsage] = useState<TrackerData>({
    showers: 1,
    buckets: 3,
    bottles: 2
  });

  const [weeklyData, setWeeklyData] = useState<DailyUsage[]>([]);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  // Water usage calculations (in liters)
  const SHOWER_LITERS = 150; // Average shower
  const BUCKET_LITERS = 20;  // Standard bucket
  const BOTTLE_LITERS = 1;   // Water bottle

  useEffect(() => {
    calculateTotals();
    generateWeeklyData();
  }, [usage]);

  const calculateTotals = () => {
    const daily = (usage.showers * SHOWER_LITERS) + 
                  (usage.buckets * BUCKET_LITERS) + 
                  (usage.bottles * BOTTLE_LITERS);
    
    setDailyTotal(daily);
    setWeeklyTotal(daily * 7);
    setMonthlyTotal(daily * 30);
  };

  const generateWeeklyData = () => {
    const data: DailyUsage[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate some variation in daily usage
      const variation = Math.random() * 0.4 + 0.8; // 80% to 120% of current usage
      const dailyUsage = Math.round(dailyTotal * variation);
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        showers: Math.round(usage.showers * variation),
        buckets: Math.round(usage.buckets * variation),
        bottles: Math.round(usage.bottles * variation),
        total: dailyUsage
      });
    }
    
    setWeeklyData(data);
  };

  const getEfficiencyRating = () => {
    if (dailyTotal <= 200) return { rating: "Excellent", color: "bg-green-500", percentage: 90 };
    if (dailyTotal <= 300) return { rating: "Good", color: "bg-blue-500", percentage: 70 };
    if (dailyTotal <= 400) return { rating: "Average", color: "bg-yellow-500", percentage: 50 };
    return { rating: "High Usage", color: "bg-red-500", percentage: 30 };
  };

  const efficiency = getEfficiencyRating();

  return (
    <div className="space-y-6">
      {/* Usage Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Daily Water Usage Tracker
          </CardTitle>
          <CardDescription>
            Track your daily water consumption to understand your footprint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="showers">Showers per day</Label>
              <Input
                id="showers"
                type="number"
                min="0"
                max="10"
                value={usage.showers}
                onChange={(e) => setUsage({...usage, showers: parseInt(e.target.value) || 0})}
                className="text-center"
              />
              <p className="text-xs text-muted-foreground">~{SHOWER_LITERS}L each</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buckets">Buckets used daily</Label>
              <Input
                id="buckets"
                type="number"
                min="0"
                max="20"
                value={usage.buckets}
                onChange={(e) => setUsage({...usage, buckets: parseInt(e.target.value) || 0})}
                className="text-center"
              />
              <p className="text-xs text-muted-foreground">~{BUCKET_LITERS}L each</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bottles">Water bottles daily</Label>
              <Input
                id="bottles"
                type="number"
                min="0"
                max="10"
                value={usage.bottles}
                onChange={(e) => setUsage({...usage, bottles: parseInt(e.target.value) || 0})}
                className="text-center"
              />
              <p className="text-xs text-muted-foreground">~{BOTTLE_LITERS}L each</p>
            </div>
          </div>

          {/* Water Usage Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {dailyTotal}L
                </div>
                <div className="text-sm text-muted-foreground">Daily Usage</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {weeklyTotal}L
                </div>
                <div className="text-sm text-muted-foreground">Weekly Usage</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {monthlyTotal}L
                </div>
                <div className="text-sm text-muted-foreground">Monthly Usage</div>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Rating */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Water Efficiency Rating</Label>
              <Badge variant="outline" className={`${efficiency.color} text-white border-0`}>
                {efficiency.rating}
              </Badge>
            </div>
            <Progress value={efficiency.percentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {efficiency.rating === "Excellent" && "🌟 Amazing! You're using water very efficiently!"}
              {efficiency.rating === "Good" && "👍 Good job! Small improvements can save even more water."}
              {efficiency.rating === "Average" && "💡 There's room for improvement in your water usage."}
              {efficiency.rating === "High Usage" && "⚠️ Consider reducing your daily water consumption."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Water Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}L`, 'Water Used']} />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Usage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Showers', value: usage.showers * SHOWER_LITERS, color: '#3b82f6' },
                { name: 'Buckets', value: usage.buckets * BUCKET_LITERS, color: '#06b6d4' },
                { name: 'Bottles', value: usage.bottles * BOTTLE_LITERS, color: '#8b5cf6' }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}L`, 'Water Used']} />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Save className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">
                {dailyTotal <= 200 && "🎉 Fantastic! You're saving enough water to fill a small tank weekly!"}
                {dailyTotal > 200 && dailyTotal <= 300 && "🌊 Great progress! Every drop saved makes a difference!"}
                {dailyTotal > 300 && "💪 Ready to start your water-saving journey? Small changes = big impact!"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your conscious choices today create a sustainable tomorrow!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterTracker;