import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Check, X } from 'lucide-react';
import { ReportData } from '@/types/report';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ImageViewer from '@/components/ImageViewer';

interface ReportPreviewProps {
  data: ReportData;
  onBack: () => void;
}

const ReportPreview = ({ data, onBack }: ReportPreviewProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) return;

    try {
      toast.info('Gerando PDF... Aguarde um momento.');
      
      const canvas = await html2canvas(reportRef.current, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        width: reportRef.current.scrollWidth,
        height: reportRef.current.scrollHeight
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `relatorio_manutencao_${data.date}_${data.location.replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);
      
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Formulário</span>
        </Button>
        
        <Button
          onClick={generatePDF}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Baixar PDF</span>
        </Button>
      </div>

      {/* Preview do Relatório */}
      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center border-b-2 border-blue-600 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RELATÓRIO DE MANUTENÇÃO PREVENTIVA
          </h1>
          <h2 className="text-xl text-blue-600 font-semibold">AUTOMAÇÃO</h2>
          <div className="mt-4 flex justify-center space-x-8 text-sm text-gray-600">
            <span><strong>Empresa:</strong> {data.company}</span>
            <span><strong>Data:</strong> {formatDate(data.date)}</span>
            <span><strong>Local:</strong> {data.location}</span>
          </div>
        </div>

        {/* Dados Técnicos */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
            DADOS TÉCNICOS
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Técnicos Executantes:</strong> {data.technicians}
            </div>
            <div>
              <strong>Turma:</strong> {data.team}
            </div>
            <div>
              <strong>TAGUE:</strong> {data.tague}
            </div>
            <div>
              <strong>OM:</strong> {data.om}
            </div>
            <div>
              <strong>Horário:</strong> Início: {data.startTime} | Término: {data.endTime}
            </div>
          </div>
        </div>

        {/* Atividades Realizadas */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
            ATIVIDADES REALIZADAS
          </h3>
          
          {data.activities.map((activity) => (
            <div key={activity.id} className="mb-6 border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-bold text-blue-600 mb-3">{activity.title}</h4>
              
              <div className="mb-4">
                <strong className="text-sm text-gray-700">Tarefas:</strong>
                <ul className="mt-2 space-y-1">
                  {activity.tasks.filter(task => task.trim()).map((task, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(activity.beforeImages.length > 0 || activity.afterImages.length > 0) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong className="text-sm text-gray-700 block mb-2">Antes:</strong>
                    {activity.beforeImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {activity.beforeImages.map((image, index) => (
                          <ImageViewer
                            key={index}
                            src={image}
                            alt={`Antes ${index + 1}`}
                            className="w-full h-24 object-cover border rounded"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-400 text-xs">
                        Nenhuma imagem
                      </div>
                    )}
                  </div>
                  <div>
                    <strong className="text-sm text-gray-700 block mb-2">Depois:</strong>
                    {activity.afterImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {activity.afterImages.map((image, index) => (
                          <ImageViewer
                            key={index}
                            src={image}
                            alt={`Depois ${index + 1}`}
                            className="w-full h-24 object-cover border rounded"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-400 text-xs">
                        Nenhuma imagem
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Manutenção Corretiva */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
            MANUTENÇÃO CORRETIVA
          </h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <strong>Houve necessidade de manutenção corretiva?</strong>
            {data.hasCorrective ? (
              <Badge className="bg-red-100 text-red-800">Sim</Badge>
            ) : (
              <Badge className="bg-green-100 text-green-800">Não</Badge>
            )}
          </div>

          {data.hasCorrective && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
              <div>
                <strong>Componente Substituído:</strong> {data.correctiveDetails.component}
              </div>
              <div>
                <strong>Causa:</strong> {data.correctiveDetails.cause}
              </div>
              <div>
                <strong>Solução:</strong> {data.correctiveDetails.solution}
              </div>

              {/* Fotos da Manutenção Corretiva */}
              {(data.correctiveDetails.beforeImages.length > 0 || data.correctiveDetails.afterImages.length > 0) && (
                <div className="mt-4">
                  <strong className="text-sm text-gray-700 block mb-3">Evidências Fotográficas:</strong>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-sm text-gray-700 block mb-2">Antes da Correção:</strong>
                      {data.correctiveDetails.beforeImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {data.correctiveDetails.beforeImages.map((image, index) => (
                            <ImageViewer
                              key={index}
                              src={image}
                              alt={`Problema ${index + 1}`}
                              className="w-full h-24 object-cover border rounded"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-400 text-xs">
                          Nenhuma imagem
                        </div>
                      )}
                    </div>
                    <div>
                      <strong className="text-sm text-gray-700 block mb-2">Depois da Correção:</strong>
                      {data.correctiveDetails.afterImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {data.correctiveDetails.afterImages.map((image, index) => (
                            <ImageViewer
                              key={index}
                              src={image}
                              alt={`Solução ${index + 1}`}
                              className="w-full h-24 object-cover border rounded"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-400 text-xs">
                          Nenhuma imagem
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Assinaturas - Apenas Técnicos */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 pb-8"></div>
              <p className="text-sm font-medium">Técnico Executante 1</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 pb-8"></div>
              <p className="text-sm font-medium">Técnico Executante 2</p>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Relatório gerado automaticamente em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
