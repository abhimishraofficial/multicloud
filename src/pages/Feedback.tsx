
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, CheckCircle2, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const isFormValid = name.trim() !== "" && email.trim() !== "" && rating !== undefined && message.trim() !== "";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Show toast notification
    toast({
      title: "Success!",
      description: "Your feedback has been submitted. Thank you!",
    });
    
    // Set submitted state to true to show the confirmation message
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A101F] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A101F]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2 text-white border-white/20 hover:bg-white/5"
          >
            <Link to="/dashboard">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-gradient-primary">
              Your Feedback Matters
            </h1>
            <p className="text-lg text-white/70 max-w-3xl">
              Help us improve CloudSync by sharing your experience and suggestions.
            </p>
          </div>

          <Separator className="bg-white/10" />

          {submitted ? (
            <Card className="border-white/10 bg-[#131A2E]/80 backdrop-blur-sm shadow-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                  <h2 className="text-2xl font-bold">Feedback Submitted!</h2>
                  <p className="text-white/70 mt-2 mb-6">
                    Thank you for your valuable feedback. We appreciate your time and will use your insights to improve CloudSync.
                  </p>
                  <Button asChild className="bg-[#1E40AF] hover:bg-[#1E40AF]/80">
                    <Link to="/dashboard">Return to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-white/10 bg-[#131A2E]/80 backdrop-blur-sm shadow-xl rounded-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle>Feedback Form</CardTitle>
                <CardDescription className="text-white/60">
                  Please fill out the form below with your thoughts and suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-[#0D1424] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#1E40AF]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-[#0D1424] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#1E40AF]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Rating</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup
                        value={rating}
                        onValueChange={setRating}
                        className="flex space-x-1"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <label
                            key={value}
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <RadioGroupItem
                              value={value.toString()}
                              id={`rating-${value}`}
                              className="sr-only"
                            />
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                parseInt(rating || "0") >= value
                                  ? "fill-[#1E40AF] text-[#1E40AF]"
                                  : "text-white/40"
                              }`}
                            />
                            <span className="sr-only">{value} Star{value !== 1 ? "s" : ""}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Your Feedback</Label>
                    <Textarea
                      id="message"
                      placeholder="Please share your thoughts, suggestions, or report any issues you've experienced..."
                      rows={6}
                      className="bg-[#0D1424] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#1E40AF]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/80 transition-colors"
                    disabled={!isFormValid}
                  >
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A101F] mt-16">
        <div className="container mx-auto p-8">
          <p className="text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} CloudSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
