import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, LogOut, Eye, Check, X, Filter, Search, User, Mail, Phone, Calendar, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filters, setFilters] = useState({
    danceType: '',
    ageGroup: '',
    theme: '',
    category: '',
    status: '',
    search: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadRegistrations();
    }
  }, [isAdmin]);

  useEffect(() => {
    applyFilters();
  }, [registrations, filters]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      await checkAdminStatus(session.user.id);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      setIsAdmin(true);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      setUser(data.user);
      await checkAdminStatus(data.user.id);
      
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };

  const loadRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast({
        title: "Error",
        description: "Failed to load registrations.",
        variant: "destructive",
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...registrations];

    if (filters.danceType) {
      filtered = filtered.filter(reg => reg.dance_type === filters.danceType);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(reg => reg.age_group === filters.ageGroup);
    }
    if (filters.theme) {
      filtered = filtered.filter(reg => reg.theme === filters.theme);
    }
    if (filters.category) {
      filtered = filtered.filter(reg => reg.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter(reg => reg.audition_status === filters.status);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm) ||
        reg.email.toLowerCase().includes(searchTerm) ||
        reg.mobile.includes(searchTerm)
      );
    }

    setFilteredRegistrations(filtered);
  };

  const updateRegistrationStatus = async (registrationId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({
          audition_status: status,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Registration ${status} successfully!`,
      });

      loadRegistrations();
      setSelectedRegistration(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update registration status.",
        variant: "destructive",
      });
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

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <CardTitle className="text-2xl text-accent text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@npanashik.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <Button 
                onClick={login} 
                disabled={loading || !email || !password}
                className="w-full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">Manage IndepeDANCE registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <Label>Search</Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Name, email, mobile..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Dance Type</Label>
                <Select value={filters.danceType} onValueChange={(value) => setFilters(prev => ({ ...prev, danceType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Age Group</Label>
                <Select value={filters.ageGroup} onValueChange={(value) => setFilters(prev => ({ ...prev, ageGroup: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="7-9">7-9 Years</SelectItem>
                    <SelectItem value="9-12">9-12 Years</SelectItem>
                    <SelectItem value="12-17">12-17 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Theme</Label>
                <Select value={filters.theme} onValueChange={(value) => setFilters(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="Naya Bharat">Naya Bharat</SelectItem>
                    <SelectItem value="Mythology">Mythology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="Western Freestyle">Western Freestyle</SelectItem>
                    <SelectItem value="Classical">Classical</SelectItem>
                    <SelectItem value="Folk">Folk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{registrations.length}</div>
              <div className="text-sm text-muted-foreground">Total Registrations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {registrations.filter(r => r.audition_status === 'under_review').length}
              </div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {registrations.filter(r => r.audition_status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">
                {registrations.filter(r => r.audition_status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{registration.name}</div>
                          <div className="text-sm text-muted-foreground">{registration.email}</div>
                          <div className="text-sm text-muted-foreground">{registration.mobile}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline">{registration.dance_type}</Badge>
                          <div className="text-sm">{registration.age_group} | {registration.theme}</div>
                          <div className="text-sm text-muted-foreground">{registration.category}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(registration.audition_status)}>
                          {registration.audition_status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(registration.created_at).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => setSelectedRegistration(registration)}
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Registration Detail Modal */}
        {selectedRegistration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Registration Details
                  <Button onClick={() => setSelectedRegistration(null)} variant="outline" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedRegistration.name}</p>
                      <p><strong>Age:</strong> {selectedRegistration.age} years</p>
                      <p><strong>Gender:</strong> {selectedRegistration.gender}</p>
                      <p><strong>Address:</strong> {selectedRegistration.address}</p>
                      <p className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {selectedRegistration.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {selectedRegistration.mobile}
                      </p>
                      {selectedRegistration.alternate_mobile && (
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {selectedRegistration.alternate_mobile} (Alt)
                        </p>
                      )}
                      <p><strong>School/College:</strong> {selectedRegistration.school_college}</p>
                      <p><strong>Teacher:</strong> {selectedRegistration.teacher_name}</p>
                    </div>
                  </div>

                  {/* Competition Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Competition Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dance Type:</strong> <Badge>{selectedRegistration.dance_type}</Badge></p>
                      <p><strong>Age Group:</strong> <Badge>{selectedRegistration.age_group}</Badge></p>
                      <p><strong>Theme:</strong> <Badge>{selectedRegistration.theme}</Badge></p>
                      <p><strong>Category:</strong> <Badge>{selectedRegistration.category}</Badge></p>
                      {selectedRegistration.participant1_name && (
                        <p><strong>Participant 1:</strong> {selectedRegistration.participant1_name}</p>
                      )}
                      {selectedRegistration.participant2_name && (
                        <p><strong>Participant 2:</strong> {selectedRegistration.participant2_name}</p>
                      )}
                      {selectedRegistration.group_members && (
                        <div>
                          <strong>Group Members:</strong>
                          <ul className="list-disc list-inside ml-4">
                            {selectedRegistration.group_members.map((member: string, index: number) => (
                              <li key={index}>{member}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video */}
                {selectedRegistration.video_url && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Video className="w-5 h-5 mr-2" />
                      Audition Video
                    </h3>
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                      <video
                        controls
                        className="w-full h-full object-contain"
                        src={selectedRegistration.video_url}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div className="mt-6">
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this registration..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-4 justify-end">
                  <Button
                    onClick={() => updateRegistrationStatus(selectedRegistration.id, 'rejected')}
                    variant="destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => updateRegistrationStatus(selectedRegistration.id, 'approved')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;