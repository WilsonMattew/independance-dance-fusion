import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Calendar, User, Mail, Phone, Loader } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const StatusDetails = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadRegistration();
    }
  }, [id]);

  const loadRegistration = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Registration Not Found",
            description: "No registration found with this ID.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setRegistration(null);
      } else {
        setRegistration(data);
      }
    } catch (error) {
      console.error('Error loading registration:', error);
      toast({
        title: "Error",
        description: "An error occurred while loading registration details.",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading registration details...</p>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Registration Not Found</h1>
          <p className="text-gray-600 mb-8">The registration ID you're looking for doesn't exist or has been removed.</p>
          <div className="space-y-4">
            <Link to="/status">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Search Again
              </Button>
            </Link>
            <br />
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/status" className="inline-flex items-center text-accent hover:text-primary mb-4 transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            Audition Status
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Registration ID: {registration.id}</p>
        </div>

        {/* Registration Details */}
        <Card className="shadow-lg mb-6 sm:mb-8">
          <CardHeader className="bg-gradient-to-r from-green-100 to-orange-100 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl text-accent">
              Registration Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p><strong>Name:</strong> {registration.name}</p>
                  <p><strong>Age:</strong> {registration.age} years</p>
                  <p><strong>Gender:</strong> {registration.gender}</p>
                  <p className="flex items-center flex-wrap">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="break-all">{registration.email}</span>
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
                <div className="space-y-2 text-sm sm:text-base">
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
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {registration.group_members.map((member: string, index: number) => (
                          <li key={index} className="text-sm">{member}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Audition Status - Prominent Display */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg border-2 border-dashed border-primary/20 bg-gradient-to-r from-orange-50 to-green-50">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-4">Audition Status</h3>
              <div className="text-center">
                <Badge className={`text-base sm:text-lg px-4 py-2 ${getStatusColor(registration.audition_status)}`}>
                  {getStatusText(registration.audition_status)}
                </Badge>
                {registration.admin_notes && (
                  <div className="mt-4 p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-accent mb-2">Admin Notes:</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">{registration.admin_notes}</p>
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/status">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Search Another Registration
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Contact Information */}
        <Card className="mt-6 sm:mt-8 shadow-lg">
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

export default StatusDetails;