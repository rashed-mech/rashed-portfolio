import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Briefcase, GraduationCap, Plus, Edit3, Trash2, X, GripVertical } from 'lucide-react';
import { Experience, Education } from '../../../types';
import { 
  createExperienceAPI, updateExperienceAPI, deleteExperienceAPI, reorderExperiencesAPI,
  createEducationAPI, updateEducationAPI, deleteEducationAPI, reorderEducationsAPI
} from '../../../api';

interface TimelineTabProps {
  experience?: Experience[];
  education?: Education[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({
  experience = [],
  education = [],
  onRefresh,
  showToast
}) => {
  const [subTab, setSubTab] = useState<'experience' | 'education'>('experience');

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [loadingExp, setLoadingExp] = useState(false);
  const [loadingEdu, setLoadingEdu] = useState(false);

  const [expFormData, setExpFormData] = useState<Omit<Experience, 'id'>>({
    role: '', organization: '', location: '', period: '', description: '', highlights: [], current: false
  });
  const [highlightsInput, setHighlightsInput] = useState('');

  const [eduFormData, setEduFormData] = useState<Omit<Education, 'id'>>({
    degree: '', institution: '', year: '', result: '', thesis: '', advisor: ''
  });

  const onDragEndExp = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(experience);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);
    try {
      setLoadingExp(true);
      await reorderExperiencesAPI(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoadingExp(false);
    }
  };

  const onDragEndEdu = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(education);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);
    try {
      setLoadingEdu(true);
      await reorderEducationsAPI(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoadingEdu(false);
    }
  };

  const openExpCreate = () => {
    setEditingExpId(null);
    setExpFormData({ role: '', organization: '', location: '', period: '', description: '', highlights: [], current: false });
    setHighlightsInput('');
    setIsExpModalOpen(true);
  };
  const openExpEdit = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpFormData({
      role: exp.role, organization: exp.organization, location: exp.location, period: exp.period,
      description: exp.description || '', highlights: exp.highlights || [], current: exp.current || false
    });
    setHighlightsInput((exp.highlights || []).join('\n'));
    setIsExpModalOpen(true);
  };
  const handleExpDelete = async (id: string) => {
    try {
      await deleteExperienceAPI(id);
      showToast('Experience deleted');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };
  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHighlights = highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);
    const payload = { ...expFormData, highlights: parsedHighlights };
    try {
      setLoadingExp(true);
      if (editingExpId) {
        await updateExperienceAPI(editingExpId, payload);
        showToast('Experience updated');
      } else {
        await createExperienceAPI(payload);
        showToast('Experience created');
      }
      setIsExpModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Save failed', 'error');
    } finally {
      setLoadingExp(false);
    }
  };

  const openEduCreate = () => {
    setEditingEduId(null);
    setEduFormData({ degree: '', institution: '', year: '', result: '', thesis: '', advisor: '' });
    setIsEduModalOpen(true);
  };
  const openEduEdit = (edu: Education) => {
    setEditingEduId(edu.id);
    setEduFormData({
      degree: edu.degree, institution: edu.institution, year: edu.year,
      result: edu.result || '', thesis: edu.thesis || '', advisor: edu.advisor || ''
    });
    setIsEduModalOpen(true);
  };
  const handleEduDelete = async (id: string) => {
    try {
      await deleteEducationAPI(id);
      showToast('Education deleted');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };
  const handleEduSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingEdu(true);
      if (editingEduId) {
        await updateEducationAPI(editingEduId, eduFormData);
        showToast('Education updated');
      } else {
        await createEducationAPI(eduFormData);
        showToast('Education added');
      }
      setIsEduModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Save failed', 'error');
    } finally {
      setLoadingEdu(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="admin-timeline-tab">
      <div className="flex space-x-2 border-b border-slate-700 pb-2">
        <button
          onClick={() => setSubTab('experience')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all \${subTab === 'experience' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Professional Experience
        </button>
        <button
          onClick={() => setSubTab('education')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all \${subTab === 'education' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Education Background
        </button>
      </div>

      {subTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>Experience</span>
            </h2>
            <button
              onClick={openExpCreate}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
            >
              <Plus className="w-3 h-3" />
              <span>Add Role</span>
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEndExp}>
            <Droppable droppableId="exp-list">
              {(provided) => (
                <div className="space-y-3" {...provided.droppableProps} ref={provided.innerRef}>
                  {experience.map((exp, index) => (
                    <Draggable draggableId={exp.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between group"
                        >
                          <div className="flex items-start space-x-3">
                            <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    {exp.role}
                                    {exp.current && <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 uppercase">Current</span>}
                                  </h3>
                                  <p className="text-xs text-indigo-400">{exp.organization}</p>
                                  <p className="text-xs text-slate-400">{exp.period} | {exp.location}</p>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => openExpEdit(exp)} className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"><Edit3 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleExpDelete(exp.id)} className="p-1.5 rounded bg-red-900 hover:bg-red-800 text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {subTab === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Education</span>
            </h2>
            <button
              onClick={openEduCreate}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
            >
              <Plus className="w-3 h-3" />
              <span>Add Degree</span>
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEndEdu}>
            <Droppable droppableId="edu-list">
              {(provided) => (
                <div className="space-y-3" {...provided.droppableProps} ref={provided.innerRef}>
                  {education.map((edu, index) => (
                    <Draggable draggableId={edu.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between group"
                        >
                          <div className="flex items-start space-x-3">
                            <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                                  <p className="text-xs text-indigo-400">{edu.institution}</p>
                                  <p className="text-xs text-slate-400">{edu.year}</p>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => openEduEdit(edu)} className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"><Edit3 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleEduDelete(edu.id)} className="p-1.5 rounded bg-red-900 hover:bg-red-800 text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* Simplified modals to save space (since this is an admin view) */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-6 rounded-2xl max-w-lg w-full relative">
            <button onClick={() => setIsExpModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h3 className="text-lg font-bold text-white mb-4">Edit Experience</h3>
            <form onSubmit={handleExpSubmit} className="space-y-3">
              <input placeholder="Role" required value={expFormData.role} onChange={(e) => setExpFormData({...expFormData, role: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Organization" required value={expFormData.organization} onChange={(e) => setExpFormData({...expFormData, organization: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Period" required value={expFormData.period} onChange={(e) => setExpFormData({...expFormData, period: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Location" value={expFormData.location} onChange={(e) => setExpFormData({...expFormData, location: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <textarea placeholder="Description" rows={3} value={expFormData.description} onChange={(e) => setExpFormData({...expFormData, description: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <textarea placeholder="Highlights (one per line)" rows={3} value={highlightsInput} onChange={(e) => setHighlightsInput(e.target.value)} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg font-semibold">Save</button>
            </form>
          </div>
        </div>
      )}

      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-6 rounded-2xl max-w-lg w-full relative">
            <button onClick={() => setIsEduModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h3 className="text-lg font-bold text-white mb-4">Edit Education</h3>
            <form onSubmit={handleEduSubmit} className="space-y-3">
              <input placeholder="Degree" required value={eduFormData.degree} onChange={(e) => setEduFormData({...eduFormData, degree: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Institution" required value={eduFormData.institution} onChange={(e) => setEduFormData({...eduFormData, institution: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Year" required value={eduFormData.year} onChange={(e) => setEduFormData({...eduFormData, year: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg font-semibold">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
