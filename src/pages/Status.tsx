import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Eye, Calendar, User, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Status = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchRegistration = async () => {
    if (!email && !mobile && !registrationId) {
      toast({
        title: "Search Required",
        description: "Please enter email, mobile number, or registration ID to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('registrations')
        .select('*');

      if (registrationId) {
        query = query.eq('id', registrationId);
      } else if (email) {
        query = query.eq('email', email.toLowerCase());
      } else if (mobile) {
        query = query.eq('mobile', mobile);
      }

      const { data, error } = await query.single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Registration Not Found",
            description: "No registration found with the provided details. Please check your details or contact support.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        // Redirect to status details page
        window.location.href = `/status/${data.id}`;
      }
    } catch (error) {
      console.error('Error searching registration:', error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '🎉 Approved - Selected for Next Round!';
      case 'rejected':
        return '❌ Not Selected';
      default:
        return '⏳ Under Review';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center text-accent hover:text-primary mb-4 transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            Check Audition Status
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Enter your details to check your registration and audition status</p>
        </div>

        {/* Search Form */}
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-2xl text-accent flex items-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Search Your Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="registrationId">Registration ID</Label>
                <Input
                  id="registrationId"
                  type="text"
                  placeholder="Enter registration ID"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              onClick={searchRegistration} 
              disabled={loading || (!email && !mobile && !registrationId)}
              className="w-full sm:w-auto"
            >
              {loading ? 'Searching...' : 'Search Registration'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Enter registration ID, email, or mobile number to search
            </p>
          </CardContent>
        </Card>


        {/* Quick Links */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">Quick access to other pages:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rules">
              <Button variant="outline" className="w-full sm:w-auto">
                View Competition Rules
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-lg font-semibold text-accent mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              If you have any questions about your registration or audition status, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:info@npanashik.com" className="text-primary hover:text-primary/80 text-sm sm:text-base">
                📧 info@npanashik.com
              </a>
              <a href="tel:+919876543210" className="text-primary hover:text-primary/80 text-sm sm:text-base">
                📞 +91 98765 43210
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Status;