import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Upload, CheckCircle, AlertCircle, Video } from 'lucide-react';

const VideoUpload = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [registration, setRegistration] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('video/mp4')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only MP4 video files.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Video file must be under 100MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('video', selectedFile);

      const response = await fetch('https://nskdo.in/upload.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.status === 'success' && data.url) {
        console.log('Video uploaded successfully, updating database...');
        console.log('Registration ID:', registration.id);
        console.log('Video URL:', data.url);
        
        // Update the registration with video URL
        const { data: updateData, error } = await supabase
          .from('registrations')
          .update({ video_url: data.url })
          .eq('id', registration.id)
          .select();

        if (error) {
          console.error('Database update error:', error);
          toast({
            title: "Database Error ❌",
            description: "Failed to save video URL to database.",
            variant: "destructive",
          });
          return;
        }

        console.log('Database updated successfully:', updateData);
        
        // Update local state
        setRegistration({ ...registration, video_url: data.url });

        toast({
          title: "Video Uploaded 🎉",
          description: "Your audition video was uploaded successfully.",
          variant: "default",
        });
      } else {
        console.error('Hostinger Upload Error:', data);
        toast({
          title: "Upload Failed ❌",
          description: data.message || "Video upload failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Error ❌",
        description: "An unexpected error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const checkRegistration = async () => {
    if (!registrationId.trim()) {
      toast({
        title: "Registration ID Required",
        description: "Please enter your registration ID.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('registration_id', registrationId.trim())
        .single();

      if (error || !data) {
        toast({
          title: "Registration Not Found",
          description: "Please check your registration ID and try again.",
          variant: "destructive",
        });
        setRegistration(null);
        return;
      }

      setRegistration(data);
      
      if (data.video_url) {
        toast({
          title: "Video Already Uploaded ✅",
          description: "Your video has already been submitted successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Registration Found ✅",
          description: "You can now upload your video!",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Error checking registration:', error);
      toast({
        title: "Error",
        description: "An error occurred while checking your registration.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Video Upload Portal</h1>
          <p className="text-muted-foreground">Upload your video for the next round</p>
        </div>

        {/* Registration ID Check */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Check Registration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="registrationId">Registration ID</Label>
                <Input
                  id="registrationId"
                  type="text"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  placeholder="Enter your registration ID"
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={checkRegistration} 
                disabled={isChecking}
                className="w-full"
              >
                {isChecking ? "Checking..." : "Check Status"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registration Details & Video Upload */}
        {registration && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Registration Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Registration Info */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Participant Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-600 font-medium">Name:</span>
                      <p className="text-green-800">{registration.name}</p>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium">Category:</span>
                      <p className="text-green-800">{registration.category}</p>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium">Dance Type:</span>
                      <p className="text-green-800 capitalize">{registration.dance_type}</p>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium">Age Group:</span>
                      <p className="text-green-800">{registration.age_group}</p>
                    </div>
                  </div>
                </div>

                {/* Video Upload Section */}
                {registration.video_url ? (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-800">
                      <Video className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Video Already Uploaded</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Your video has been successfully uploaded and submitted.
                    </p>
                    <a 
                      href={registration.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm mt-2 inline-block"
                    >
                      View Uploaded Video
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center text-orange-800 mb-2">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Video Upload Required</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Please upload your performance video for the next round evaluation.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="videoUpload" className="text-lg font-semibold">
                        Select Video (MP4 only, max 100MB)
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="videoUpload"
                          type="file"
                          accept="video/mp4"
                          onChange={handleFileSelect}
                          disabled={uploading}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>
                      
                      {selectedFile && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-800">Selected File:</p>
                              <p className="text-blue-600">{selectedFile.name}</p>
                              <p className="text-xs text-blue-500">
                                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <Button 
                              onClick={handleVideoUpload} 
                              disabled={uploading}
                              className="ml-4"
                            >
                              {uploading ? (
                                <>
                                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload Video
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;