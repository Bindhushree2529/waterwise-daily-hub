import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, TrendingUp, Target, Star, Award, Crown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CommunityGroup {
  id: string;
  name: string;
  type: "school" | "college" | "apartment" | "office" | "neighborhood";
  members: number;
  totalSavings: number;
  weeklyGoal: number;
  currentWeekSavings: number;
}

interface Leaderboard {
  rank: number;
  name: string;
  savings: number;
  type: string;
  badge: string;
}

const CommunityDashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState<CommunityGroup | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState<string>("");
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  useEffect(() => {
    // Initialize with sample data
    const sampleGroups: CommunityGroup[] = [
      {
        id: "1",
        name: "Green Valley Apartments",
        type: "apartment",
        members: 45,
        totalSavings: 12500,
        weeklyGoal: 2000,
        currentWeekSavings: 1750
      },
      {
        id: "2",
        name: "Sunshine Public School",
        type: "school",
        members: 320,
        totalSavings: 45000,
        weeklyGoal: 8000,
        currentWeekSavings: 8500
      },
      {
        id: "3",
        name: "Tech Hub Office Complex",
        type: "office",
        members: 180,
        totalSavings: 28000,
        weeklyGoal: 5000,
        currentWeekSavings: 4200
      }
    ];

    const sampleLeaderboard: Leaderboard[] = [
      { rank: 1, name: "Sunshine Public School", savings: 45000, type: "School", badge: "🏆" },
      { rank: 2, name: "Tech Hub Office Complex", savings: 28000, type: "Office", badge: "🥈" },
      { rank: 3, name: "Green Valley Apartments", savings: 12500, type: "Apartment", badge: "🥉" },
      { rank: 4, name: "Riverside College", savings: 8900, type: "College", badge: "⭐" },
      { rank: 5, name: "Downtown Neighborhood", savings: 6700, type: "Neighborhood", badge: "🌟" }
    ];

    setGroups(sampleGroups);
    setLeaderboard(sampleLeaderboard);
    setSelectedGroup(sampleGroups[0]);
  }, []);

  const createNewGroup = () => {
    if (newGroupName && newGroupType) {
      const newGroup: CommunityGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        type: newGroupType as any,
        members: 1,
        totalSavings: 0,
        weeklyGoal: 1000,
        currentWeekSavings: 0
      };
      
      setGroups([...groups, newGroup]);
      setSelectedGroup(newGroup);
      setNewGroupName("");
      setNewGroupType("");
    }
  };

  const getGroupTypeIcon = (type: string) => {
    switch (type) {
      case "school": return "🏫";
      case "college": return "🎓";
      case "apartment": return "🏢";
      case "office": return "🏬";
      case "neighborhood": return "🏘️";
      default: return "👥";
    }
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const monthlyData = [
    { month: "Jan", savings: 3200 },
    { month: "Feb", savings: 4100 },
    { month: "Mar", savings: 3800 },
    { month: "Apr", savings: 4500 },
    { month: "May", savings: 5200 },
    { month: "Jun", savings: 4800 }
  ];

  const savingsByType = [
    { name: "Showers", value: 35, color: "#3b82f6" },
    { name: "Kitchen", value: 25, color: "#06b6d4" },
    { name: "Laundry", value: 20, color: "#8b5cf6" },
    { name: "Garden", value: 15, color: "#10b981" },
    { name: "Other", value: 5, color: "#f59e0b" }
  ];

  return (
    <div className="space-y-6">
      {/* Community Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Join or Create Community
            </CardTitle>
            <CardDescription>
              Connect with your community to track collective water savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Existing Community</Label>
              <Select value={selectedGroup?.id || ""} onValueChange={(value) => {
                const group = groups.find(g => g.id === value);
                setSelectedGroup(group || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your community" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {getGroupTypeIcon(group.type)} {group.name} ({group.members} members)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Create New Community</Label>
              <Input
                placeholder="Community name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <Select value={newGroupType} onValueChange={setNewGroupType}>
                <SelectTrigger>
                  <SelectValue placeholder="Community type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">🏫 School</SelectItem>
                  <SelectItem value="college">🎓 College</SelectItem>
                  <SelectItem value="apartment">🏢 Apartment Complex</SelectItem>
                  <SelectItem value="office">🏬 Office Building</SelectItem>
                  <SelectItem value="neighborhood">🏘️ Neighborhood</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={createNewGroup} className="w-full">
                Create Community
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Global Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Global Leaderboard
            </CardTitle>
            <CardDescription>
              Top water-saving communities this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{entry.badge}</div>
                    <div>
                      <div className="font-medium text-sm">{entry.name}</div>
                      <div className="text-xs text-muted-foreground">{entry.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{entry.savings.toLocaleString()}L</div>
                    <div className="text-xs text-muted-foreground">saved</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Community Dashboard */}
      {selectedGroup && (
        <>
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{getGroupTypeIcon(selectedGroup.type)}</span>
                {selectedGroup.name}
              </CardTitle>
              <CardDescription>
                Community water savings dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedGroup.members}</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedGroup.totalSavings.toLocaleString()}L</div>
                  <div className="text-sm text-muted-foreground">Total Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedGroup.currentWeekSavings}L</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(selectedGroup.totalSavings / selectedGroup.members)}</div>
                  <div className="text-sm text-muted-foreground">L per Member</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Weekly Goal Progress</Label>
                  <Badge variant="outline" className={`${getProgressColor(selectedGroup.currentWeekSavings, selectedGroup.weeklyGoal)} text-white border-0`}>
                    {Math.round((selectedGroup.currentWeekSavings / selectedGroup.weeklyGoal) * 100)}%
                  </Badge>
                </div>
                <Progress 
                  value={(selectedGroup.currentWeekSavings / selectedGroup.weeklyGoal) * 100} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedGroup.currentWeekSavings >= selectedGroup.weeklyGoal 
                    ? "🎉 Goal achieved! Amazing teamwork!" 
                    : `${selectedGroup.weeklyGoal - selectedGroup.currentWeekSavings}L more needed to reach weekly goal`
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Community Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Monthly Savings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}L`, 'Water Saved']} />
                    <Bar dataKey="savings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Savings by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={savingsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {savingsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Community Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Community Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Water Warrior</h3>
                  <p className="text-sm text-muted-foreground">Saved 10,000+ liters</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300">Team Player</h3>
                  <p className="text-sm text-muted-foreground">25+ active members</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700 dark:text-green-300">Goal Crusher</h3>
                  <p className="text-sm text-muted-foreground">5 weeks of goals met</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">
                🌊 Amazing! Your community saved {selectedGroup.totalSavings.toLocaleString()} liters!
              </h3>
              <p className="text-muted-foreground">
                That's enough water to fill {Math.round(selectedGroup.totalSavings / 1000)} water tanks! 
                Together, we're making a real difference for our planet. 🌍
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CommunityDashboard;