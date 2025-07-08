
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, Video, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2024-08-14T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-white to-green-500 py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-transparent to-green-500/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge className="bg-blue-900 text-white px-4 py-2 text-sm font-medium mb-4">
              A Gurudakshina Event by NPA
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-blue-900 to-green-600 bg-clip-text text-transparent mb-6">
              IndepeDANCE
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-8">
              Express Your Freedom Through Dance!
            </p>
          </div>
          
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Register Now
              <Star className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">Event Countdown</h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <Card key={unit} className="bg-gradient-to-br from-orange-100 to-green-100 border-2 border-orange-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                    {unit}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Timeline */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-green-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Competition Timeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Audition Round 1", 
                icon: Video, 
                description: "Submit your audition video",
                color: "from-orange-400 to-orange-600"
              },
              { 
                title: "Audition Round 2", 
                icon: Users, 
                description: "Selected participants advance",
                color: "from-blue-400 to-blue-600"
              },
              { 
                title: "Final Performance", 
                icon: Trophy, 
                description: "Live performance on stage",
                color: "from-green-400 to-green-600"
              }
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white mb-6`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Step {index + 1}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Register */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">How to Register</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                step: "1", 
                title: "Fill Details", 
                description: "Enter your personal information and dance experience",
                icon: "📝"
              },
              { 
                step: "2", 
                title: "Upload Audition Video", 
                description: "Submit your best dance performance (1-1.5 minutes)",
                icon: "🎥"
              },
              { 
                step: "3", 
                title: "Pay & Confirm", 
                description: "Complete registration with secure payment",
                icon: "💳"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-2xl font-bold text-orange-500 mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Watch Tutorial Video</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                  <Video className="w-12 h-12" />
                  <span className="ml-2">Tutorial Video Coming Soon</span>
                </div>
                <p className="text-sm text-gray-600">Learn how to create the perfect audition video</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="mb-2">📧 info@npanashik.com</p>
              <p className="mb-2">📱 +91 12345 67890</p>
              <p className="mb-2">🏢 NPA Nashik Performing Arts</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/register" className="block hover:text-orange-300 transition-colors">Register Now</Link>
                <Link to="/status" className="block hover:text-orange-300 transition-colors">Check Status</Link>
                <Link to="/rules" className="block hover:text-orange-300 transition-colors">Competition Rules</Link>
                <Link to="/admin" className="block hover:text-orange-300 transition-colors">Admin Panel</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="hover:text-orange-300 transition-colors">📘 Facebook</a>
                <a href="#" className="hover:text-orange-300 transition-colors">📷 Instagram</a>
                <a href="#" className="hover:text-orange-300 transition-colors">🐦 Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 NPA Nashik Performing Arts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
