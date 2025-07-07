
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Home, Search, Mail, Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            🎉 Registration Completed!
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to IndepeDANCE - Your journey to express freedom through dance begins now!
          </p>
        </div>

        {/* Success Details */}
        <Card className="mb-8 shadow-lg border-green-200">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Confirmation</h3>
                      <p className="text-gray-600 text-sm">
                        Check your email for registration confirmation and audition guidelines
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-bold mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Audition Review</h3>
                      <p className="text-gray-600 text-sm">
                        Our judges will review your audition video within 7-10 days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Selection Notification</h3>
                      <p className="text-gray-600 text-sm">
                        You'll receive an email about your selection status
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Trophy className="w-6 h-6 text-orange-500 mr-2" />
                  Important Dates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm">
                      <strong>Audition Deadline:</strong> August 10, 2024
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">
                      <strong>Results Announcement:</strong> August 12, 2024
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">
                      <strong>Final Performance:</strong> August 14, 2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Audition Status</h3>
              <p className="text-gray-600 mb-4">
                Track your audition progress and view selection updates
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                asChild
              >
                <Link to="/status">
                  View Audition Status
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">
                Have questions? Our team is here to help you
              </p>
              <Button 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-full"
              >
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Registration ID */}
        <Card className="bg-gradient-to-r from-orange-100 to-green-100 border-2 border-orange-200 shadow-lg mb-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Registration ID</h3>
            <Badge variant="secondary" className="bg-white text-gray-800 text-lg px-4 py-2 font-mono">
              IND-2024-{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              Please save this ID for future reference
            </p>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full"
            asChild
          >
            <Link to="/status">
              <Search className="mr-2 w-5 h-5" />
              Check Status
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2">Stay Connected!</h4>
          <p className="text-gray-600 text-sm">
            Follow us on social media for updates, tips, and behind-the-scenes content from IndepeDANCE.
            Don't forget to use #IndepeDANCE2024 when sharing your dance journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
