
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Check, IndianRupee, Shield, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PaymentStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrev: () => void;
}

const PaymentStep = ({ formData, updateFormData, onPrev }: PaymentStepProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Load Cashfree SDK
    const loadCashfreeSDK = () => {
      if ((window as any).Cashfree) {
        setSdkLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js';
      script.async = true;
      script.onload = () => {
        console.log('Cashfree SDK loaded successfully');
        setSdkLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Cashfree SDK');
        toast({
          title: "SDK Error",
          description: "Failed to load payment SDK. Please refresh the page.",
          variant: "destructive",
        });
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    const cleanup = loadCashfreeSDK();
    return cleanup;
  }, [toast]);

  const calculateAmount = () => {
    return 500; // Fixed registration fee
  };

  useEffect(() => {
    const amount = calculateAmount();
    updateFormData({ amount });
  }, []);

  const handlePayment = async () => {
    if (!sdkLoaded) {
      toast({
        title: "Payment Error",
        description: "Payment system is not ready. Please wait a moment and try again.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    
    try {
      toast({
        title: "Processing Payment",
        description: "Please wait while we initialize your payment...",
      });

      console.log('Sending payment request with data:', formData);

      // Call Supabase Edge Function to create payment session
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: { registrationData: formData }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Payment session created:', data);

      // Initialize Cashfree Checkout
      const cashfree = (window as any).Cashfree;
      if (!cashfree) {
        throw new Error('Cashfree SDK not loaded properly');
      }

      // Use the new Cashfree API format
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        returnUrl: `${window.location.origin}/registration-success?order_id=${data.order_id}&pre_registration_id=${data.pre_registration_id}`
      };

      console.log('Initializing Cashfree checkout with options:', checkoutOptions);

      cashfree.checkout(checkoutOptions);

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
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
    <div className="space-y-4 sm:space-y-6">
      {/* Registration Summary */}
      <Card className="border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl text-blue-900">Registration Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Participant Name:</span>
                  <span className="font-medium text-sm sm:text-base">{registrationSummary.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Dance Type:</span>
                  <Badge variant="secondary" className="capitalize text-xs sm:text-sm w-fit">
                    {registrationSummary.danceType}
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Age Group:</span>
                  <span className="font-medium text-sm sm:text-base">{registrationSummary.ageGroup} years</span>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Theme:</span>
                  <span className="font-medium text-sm sm:text-base">{registrationSummary.theme}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Category:</span>
                  <span className="font-medium text-sm sm:text-base">{registrationSummary.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600">Total Participants:</span>
                  <span className="font-medium text-sm sm:text-base">{registrationSummary.participants}</span>
                </div>
              </div>
            </div>
            
            {formData.danceType === 'duo' && (
              <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Duo Participants:</h4>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base">
                  <span>1. {formData.participant1Name}</span>
                  <span>2. {formData.participant2Name}</span>
                </div>
              </div>
            )}
            
            {formData.danceType === 'group' && (
              <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Group Members:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {formData.groupMembers?.map((member: string, index: number) => (
                    member.trim() && (
                      <span key={index} className="text-xs sm:text-sm">
                        {index + 1}. {member}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl text-green-900 flex items-center">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-base sm:text-lg">
              <span className="text-gray-600">Registration Fee:</span>
              <div className="flex items-center font-bold text-xl sm:text-2xl text-green-600">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
                {calculateAmount()}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
              <span>Total Amount:</span>
              <div className="flex items-center text-green-600">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6" />
                {calculateAmount()}
              </div>
            </div>
            
            {/* Payment Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                <span className="text-xs sm:text-sm text-blue-800">Secure Payment</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                <span className="text-xs sm:text-sm text-green-800">Instant Confirmation</span>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-2" />
                <span className="text-xs sm:text-sm text-orange-800">Quick Process</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-purple-200">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Accepted Payment Methods</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
              <div key={method} className="flex items-center justify-center p-2 sm:p-3 border rounded-lg hover:bg-gray-50">
                <span className="text-xs sm:text-sm font-medium text-center">{method}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-4">
            Powered by Cashfree - India's leading payment gateway
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
        <Button 
          type="button"
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3"
          disabled={processing}
        >
          <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          Previous Step
        </Button>
        
        <Button 
          onClick={handlePayment}
          size="lg"
          disabled={processing || !sdkLoaded}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {processing ? (
            <>
              <Clock className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              Processing...
            </>
          ) : !sdkLoaded ? (
            <>
              <Clock className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Pay ₹{calculateAmount()}
            </>
          )}
        </Button>
      </div>
      
      <div className="text-center text-xs sm:text-sm text-gray-600 px-4">
        <p>By proceeding with payment, you agree to our terms and conditions.</p>
        <p className="mt-1">Your registration will be confirmed upon successful payment.</p>
      </div>
    </div>
  );
};

export default PaymentStep;
