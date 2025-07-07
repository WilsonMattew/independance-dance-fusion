
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PersonalInfoStep from '@/components/registration/PersonalInfoStep';
import CategoryVideoStep from '@/components/registration/CategoryVideoStep';
import PaymentStep from '@/components/registration/PaymentStep';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    dateOfBirth: '',
    age: 0,
    gender: '',
    address: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    schoolCollege: '',
    teacherName: '',
    
    // Category & Video
    danceType: '', // solo, duo, group
    ageGroup: '',
    theme: '',
    category: '',
    participant1Name: '',
    participant2Name: '',
    groupMembers: [''],
    videoUrl: '',
    
    // Payment
    amount: 0
  });

  const steps = [
    { number: 1, title: "Personal Information", completed: currentStep > 1 },
    { number: 2, title: "Category & Video", completed: currentStep > 2 },
    { number: 3, title: "Payment", completed: currentStep > 3 }
  ];

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateProgress = () => {
    return ((currentStep - 1) / 2) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <CategoryVideoStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <PaymentStep 
            formData={formData} 
            updateFormData={updateFormData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-4 sm:py-8 px-4">
      <div className="container mx-auto max-w-4xl px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center text-blue-900 hover:text-orange-500 mb-4 transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 via-blue-900 to-green-600 bg-clip-text text-transparent mb-4">
            IndepeDANCE Registration
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Complete your registration in 3 simple steps</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.number 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.number}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <div className={`font-medium ${
                      currentStep === step.number ? 'text-orange-600' : 
                      step.completed ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-16 h-1 mx-4 rounded ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={calculateProgress()} className="w-full" />
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-2xl text-blue-900">
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-8">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
