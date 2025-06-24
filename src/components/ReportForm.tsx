
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Eye, Upload, X, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { ReportData, Activity } from '@/types/report';
import MultiImageUpload from '@/components/MultiImageUpload';

interface ReportFormProps {
  data: ReportData;
  onChange: (data: Partial<ReportData>) => void;
  onPreview: () => void;
}

const ReportForm = ({ data, onChange, onPreview }: ReportFormProps) => {
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
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="technicians" className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4" />
                <span>Técnicos Responsáveis</span>
              </Label>
              <Input
                id="technicians"
                value={data.technicians}
                onChange={(e) => onChange({ technicians: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="team">Turma</Label>
              <Input
                id="team"
                value={data.team}
                onChange={(e) => onChange({ team: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="tague">TAGUE</Label>
              <Input
                id="tague"
                value={data.tague}
                onChange={(e) => onChange({ tague: e.target.value })}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="om">OM</Label>
              <Input
                id="om"
                value={data.om}
                onChange={(e) => onChange({ om: e.target.value })}
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

      {/* Atividades */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Upload className="h-6 w-6" />
          <span>Atividades Realizadas</span>
        </h2>
        
        {data.activities.map((activity) => (
          <Card key={activity.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">{activity.title}</CardTitle>
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
              <div className="grid grid-cols-1 gap-4 mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
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
