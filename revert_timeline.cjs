const fs = require('fs');
let file = 'src/components/admin/tabs/TimelineTab.tsx';
let c = fs.readFileSync(file, 'utf8');

let originalStart = `import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Briefcase, GraduationCap, Plus, Edit3, Trash2, X } from 'lucide-react';
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
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [loadingExp, setLoadingExp] = useState(false);
  const [loadingEdu, setLoadingEdu] = useState(false);

  const [expFormData, setExpFormData] = useState<Omit<Experience, 'id'>>({
    role: '',
    organization: '',
    location: '',
    period: '',
    description: '',
    highlights: [],
    current: false
  });
  const [highlightsInput, setHighlightsInput] = useState('');

  const [eduFormData, setEduFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    year: '',
    result: '',
    thesis: '',
    advisor: ''
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

  // --- Handlers for Experience ---
  const openExpCreate = () => {
    setEditingExpId(null);
    setExpFormData({ role: '', organization: '', location: '', period: '', description: '', highlights: [], current: false });
    setHighlightsInput('');
    setIsExpModalOpen(true);
  };
  const openExpEdit = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpFormData({
      role: exp.role,
      organization: exp.organization,
      location: exp.location,
      period: exp.period,
      description: exp.description || '',
      highlights: exp.highlights || [],
      current: exp.current || false
    });
    setHighlightsInput((exp.highlights || []).join('\\n'));
    setIsExpModalOpen(true);
  };
  const handleExpDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
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
    const parsedHighlights = highlightsInput.split('\\n').map(h => h.trim()).filter(Boolean);
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

  // --- Handlers for Education ---
  const openEduCreate = () => {
    setEditingEduId(null);
    setEduFormData({ degree: '', institution: '', year: '', result: '', thesis: '', advisor: '' });
    setIsEduModalOpen(true);
  };
  const openEduEdit = (edu: Education) => {
    setEditingEduId(edu.id);
    setEduFormData({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year,
      result: edu.result || '',
      thesis: edu.thesis || '',
      advisor: edu.advisor || ''
    });
    setIsEduModalOpen(true);
  };
  const handleEduDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this degree?')) return;
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
    <div className="space-y-10 animate-fadeIn" id="admin-timeline-tab">
`;

let dndIndex = c.indexOf('<DragDropContext');
if (dndIndex !== -1) {
    c = originalStart + c.substring(dndIndex);
}

// Ensure proper JSX tags are removed by fixing the map logic. We will just use regex to clean the ends because there are two <DragDropContext> in TimelineTab
c = c.replace(/<\/div>\s*\)\}\s*<\/Draggable>\s*\}\)\}\s*\{provided.placeholder\}\s*<\/div>\s*\)\}\s*<\/Droppable>\s*<\/DragDropContext>\s*<\/div>/g, 
  `}
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
</div>`);

// Wait, doing this via regex is very brittle.
fs.writeFileSync(file, c);
