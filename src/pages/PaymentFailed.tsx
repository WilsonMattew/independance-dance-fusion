
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw, Home, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Failed Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          <p className="text-xl text-gray-600">
            Don't worry! Your registration details have been saved.
          </p>
        </div>

        {/* Failure Details */}
        <Card className="mb-8 shadow-lg border-red-200">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What happened?</h2>
              <p className="text-gray-600 mb-4">
                Your payment could not be processed at this time. This might be due to:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Common Reasons:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Insufficient balance in your account
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Bank server temporarily unavailable
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Internet connection issues
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Card/UPI limit exceeded
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Good News!</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your registration information is safely stored. You can retry payment anytime before the deadline.
                </p>
                <div className="text-sm">
                  <strong className="text-orange-600">Registration Deadline:</strong>
                  <br />August 10, 2024
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Try Payment Again</h3>
              <p className="text-gray-600 mb-4">
                Your registration details are saved. Complete the payment to confirm your registration.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full w-full"
                asChild
              >
                <Link to="/register">
                  Retry Payment
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our support team if you continue to face payment issues.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full w-full"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Tips */}
        <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-200 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Payment Tips for Success</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Before Retrying:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Check your account balance</li>
                  <li>• Ensure stable internet connection</li>
                  <li>• Try a different payment method</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Alternative Options:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Use UPI instead of cards</li>
                  <li>• Try during off-peak hours</li>
                  <li>• Contact your bank if needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/register">
              <RefreshCw className="mr-2 w-5 h-5" />
              Retry Payment
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-gray-600 text-gray-600 hover:bg-gray-50 px-8 py-3 rounded-full"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2">Still Having Issues?</h4>
          <p className="text-gray-600 text-sm mb-3">
            Our support team is available to help you complete your registration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span>📧 support@npanashik.com</span>
            <span className="hidden sm:inline">|</span>
            <span>📱 +91 12345 67890</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
