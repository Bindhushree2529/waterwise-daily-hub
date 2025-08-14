import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import waterWiseLogo from "@/assets/waterwise-logo.png";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-water p-4">
      <Card className="w-full max-w-md shadow-water">
        <CardHeader className="text-center">
          <div className="mb-6">
            <img 
              src={waterWiseLogo} 
              alt="WaterWise Logo" 
              className="w-20 h-20 mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome to WaterWise
          </CardTitle>
          <CardDescription>
            Enter your name to start calculating your water footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-lg"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-water border-0 text-white font-semibold py-3 hover:shadow-water-glow transition-all duration-300"
              disabled={!username.trim()}
            >
              Start Your Journey
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Learn about the water footprint of everyday items</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;