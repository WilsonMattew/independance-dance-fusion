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
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchRegistration = async () => {
    if (!email && !mobile) {
      toast({
        title: "Search Required",
        description: "Please enter either email or mobile number to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('registrations')
        .select('*');

      if (email) {
        query = query.eq('email', email.toLowerCase());
      } else if (mobile) {
        query = query.eq('mobile', mobile);
      }

      const { data, error } = await query.single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Registration Not Found",
            description: "No registration found with the provided details. Please check your email/mobile or contact support.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setRegistration(null);
      } else {
        setRegistration(data);
        toast({
          title: "Registration Found",
          description: "Your registration details have been loaded successfully.",
        });
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-accent hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            Check Audition Status
          </h1>
          <p className="text-muted-foreground">Enter your details to check your registration and audition status</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Search Your Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
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
              disabled={loading || (!email && !mobile)}
              className="w-full md:w-auto"
            >
              {loading ? 'Searching...' : 'Search Registration'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Enter either email OR mobile number to search
            </p>
          </CardContent>
        </Card>

        {/* Registration Details */}
        {registration && (
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-orange-100">
              <CardTitle className="text-2xl text-accent">
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {registration.name}</p>
                    <p><strong>Age:</strong> {registration.age} years</p>
                    <p><strong>Gender:</strong> {registration.gender}</p>
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {registration.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {registration.mobile}
                    </p>
                    <p><strong>School/College:</strong> {registration.school_college}</p>
                  </div>
                </div>

                {/* Competition Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Competition Details
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Dance Type:</strong> <Badge variant="outline">{registration.dance_type}</Badge></p>
                    <p><strong>Age Group:</strong> <Badge variant="outline">{registration.age_group}</Badge></p>
                    <p><strong>Theme:</strong> <Badge variant="outline">{registration.theme}</Badge></p>
                    <p><strong>Category:</strong> <Badge variant="outline">{registration.category}</Badge></p>
                    {registration.participant1_name && (
                      <p><strong>Participant 1:</strong> {registration.participant1_name}</p>
                    )}
                    {registration.participant2_name && (
                      <p><strong>Participant 2:</strong> {registration.participant2_name}</p>
                    )}
                    {registration.group_members && (
                      <div>
                        <strong>Group Members:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {registration.group_members.map((member: string, index: number) => (
                            <li key={index}>{member}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Audition Status */}
              <div className="mt-8 p-6 rounded-lg border-2 border-dashed border-primary/20 bg-gradient-to-r from-orange-50 to-green-50">
                <h3 className="text-xl font-bold text-center mb-4">Audition Status</h3>
                <div className="text-center">
                  <Badge className={`text-lg px-4 py-2 ${getStatusColor(registration.audition_status)}`}>
                    {getStatusText(registration.audition_status)}
                  </Badge>
                  {registration.admin_notes && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-accent mb-2">Admin Notes:</h4>
                      <p className="text-muted-foreground">{registration.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Preview */}
              {registration.video_url && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-accent flex items-center mb-3">
                    <Eye className="w-5 h-5 mr-2" />
                    Your Audition Video
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <video
                      controls
                      className="w-full h-full object-contain"
                      src={registration.video_url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Registration Date */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Registered on: {new Date(registration.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="mt-8 shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-accent mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about your registration or audition status, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:info@npanashik.com" className="text-primary hover:text-primary/80">
                📧 info@npanashik.com
              </a>
              <a href="tel:+919876543210" className="text-primary hover:text-primary/80">
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