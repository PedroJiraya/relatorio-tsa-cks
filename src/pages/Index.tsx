
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
    date: new Date().toISOString().split('T')[0],
    location: 'Oficina N5',
    technicians: 'Marcos Sousa, Igor Gabriel',
    team: 'C',
    tague: 'CM 5226',
    om: '202503360323',
    startTime: '11:40',
    endTime: '17:40',
    activities: [
      {
        id: 'mems',
        title: 'MEMS',
        tasks: [
          'Testes nas antenas e cabos',
          'Verificação das bases A e B',
          'Limpeza dos conectores'
        ],
        beforeImages: [],
        afterImages: []
      },
      {
        id: 'cas',
        title: 'CAS',
        tasks: [
          'Verificação do sistema',
          'Teste de funcionalidade',
          'Calibração dos parâmetros'
        ],
        beforeImages: [],
        afterImages: []
      },
      {
        id: 'despacho',
        title: 'DESPACHO',
        tasks: [
          'Verificação dos equipamentos',
          'Teste de comunicação',
          'Atualização de software'
        ],
        beforeImages: [],
        afterImages: []
      },
      {
        id: 'optlert',
        title: 'OPTLERT',
        tasks: [
          'Verificação dos sensores',
          'Teste de alertas',
          'Configuração de parâmetros'
        ],
        beforeImages: [],
        afterImages: []
      }
    ],
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gerador de Relatórios de Manutenção
                </h1>
                <p className="text-sm text-gray-600">
                  Crie relatórios profissionais de manutenção preventiva
                </p>
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
