
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Video, Upload, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryVideoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CategoryVideoStep = ({ formData, updateFormData, onNext, onPrev }: CategoryVideoStepProps) => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'link'>('link');
  const [uploading, setUploading] = useState(false);

  const ageGroups = ['7-9', '9-12', '12-17'];
  const themes = ['Naya Bharat', 'Mythology'];
  const categories = ['Western Freestyle', 'Classical', 'Folk'];

  const addGroupMember = () => {
    const newMembers = [...formData.groupMembers, ''];
    updateFormData({ groupMembers: newMembers });
  };

  const removeGroupMember = (index: number) => {
    const newMembers = formData.groupMembers.filter((_: any, i: number) => i !== index);
    updateFormData({ groupMembers: newMembers });
  };

  const updateGroupMember = (index: number, value: string) => {
    const newMembers = [...formData.groupMembers];
    newMembers[index] = value;
    updateFormData({ groupMembers: newMembers });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.includes('video/mp4')) {
      alert('Please upload only MP4 video files');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      alert('Video file must be under 100MB');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('video', file);
      
      // Note: This would typically upload to your server
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUrl = `https://example.com/videos/${Date.now()}_${file.name}`;
      updateFormData({ videoUrl: mockUrl });
      
      alert('Video uploaded successfully!');
    } catch (error) {
      alert('Video upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.danceType || !formData.ageGroup || !formData.theme || 
        !formData.category || !formData.videoUrl) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.danceType === 'duo' && (!formData.participant1Name || !formData.participant2Name)) {
      alert('Please enter names for both participants');
      return;
    }

    if (formData.danceType === 'group' && formData.groupMembers.filter((name: string) => name.trim()).length < 4) {
      alert('Group must have at least 4 members');
      return;
    }
    
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dance Type Selection */}
      <Card className="border-orange-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Dance Type</h3>
          <RadioGroup 
            value={formData.danceType} 
            onValueChange={(value) => updateFormData({ danceType: value })}
            className="grid md:grid-cols-3 gap-4"
          >
            {['solo', 'duo', 'group'].map((type) => (
              <div key={type} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize font-medium cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Category Details */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ageGroup" className="text-sm font-medium text-gray-700">
                Age Group *
              </Label>
              <Select value={formData.ageGroup} onValueChange={(value) => updateFormData({ ageGroup: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group} value={group}>{group} years</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme" className="text-sm font-medium text-gray-700">
                Theme *
              </Label>
              <Select value={formData.theme} onValueChange={(value) => updateFormData({ theme: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participant Details */}
      {formData.danceType === 'duo' && (
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Participant Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participant1" className="text-sm font-medium text-gray-700">
                  Participant 1 Name *
                </Label>
                <Input
                  id="participant1"
                  type="text"
                  value={formData.participant1Name}
                  onChange={(e) => updateFormData({ participant1Name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter first participant's name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="participant2" className="text-sm font-medium text-gray-700">
                  Participant 2 Name *
                </Label>
                <Input
                  id="participant2"
                  type="text"
                  value={formData.participant2Name}
                  onChange={(e) => updateFormData({ participant2Name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter second participant's name"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {formData.danceType === 'group' && (
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Group Members</h3>
              <Badge variant="secondary">
                {formData.groupMembers.filter((name: string) => name.trim()).length} / 12 members
              </Badge>
            </div>
            
            <div className="space-y-3">
              {formData.groupMembers.map((member: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    type="text"
                    value={member}
                    onChange={(e) => updateGroupMember(index, e.target.value)}
                    placeholder={`Member ${index + 1} name`}
                    className="flex-1"
                  />
                  {formData.groupMembers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGroupMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {formData.groupMembers.length < 12 && (
              <Button
                type="button"
                variant="outline"
                onClick={addGroupMember}
                className="mt-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            )}
            
            <p className="text-sm text-gray-600 mt-2">
              Minimum 4 members required, maximum 12 members allowed
            </p>
          </CardContent>
        </Card>
      )}

      {/* Video Upload/Link */}
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Video className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Audition Video</h3>
          </div>
          
          <div className="mb-4">
            <RadioGroup 
              value={uploadMethod} 
              onValueChange={(value: 'upload' | 'link') => setUploadMethod(value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="link" id="link" />
                <Label htmlFor="link" className="flex items-center cursor-pointer">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  Video Link
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload" className="flex items-center cursor-pointer">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload Video
                </Label>
              </div>
            </RadioGroup>
          </div>

          {uploadMethod === 'link' ? (
            <div>
              <Label htmlFor="videoLink" className="text-sm font-medium text-gray-700">
                Video URL *
              </Label>
              <Input
                id="videoLink"
                type="url"
                value={formData.videoUrl}
                onChange={(e) => updateFormData({ videoUrl: e.target.value })}
                className="mt-1"
                placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                You can use YouTube, Google Drive, or any public video link
              </p>
            </div>
          ) : (
            <div>
              <Label htmlFor="videoFile" className="text-sm font-medium text-gray-700">
                Upload Video File *
              </Label>
              <Input
                id="videoFile"
                type="file"
                accept="video/mp4"
                onChange={handleVideoUpload}
                className="mt-1"
                disabled={uploading}
              />
              <p className="text-sm text-gray-600 mt-2">
                Upload MP4 files only. Maximum size: 100MB. Duration: 1-1.5 minutes
              </p>
              {uploading && (
                <div className="mt-2 text-blue-600">
                  Uploading video... Please wait.
                </div>
              )}
              {formData.videoUrl && uploadMethod === 'upload' && (
                <div className="mt-2 text-green-600">
                  ✓ Video uploaded successfully
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          type="button"
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-8 py-3"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous Step
        </Button>
        
        <Button 
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Continue to Payment
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default CategoryVideoStep;
