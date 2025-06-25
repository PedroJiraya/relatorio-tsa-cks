
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Eye, Upload, X, Calendar, Clock, Users, MapPin, Plus, Trash2 } from 'lucide-react';
import { ReportData, Activity } from '@/types/report';
import MultiImageUpload from '@/components/MultiImageUpload';

interface ReportFormProps {
  data: ReportData;
  onChange: (data: Partial<ReportData>) => void;
  onPreview: () => void;
}

const ReportForm = ({ data, onChange, onPreview }: ReportFormProps) => {
  const [newComponentName, setNewComponentName] = useState('');

  const defaultComponents = [
    {
      id: 'despacho',
      title: 'DESPACHO',
      tasks: [
        'Verificado conectores do Swith.',
        'Verificado conector de alimentação do PTX e Cabo da antena GPS.'
      ]
    },
    {
      id: 'optalert',
      title: 'OPTALERT',
      tasks: [
        'Avaliado: tablet, doc station, trava cabos e conectores.',
        'Verificado: alimentação e cabo de rede.'
      ]
    },
    {
      id: 'cftv',
      title: 'CFTV',
      tasks: [
        'Verificado e realizado limpeza das câmeras: traseira, frontal, esquerda e direta.',
        'Verificado tela plus see.'
      ]
    },
    {
      id: 'cas',
      title: 'CAS',
      tasks: [
        'Avaliado IVU, Conectores dos cabos Wi-fi, GPS, V2V e Cabo da tela do CAS.',
        'Avaliado antenas (gps, wifi e v2v) do mastro e conectores e feito teste',
        'Verificado conector de 24 pinos.',
      ]
    },
    {
      id: 'mems',
      title: 'MEMS',
      tasks: [
        'Avaliado as antenas',
        'Realizado teste nos cabos A e B.',
        'Verificado as conexões Serial, Alimentação e Rede.',
        'Limpeza do Módulo.'
      ]
    }
  ];

  const handleActivityChange = (activityId: string, field: string, value: any) => {
    const updatedActivities = data.activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, [field]: value }
        : activity
    );
    onChange({ activities: updatedActivities });
  };

  const handleTaskChange = (activityId: string, taskIndex: number, value: string) => {
    const updatedActivities = data.activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            tasks: activity.tasks.map((task, index) => 
              index === taskIndex ? value : task
            )
          }
        : activity
    );
    onChange({ activities: updatedActivities });
  };

  const addTask = (activityId: string) => {
    const updatedActivities = data.activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, tasks: [...activity.tasks, ''] }
        : activity
    );
    onChange({ activities: updatedActivities });
  };

  const removeTask = (activityId: string, taskIndex: number) => {
    const updatedActivities = data.activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            tasks: activity.tasks.filter((_, index) => index !== taskIndex)
          }
        : activity
    );
    onChange({ activities: updatedActivities });
  };

  const addDefaultComponent = (defaultComponent: any) => {
    // Verificar se o componente já existe
    const exists = data.activities.some(activity => activity.id === defaultComponent.id);
    if (exists) return;

    const newActivity: Activity = {
      id: defaultComponent.id,
      title: defaultComponent.title,
      tasks: [...defaultComponent.tasks],
      beforeImages: [],
      afterImages: []
    };
    
    onChange({ activities: [...data.activities, newActivity] });
  };

  const addComponent = () => {
    if (!newComponentName.trim()) return;
    
    const newActivity: Activity = {
      id: newComponentName.toLowerCase().replace(/\s+/g, '-'),
      title: newComponentName.toUpperCase(),
      tasks: [''],
      beforeImages: [],
      afterImages: []
    };
    
    onChange({ activities: [...data.activities, newActivity] });
    setNewComponentName('');
  };

  const removeComponent = (activityId: string) => {
    const updatedActivities = data.activities.filter(activity => activity.id !== activityId);
    onChange({ activities: updatedActivities });
  };

  return (
    <div className="space-y-8">
      {/* Informações Básicas */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Informações Básicas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="company" className="flex items-center space-x-2 mb-2">
                <span>Empresa</span>
              </Label>
              <Input
                id="company"
                value={data.company}
                onChange={(e) => onChange({ company: e.target.value })}
                placeholder="Ex: TSA"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="date" className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Data</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={data.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span>Local</span>
              </Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="Ex: Oficina N5"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="technicians" className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4" />
                <span>Técnicos Executantes</span>
              </Label>
              <Input
                id="technicians"
                value={data.technicians}
                onChange={(e) => onChange({ technicians: e.target.value })}
                placeholder="Ex: Pedro Pinheiro, Claudiomar Sousa"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="team">Turma</Label>
              <Input
                id="team"
                value={data.team}
                onChange={(e) => onChange({ team: e.target.value })}
                placeholder="Ex: C"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="tague">TAG</Label>
              <Input
                id="tague"
                value={data.tague}
                onChange={(e) => onChange({ tague: e.target.value })}
                placeholder="Ex: CM 5226"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="om">OM</Label>
              <Input
                id="om"
                value={data.om}
                onChange={(e) => onChange({ om: e.target.value })}
                placeholder="Ex: 202503360323"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="startTime" className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4" />
                <span>Horário Início</span>
              </Label>
              <Input
                id="startTime"
                type="time"
                value={data.startTime}
                onChange={(e) => onChange({ startTime: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="endTime" className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4" />
                <span>Horário Término</span>
              </Label>
              <Input
                id="endTime"
                type="time"
                value={data.endTime}
                onChange={(e) => onChange({ endTime: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Componentes Padrão */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Componentes Padrão</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {defaultComponents.map((component) => {
              const isAdded = data.activities.some(activity => activity.id === component.id);
              return (
                <Button
                  key={component.id}
                  onClick={() => addDefaultComponent(component)}
                  disabled={isAdded}
                  variant={isAdded ? "secondary" : "outline"}
                  className={`text-sm ${isAdded ? 'opacity-50' : 'hover:bg-green-50'}`}
                >
                  {component.title}
                  {isAdded && <X className="h-3 w-3 ml-1" />}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de Componentes Customizados */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Componente Personalizado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-2 mb-4">
            <Input
              value={newComponentName}
              onChange={(e) => setNewComponentName(e.target.value)}
              placeholder="Nome do novo componente personalizado"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addComponent()}
            />
            <Button 
              onClick={addComponent}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
          
          {data.activities.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Componentes Adicionados:
              </Label>
              <div className="flex flex-wrap gap-2">
                {data.activities.map((activity) => (
                  <Badge 
                    key={activity.id}
                    variant="outline" 
                    className="flex items-center space-x-2 px-3 py-1"
                  >
                    <span>{activity.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComponent(activity.id)}
                      className="h-4 w-4 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Atividades */}
      {data.activities.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Upload className="h-6 w-6" />
            <span>Atividades Realizadas</span>
          </h2>
          
          {data.activities.map((activity) => (
            <Card key={activity.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{activity.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent(activity.id)}
                    className="text-white hover:text-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Tarefas Realizadas
                    </Label>
                    <div className="space-y-2">
                      {activity.tasks.map((task, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={task}
                            onChange={(e) => handleTaskChange(activity.id, index, e.target.value)}
                            placeholder="Descreva a tarefa realizada..."
                            className="flex-1 border-gray-200 focus:border-blue-500"
                          />
                          {activity.tasks.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeTask(activity.id, index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addTask(activity.id)}
                        className="mt-2"
                      >
                        + Adicionar Tarefa
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Fotos - Antes
                      </Label>
                      <MultiImageUpload
                        images={activity.beforeImages}
                        onImagesChange={(images) => handleActivityChange(activity.id, 'beforeImages', images)}
                        placeholder="Carregar fotos do antes"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Fotos - Depois
                      </Label>
                      <MultiImageUpload
                        images={activity.afterImages}
                        onImagesChange={(images) => handleActivityChange(activity.id, 'afterImages', images)}
                        placeholder="Carregar fotos do depois"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Manutenção Corretiva */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
          <CardTitle>Manutenção Corretiva</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasCorrective"
                checked={data.hasCorrective}
                onCheckedChange={(checked) => onChange({ hasCorrective: !!checked })}
              />
              <Label htmlFor="hasCorrective" className="text-sm font-medium">
                Foi necessária manutenção corretiva?
              </Label>
            </div>
            
            {data.hasCorrective && (
              <div className="space-y-6 mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="component">Componente Substituído</Label>
                    <Input
                      id="component"
                      value={data.correctiveDetails.component}
                      onChange={(e) => onChange({ 
                        correctiveDetails: { 
                          ...data.correctiveDetails, 
                          component: e.target.value 
                        }
                      })}
                      placeholder="Ex: Antena MEMS – Lado B"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cause">Causa do Problema</Label>
                    <Textarea
                      id="cause"
                      value={data.correctiveDetails.cause}
                      onChange={(e) => onChange({ 
                        correctiveDetails: { 
                          ...data.correctiveDetails, 
                          cause: e.target.value 
                        }
                      })}
                      placeholder="Ex: Oxidação no conector"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="solution">Solução Aplicada</Label>
                    <Textarea
                      id="solution"
                      value={data.correctiveDetails.solution}
                      onChange={(e) => onChange({ 
                        correctiveDetails: { 
                          ...data.correctiveDetails, 
                          solution: e.target.value 
                        }
                      })}
                      placeholder="Ex: Substituição da peça"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Fotos da Manutenção Corretiva */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Fotos - Antes da Correção
                    </Label>
                    <MultiImageUpload
                      images={data.correctiveDetails.beforeImages}
                      onImagesChange={(images) => onChange({ 
                        correctiveDetails: { 
                          ...data.correctiveDetails, 
                          beforeImages: images 
                        }
                      })}
                      placeholder="Carregar fotos do problema"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Fotos - Depois da Correção
                    </Label>
                    <MultiImageUpload
                      images={data.correctiveDetails.afterImages}
                      onImagesChange={(images) => onChange({ 
                        correctiveDetails: { 
                          ...data.correctiveDetails, 
                          afterImages: images 
                        }
                      })}
                      placeholder="Carregar fotos da solução"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botão de Preview */}
      <div className="flex justify-center">
        <Button
          onClick={onPreview}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Eye className="h-5 w-5 mr-2" />
          Visualizar Relatório
        </Button>
      </div>
    </div>
  );
};

export default ReportForm;
