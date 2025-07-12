import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Video, Award, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Rules = () => {
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
            Competition Rules & Guidelines
          </h1>
          <p className="text-muted-foreground">Please read all rules carefully before registering</p>
        </div>

        {/* General Rules */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              General Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Open to all age groups from 7 to 17 years as of August 15, 2024</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Registration fee of ₹500 is non-refundable</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Each participant can register in only one category</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>All performances must be original choreography or proper attribution required</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Decision of judges will be final and binding</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>NPA Nashik reserves the right to use performance videos for promotional purposes</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Audition 2 Fees */}
        <Card className="mb-8 shadow-lg border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Audition 2: In-Person Round Fees
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-6 border-2 border-primary/20 rounded-lg bg-primary/5">
                <Badge className="bg-primary text-primary-foreground mb-3 text-lg px-4 py-2">Solo</Badge>
                <p className="text-3xl font-bold text-primary">₹500</p>
                <p className="text-sm text-muted-foreground mt-2">Individual performance</p>
              </div>
              <div className="text-center p-6 border-2 border-secondary/20 rounded-lg bg-secondary/5">
                <Badge className="bg-secondary text-secondary-foreground mb-3 text-lg px-4 py-2">Duet</Badge>
                <p className="text-3xl font-bold text-secondary">₹800</p>
                <p className="text-sm text-muted-foreground mt-2">Two participants</p>
              </div>
              <div className="text-center p-6 border-2 border-accent/20 rounded-lg bg-accent/5">
                <Badge className="bg-accent text-accent-foreground mb-3 text-lg px-4 py-2">Group</Badge>
                <p className="text-3xl font-bold text-accent">₹2,000</p>
                <p className="text-sm text-muted-foreground mt-2">4-12 participants</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> These fees are applicable only for participants who qualify for Audition 2 (In-Person Round)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Age Groups */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-100 to-orange-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Age Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border-2 border-primary/20 rounded-lg">
                <Badge className="bg-primary text-primary-foreground mb-2">Junior</Badge>
                <p className="font-semibold">7 - 9 Years</p>
                <p className="text-sm text-muted-foreground">Born between 2015-2017</p>
              </div>
              <div className="text-center p-4 border-2 border-secondary/20 rounded-lg">
                <Badge className="bg-secondary text-secondary-foreground mb-2">Sub-Junior</Badge>
                <p className="font-semibold">9 - 12 Years</p>
                <p className="text-sm text-muted-foreground">Born between 2012-2015</p>
              </div>
              <div className="text-center p-4 border-2 border-accent/20 rounded-lg">
                <Badge className="bg-accent text-accent-foreground mb-2">Senior</Badge>
                <p className="font-semibold">12 - 17 Years</p>
                <p className="text-sm text-muted-foreground">Born between 2007-2012</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <CardTitle className="text-2xl text-accent">Performance Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Dance Types</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">Solo</Badge>
                    Individual performance
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">Duo</Badge>
                    Two participants
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">Group</Badge>
                    4-12 participants
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-3">Themes</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">Naya Bharat</Badge>
                    Modern India
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">Mythology</Badge>
                    Traditional stories
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent mb-3">Dance Styles</h3>
                <ul className="space-y-2">
                  <li><Badge variant="outline">Western Freestyle</Badge></li>
                  <li><Badge variant="outline">Classical</Badge></li>
                  <li><Badge variant="outline">Folk</Badge></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Guidelines */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-100 to-orange-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Video className="w-6 h-6 mr-2" />
              Video Submission Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Technical Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 mr-2 mt-1 text-primary" />
                    <span>Duration: 60-90 seconds maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Format: MP4 only</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Maximum file size: 100MB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Resolution: Minimum 720p (HD)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Clear audio with music</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-3">Content Guidelines</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Good lighting and clear visibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Full body visible throughout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Appropriate costume and music</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>No explicit or inappropriate content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Original choreography preferred</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Judging Criteria */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Judging Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-primary">
                  <h4 className="font-semibold text-primary">Technique (25%)</h4>
                  <p className="text-sm text-muted-foreground">Execution, precision, and skill level</p>
                </div>
                <div className="p-4 border-l-4 border-secondary">
                  <h4 className="font-semibold text-secondary">Creativity (25%)</h4>
                  <p className="text-sm text-muted-foreground">Originality and innovation in choreography</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-accent">
                  <h4 className="font-semibold text-accent">Expression (25%)</h4>
                  <p className="text-sm text-muted-foreground">Emotion, storytelling, and stage presence</p>
                </div>
                <div className="p-4 border-l-4 border-primary">
                  <h4 className="font-semibold text-primary">Theme Relevance (25%)</h4>
                  <p className="text-sm text-muted-foreground">Adherence to chosen theme and category</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Point System */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Point System for School Trophy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left p-3 font-semibold text-primary">Category</th>
                    <th className="text-center p-3 font-semibold text-primary">1st Place</th>
                    <th className="text-center p-3 font-semibold text-secondary">2nd Place</th>
                    <th className="text-center p-3 font-semibold text-accent">3rd Place</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-medium">Solo</td>
                    <td className="text-center p-3">
                      <Badge className="bg-primary text-primary-foreground">10 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-secondary text-secondary-foreground">5 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-accent text-accent-foreground">3 Points</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-medium">Duet</td>
                    <td className="text-center p-3">
                      <Badge className="bg-primary text-primary-foreground">20 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-secondary text-secondary-foreground">15 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-accent text-accent-foreground">10 Points</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Group</td>
                    <td className="text-center p-3">
                      <Badge className="bg-primary text-primary-foreground">40 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-secondary text-secondary-foreground">30 Points</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge className="bg-accent text-accent-foreground">20 Points</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100">
            <CardTitle className="text-2xl text-accent flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Time Slots (Per Round)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left p-3 font-semibold text-primary">Category</th>
                    <th className="text-center p-3 font-semibold text-primary">Audition 1</th>
                    <th className="text-center p-3 font-semibold text-secondary">Audition 2</th>
                    <th className="text-center p-3 font-semibold text-accent">Final</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-medium">Solo</td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-primary text-primary">1:30 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-secondary text-secondary">2 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-accent text-accent">2 mins</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-medium">Duet</td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-primary text-primary">2:30 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-secondary text-secondary">3 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-accent text-accent">3 mins</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Group</td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-primary text-primary">3:20 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-secondary text-secondary">4 mins</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="border-accent text-accent">4 mins</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Competition Timeline */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-100 to-orange-100">
            <CardTitle className="text-2xl text-accent">Competition Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 border-l-4 border-primary bg-primary/5">
                <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-primary">Registration Phase</h4>
                  <p className="text-sm text-muted-foreground">Until August 10, 2024 - Submit videos and complete payment</p>
                </div>
              </div>
              <div className="flex items-center p-4 border-l-4 border-secondary bg-secondary/5">
                <div className="w-3 h-3 bg-secondary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-secondary">Audition Round 1</h4>
                  <p className="text-sm text-muted-foreground">August 11-12, 2024 - Video review and selection</p>
                </div>
              </div>
              <div className="flex items-center p-4 border-l-4 border-accent bg-accent/5">
                <div className="w-3 h-3 bg-accent rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-accent">Audition Round 2 (In-Person)</h4>
                  <p className="text-sm text-muted-foreground">Live audition round for selected participants</p>
                </div>
              </div>
              <div className="flex items-center p-4 border-l-4 border-primary bg-primary/5">
                <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-primary">Final Performance</h4>
                  <p className="text-sm text-muted-foreground">August 15, 2024 - Live performance at NPA Nashik</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100">
            <CardTitle className="text-2xl text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>No refunds:</strong> Registration fees are non-refundable under any circumstances</span>
              </p>
              <p className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>Age verification:</strong> Valid age proof required during final performance</span>
              </p>
              <p className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>Video quality:</strong> Poor quality videos may be disqualified</span>
              </p>
              <p className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>Deadline:</strong> Late submissions will not be accepted</span>
              </p>
              <p className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>Conduct:</strong> Inappropriate behavior may lead to disqualification</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about the rules? Contact us:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:info@npanashik.com" className="text-primary hover:text-primary/80">
              📧 info@npanashik.com
            </a>
            <a href="tel:+919876543210" className="text-primary hover:text-primary/80">
              📞 +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;