
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Calendar, MapPin, Phone, Mail, GraduationCap } from "lucide-react";

interface PersonalInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ formData, updateFormData, onNext }: PersonalInfoStepProps) => {
  // Calculate age when date of birth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      updateFormData({ age });
    }
  }, [formData.dateOfBirth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.dateOfBirth || !formData.gender || 
        !formData.mobile || !formData.email || !formData.schoolCollege) {
      alert('Please fill in all required fields');
      return;
    }
    
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card className="border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    readOnly
                    className="mt-1 bg-gray-50"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                  Gender *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Phone className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => updateFormData({ mobile: e.target.value })}
                  className="mt-1"
                  placeholder="+91 12345 67890"
                  required
                />
              </div>

              <div>
                <Label htmlFor="alternateMobile" className="text-sm font-medium text-gray-700">
                  Alternate Mobile
                </Label>
                <Input
                  id="alternateMobile"
                  type="tel"
                  value={formData.alternateMobile}
                  onChange={(e) => updateFormData({ alternateMobile: e.target.value })}
                  className="mt-1"
                  placeholder="+91 12345 67890 (optional)"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="mt-1"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          </div>
          
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Complete Address *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              className="mt-1"
              placeholder="Enter your complete address including city, state, and pincode"
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Educational Information */}
      <Card className="border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Educational & Dance Information</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="schoolCollege" className="text-sm font-medium text-gray-700">
                School/College Name *
              </Label>
              <Input
                id="schoolCollege"
                type="text"
                value={formData.schoolCollege}
                onChange={(e) => updateFormData({ schoolCollege: e.target.value })}
                className="mt-1"
                placeholder="Enter your school or college name"
                required
              />
            </div>
            <div>
              <Label htmlFor="teacherName" className="text-sm font-medium text-gray-700">
                Dance Teacher's Name
              </Label>
              <Input
                id="teacherName"
                type="text"
                value={formData.teacherName}
                onChange={(e) => updateFormData({ teacherName: e.target.value })}
                className="mt-1"
                placeholder="Enter your dance teacher's name (optional)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Continue to Category & Video
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
