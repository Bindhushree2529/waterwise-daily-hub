import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Droplets, Leaf, LogOut, Lightbulb, Camera, BarChart3, Users } from "lucide-react";
import waterWiseLogo from "@/assets/waterwise-logo.png";
import { waterFootprintData } from "@/data/waterFootprintData";
import ImageRecognition from "@/components/ImageRecognition";
import WaterTracker from "@/components/WaterTracker";
import WaterSavingSuggestions from "@/components/WaterSavingSuggestions";
import CommunityDashboard from "@/components/CommunityDashboard";

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<typeof waterFootprintData[0] | null>(null);
  
  // Water tracker state
  const [dailyUsage, setDailyUsage] = useState(300);
  const [showers, setShowers] = useState(1);
  const [buckets, setBuckets] = useState(3);
  const [bottles, setBottles] = useState(2);

  const categories = ["all", "food", "clothing", "electronics"];

  const filteredItems = waterFootprintData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalWaterFootprint = waterFootprintData.reduce((sum, item) => sum + item.liters, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-water shadow-water p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={waterWiseLogo} 
              alt="WaterWise Logo" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-bold text-white">WaterWise Dashboard</h1>
              <p className="text-white/80">Welcome back, {user}!</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="text-white border-white/50 hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="search">Search Items</TabsTrigger>
            <TabsTrigger value="camera">AI Recognition</TabsTrigger>
            <TabsTrigger value="tracker">Usage Tracker</TabsTrigger>
            <TabsTrigger value="suggestions">Save Water</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search and Filters */}
              <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search Water Footprints
                </CardTitle>
                <CardDescription>
                  Discover the hidden water consumption of everyday items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer capitalize ${
                        selectedCategory === category 
                          ? "bg-gradient-water border-0 text-white hover:shadow-water-glow" 
                          : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "All Items" : category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all hover:shadow-water ${
                    selectedItem?.id === item.id ? "ring-2 ring-primary shadow-water" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <Droplets className="w-4 h-4" />
                      <span className="font-bold">{item.liters.toLocaleString()} liters</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.unit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Selected Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedItem ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                      <Badge variant="outline" className="mt-2 capitalize">
                        {selectedItem.category}
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-gradient-water/10 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {selectedItem.liters.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          liters per {selectedItem.unit}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Did you know?
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedItem.fact}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Click on an item to see details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Water Saving Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" />
                  Water Saving Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">💧 Take shorter showers to save up to 25 gallons per day</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">🥗 Eat more plant-based meals to reduce water footprint</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">👕 Buy fewer new clothes and choose sustainable brands</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">📱 Keep electronics longer to reduce manufacturing impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="camera">
            <div className="max-w-4xl mx-auto">
              <ImageRecognition />
            </div>
          </TabsContent>
          
          <TabsContent value="tracker">
            <div className="max-w-6xl mx-auto">
              <WaterTracker />
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="max-w-6xl mx-auto">
              <WaterSavingSuggestions 
                dailyUsage={dailyUsage}
                showers={showers}
                buckets={buckets}
                bottles={bottles}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="community">
            <div className="max-w-6xl mx-auto">
              <CommunityDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;