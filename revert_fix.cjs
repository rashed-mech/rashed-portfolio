const fs = require('fs');
let file = 'src/components/admin/tabs/TrainingsTab.tsx';
let c = fs.readFileSync(file, 'utf8');
// TrainingsTab has <DragDropContext onDragEnd={onDragEnd}> at the VERY TOP of the file. That's why line 1 has it.
// Where should the original imports be?
let originalStart = `import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Award, Plus, Edit3, Trash2, X, ExternalLink } from 'lucide-react';
import { Training } from '../../../types';
import { createTrainingAPI, updateTrainingAPI, deleteTrainingAPI, reorderTrainingsAPI } from '../../../api';

interface TrainingsTabProps {
  trainings?: Training[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const TrainingsTab: React.FC<TrainingsTabProps> = ({
  trainings = [],
  onRefresh,
  showToast
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Training, 'id'>>({
    title: '',
    issuer: '',
    year: '',
    credentialUrl: '',
    skillsAcquired: [],
    description: ''
  });
  const [skillsInput, setSkillsInput] = useState('');
  const [loading, setLoading] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;
    const newItems = Array.from(trainings);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);
    try {
      setLoading(true);
      await reorderTrainingsAPI(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      credentialUrl: '',
      skillsAcquired: [],
      description: ''
    });
    setSkillsInput('');
    setIsModalOpen(true);
  };

  const openEdit = (tr: Training) => {
    setEditingId(tr.id);
    setFormData({
      title: tr.title,
      issuer: tr.issuer,
      year: tr.year,
      credentialUrl: tr.credentialUrl || '',
      skillsAcquired: tr.skillsAcquired || [],
      description: tr.description || ''
    });
    setSkillsInput((tr.skillsAcquired || []).join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);
    try {
      setLoading(true);
      await deleteTrainingAPI(id);
      showToast('Training certification deleted successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete training', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.year) {
      showToast('Title, issuer, and year are required.', 'error');
      return;
    }
    const payload: Omit<Training, 'id'> = {
      ...formData,
      skillsAcquired: skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    };
    try {
      setLoading(true);
      if (editingId) {
        await updateTrainingAPI(editingId, payload);
        showToast('Training certification updated successfully');
      } else {
        await createTrainingAPI(payload);
        showToast('Training certification added successfully');
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to save training', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="admin-trainings-tab">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Professional Training & Seminars</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your completed courses, workshops, and field visits.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Training</span>
        </button>
      </div>
`;
// find where `<DragDropContext` starts and replace everything before it with `originalStart`
let dndIndex = c.indexOf('<DragDropContext');
if (dndIndex !== -1) {
    c = originalStart + c.substring(dndIndex);
}

fs.writeFileSync(file, c);
