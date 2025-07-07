
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Check, IndianRupee, Shield, Clock } from "lucide-react";

interface PaymentStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrev: () => void;
}

const PaymentStep = ({ formData, updateFormData, onPrev }: PaymentStepProps) => {
  const [processing, setProcessing] = useState(false);

  const calculateAmount = () => {
    let baseAmount = 500; // Base registration fee
    
    if (formData.danceType === 'duo') {
      baseAmount = 800;
    } else if (formData.danceType === 'group') {
      baseAmount = 1200;
    }
    
    return baseAmount;
  };

  useEffect(() => {
    const amount = calculateAmount();
    updateFormData({ amount });
  }, [formData.danceType]);

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Here you would integrate with Cashfree payment gateway
      // For demo purposes, we'll simulate the payment process
      
      console.log('Initiating payment for:', formData);
      
      // Simulate API call to create payment session
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Send form data to Supabase edge function
      // 2. Create payment session with Cashfree
      // 3. Open Cashfree checkout popup
      // 4. Handle payment success/failure
      
      // For now, we'll redirect to success page
      window.location.href = '/registration-success';
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const registrationSummary = {
    name: formData.name,
    danceType: formData.danceType,
    ageGroup: formData.ageGroup,
    theme: formData.theme,
    category: formData.category,
    participants: formData.danceType === 'solo' ? 1 : 
                 formData.danceType === 'duo' ? 2 : 
                 formData.groupMembers?.filter((name: string) => name.trim()).length || 0
  };

  return (
    <div className="space-y-6">
      {/* Registration Summary */}
      <Card className="border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-xl text-blue-900">Registration Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Participant Name:</span>
                <span className="font-medium">{registrationSummary.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dance Type:</span>
                <Badge variant="secondary" className="capitalize">
                  {registrationSummary.danceType}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age Group:</span>
                <span className="font-medium">{registrationSummary.ageGroup} years</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Theme:</span>
                <span className="font-medium">{registrationSummary.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{registrationSummary.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Participants:</span>
                <span className="font-medium">{registrationSummary.participants}</span>
              </div>
            </div>
          </div>
          
          {formData.danceType === 'duo' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Duo Participants:</h4>
              <div className="flex gap-4">
                <span>1. {formData.participant1Name}</span>
                <span>2. {formData.participant2Name}</span>
              </div>
            </div>
          )}
          
          {formData.danceType === 'group' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Group Members:</h4>
              <div className="grid grid-cols-2 gap-2">
                {formData.groupMembers?.map((member: string, index: number) => (
                  member.trim() && (
                    <span key={index} className="text-sm">
                      {index + 1}. {member}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-xl text-green-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Registration Fee:</span>
              <div className="flex items-center font-bold text-2xl text-green-600">
                <IndianRupee className="w-5 h-5" />
                {calculateAmount()}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount:</span>
              <div className="flex items-center text-green-600">
                <IndianRupee className="w-6 h-6" />
                {calculateAmount()}
              </div>
            </div>
            
            {/* Payment Features */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-blue-800">Secure Payment</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">Instant Confirmation</span>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm text-orange-800">Quick Process</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Accepted Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
              <div key={method} className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">{method}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Powered by Cashfree - India's leading payment gateway
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          type="button"
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-8 py-3"
          disabled={processing}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous Step
        </Button>
        
        <Button 
          onClick={handlePayment}
          size="lg"
          disabled={processing}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {processing ? (
            <>
              <Clock className="mr-2 w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 w-5 h-5" />
              Pay ₹{calculateAmount()}
            </>
          )}
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>By proceeding with payment, you agree to our terms and conditions.</p>
        <p className="mt-1">Your registration will be confirmed upon successful payment.</p>
      </div>
    </div>
  );
};

export default PaymentStep;
