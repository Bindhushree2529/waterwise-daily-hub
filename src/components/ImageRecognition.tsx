import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Upload, Loader2, Droplets, Eye } from "lucide-react";
import { pipeline } from '@huggingface/transformers';
import { toast } from "sonner";

interface RecognitionResult {
  label: string;
  score: number;
}

interface WaterFootprintResult {
  item: string;
  quantity: number;
  unit: string;
  waterLiters: number;
  characteristics: string;
}

const ImageRecognition = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<string>("");
  const [finalResult, setFinalResult] = useState<WaterFootprintResult | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Water footprint mapping (simplified version)
  const waterFootprintMap: Record<string, { litersPerUnit: number; defaultUnit: string }> = {
    "rice": { litersPerUnit: 2500, defaultUnit: "kg" },
    "beef": { litersPerUnit: 15400, defaultUnit: "kg" },
    "chicken": { litersPerUnit: 4300, defaultUnit: "kg" },
    "apple": { litersPerUnit: 125, defaultUnit: "apple" },
    "orange": { litersPerUnit: 160, defaultUnit: "orange" },
    "bread": { litersPerUnit: 1600, defaultUnit: "loaf" },
    "milk": { litersPerUnit: 1000, defaultUnit: "liter" },
    "coffee": { litersPerUnit: 140, defaultUnit: "cup" },
    "tea": { litersPerUnit: 30, defaultUnit: "cup" },
    "cotton": { litersPerUnit: 2700, defaultUnit: "t-shirt" },
    "jeans": { litersPerUnit: 7500, defaultUnit: "pair" },
    "smartphone": { litersPerUnit: 12000, defaultUnit: "phone" },
    "laptop": { litersPerUnit: 25000, defaultUnit: "laptop" }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setRecognitionResult([]);
        setShowDetailsForm(false);
        setFinalResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    try {
      console.log("Starting image analysis...");
      
      // Use a smaller, more reliable model for browser usage
      const classifier = await pipeline(
        'image-classification',
        'Xenova/mobilenet_v2_1.0_224'
      );

      console.log("Pipeline created, analyzing image...");
      
      // Classify the image
      const results = await classifier(selectedImage) as RecognitionResult[];
      console.log("Analysis results:", results);
      
      setRecognitionResult(results.slice(0, 3)); // Show top 3 results
      toast.success("Image analyzed successfully!");
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error(`Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectRecognizedItem = (label: string) => {
    setSelectedItem(label.toLowerCase());
    
    // Find best match in water footprint map
    const itemKey = Object.keys(waterFootprintMap).find(key => 
      label.toLowerCase().includes(key) || key.includes(label.toLowerCase())
    );
    
    if (itemKey) {
      setUnit(waterFootprintMap[itemKey].defaultUnit);
    }
    
    setShowDetailsForm(true);
  };

  const calculateWaterFootprint = () => {
    if (!selectedItem || !quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    // Find matching water footprint data
    let waterPerUnit = 1000; // Default fallback
    let matchedItem = selectedItem;

    const itemKey = Object.keys(waterFootprintMap).find(key => 
      selectedItem.toLowerCase().includes(key) || key.includes(selectedItem.toLowerCase())
    );
    
    if (itemKey) {
      waterPerUnit = waterFootprintMap[itemKey].litersPerUnit;
      matchedItem = itemKey;
    }

    const totalWaterLiters = qty * waterPerUnit;

    const result: WaterFootprintResult = {
      item: matchedItem,
      quantity: qty,
      unit: unit || "unit",
      waterLiters: totalWaterLiters,
      characteristics: characteristics || "No additional characteristics specified"
    };

    setFinalResult(result);
    toast.success(`Water footprint calculated: ${totalWaterLiters.toLocaleString()} liters!`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          AI Item Recognition
        </CardTitle>
        <CardDescription>
          Upload an image to identify items and calculate their water footprint
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Uploaded item" 
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload an image of food, clothing, or electronics
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {selectedImage && (
            <Button 
              onClick={analyzeImage} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          )}
        </div>

        {/* Recognition Results */}
        {recognitionResult.length > 0 && (
          <div className="space-y-4">
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">What did we find?</h4>
              <div className="space-y-2">
                {recognitionResult.map((result, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => selectRecognizedItem(result.label)}
                  >
                    <span className="font-medium">{result.label}</span>
                    <Badge variant="outline">
                      {Math.round(result.score * 100)}% confident
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click on an item to proceed with water footprint calculation
              </p>
            </div>
          </div>
        )}

        {/* Details Form */}
        {showDetailsForm && (
          <div className="space-y-4">
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">Item Details</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    placeholder="e.g., rice, apple, t-shirt"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 1, 2.5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="e.g., kg, pieces, cups"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="characteristics">Additional Characteristics (Optional)</Label>
                  <Textarea
                    id="characteristics"
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
                    placeholder="e.g., organic, locally grown, processed..."
                    rows={3}
                  />
                </div>
                
                <Button onClick={calculateWaterFootprint} className="w-full">
                  <Droplets className="w-4 h-4 mr-2" />
                  Calculate Water Footprint
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Final Result */}
        {finalResult && (
          <div className="space-y-4">
            <Separator />
            <div className="bg-gradient-water/10 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-primary" />
                Water Footprint Result
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="font-medium capitalize">{finalResult.item}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{finalResult.quantity} {finalResult.unit}</span>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {finalResult.waterLiters.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    liters of water consumed
                  </div>
                </div>
                
                {finalResult.characteristics !== "No additional characteristics specified" && (
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">
                      Characteristics: {finalResult.characteristics}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageRecognition;