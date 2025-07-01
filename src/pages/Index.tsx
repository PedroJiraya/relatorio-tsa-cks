
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';
import ReportForm from '@/components/ReportForm';
import ReportPreview from '@/components/ReportPreview';
import { ReportData } from '@/types/report';

const Index = () => {
  const [reportData, setReportData] = useState<ReportData>({
    company: 'TSA',
    date: '',
    location: '',
    technicians: '',
    team: '',
    tague: '',
    om: '',
    startTime: '',
    endTime: '',
    activities: [],
    hasCorrective: false,
    correctiveDetails: {
      component: '',
      cause: '',
      solution: '',
      beforeImages: [],
      afterImages: []
    }
  });

  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');

  const handleDataChange = (newData: Partial<ReportData>) => {
    setReportData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src={`${import.meta.env.BASE_URL}lovable-uploads/a34f25bd-2b0d-4e89-83b3-be27078c393d.png`}
                  alt="Logo TSA" 
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gerador de Relatórios de Manutenção
                </h1>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant={currentView === 'form' ? 'default' : 'outline'}
                onClick={() => setCurrentView('form')}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Formulário</span>
              </Button>
              <Button
                variant={currentView === 'preview' ? 'default' : 'outline'}
                onClick={() => setCurrentView('preview')}
                className="flex items-center space-x-2"
              >
                <Camera className="h-4 w-4" />
                <span>Preview</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'form' ? (
          <ReportForm 
            data={reportData} 
            onChange={handleDataChange}
            onPreview={() => setCurrentView('preview')}
          />
        ) : (
          <ReportPreview 
            data={reportData}
            onBack={() => setCurrentView('form')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
