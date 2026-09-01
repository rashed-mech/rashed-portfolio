import { SectionHeadingEditor } from '../SectionHeadingEditor';
import React, { useState } from 'react';
import { Award, Plus, Edit3, Trash2, X, Link, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Reference, VolunteerEngagement, Achievement, Affiliation } from '../../../types';
import {
  updateReferencesAPI,
  updateVolunteerWorkAPI,
  updateAchievementsAPI,
  updateAffiliationsAPI
} from '../../../api';

interface HonorsTabProps {
  data?: any;
  references: Reference[];
  volunteerWork: VolunteerEngagement[];
  achievements: Achievement[];
  affiliations: Affiliation[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const HonorsTab: React.FC<HonorsTabProps> = ({ data, references,
  volunteerWork,
  achievements,
  affiliations,
  onRefresh,
  showToast
}) => {
  const [subTab, setSubTab] = useState<'references' | 'volunteer' | 'achievements' | 'affiliations'>('references');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSubTabChange = (tab: any) => {
    setSubTab(tab);
    setFormData({});
    setEditingId(null);
  };

  const openAddModal = () => {
    setEditingId(null);
    if (subTab === 'references') {
      setFormData({ name: '', role: '', department: '', institution: '', email: '', phone: '', website: '' });
    } else if (subTab === 'volunteer') {
      setFormData({ title: '', role: '', organization: '', description: '', period: '' });
    } else if (subTab === 'achievements') {
      setFormData({ title: '', category: '', year: '', description: '' });
    } else if (subTab === 'affiliations') {
      setFormData({ role: '', organization: '', period: '' });
    }
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      if (subTab === 'references') {
        await updateReferencesAPI(references.filter(r => r.id !== id));
      } else if (subTab === 'volunteer') {
        await updateVolunteerWorkAPI(volunteerWork.filter(v => v.id !== id));
      } else if (subTab === 'achievements') {
        await updateAchievementsAPI(achievements.filter(a => a.id !== id));
      } else if (subTab === 'affiliations') {
        await updateAffiliationsAPI(affiliations.filter(a => a.id !== id));
      }
      showToast('Item deleted successfully', 'success');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Error deleting item', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (subTab === 'references') {
        const newData = editingId ? references.map(r => r.id === editingId ? { ...formData, id: editingId } : r) : [...references, { ...formData, id: `new-${Date.now()}` }];
        await updateReferencesAPI(newData);
      } else if (subTab === 'volunteer') {
        const newData = editingId ? volunteerWork.map(v => v.id === editingId ? { ...formData, id: editingId } : v) : [...volunteerWork, { ...formData, id: `new-${Date.now()}` }];
        await updateVolunteerWorkAPI(newData);
      } else if (subTab === 'achievements') {
        const newData = editingId ? achievements.map(a => a.id === editingId ? { ...formData, id: editingId } : a) : [...achievements, { ...formData, id: `new-${Date.now()}` }];
        await updateAchievementsAPI(newData);
      } else if (subTab === 'affiliations') {
        const newData = editingId ? affiliations.map(a => a.id === editingId ? { ...formData, id: editingId } : a) : [...affiliations, { ...formData, id: `new-${Date.now()}` }];
        await updateAffiliationsAPI(newData);
      }
      showToast('Item saved successfully', 'success');
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Error saving item', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeadingEditor sectionKey="honors" data={data} onRefresh={onRefresh} showToast={showToast} />
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex space-x-2 bg-slate-900/50 p-1 rounded-xl overflow-x-auto w-full sm:w-auto border border-slate-700/50">
            {['references', 'volunteer', 'achievements', 'affiliations'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleSubTabChange(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  subTab === tab
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        <div className="space-y-4">
          {subTab === 'references' && references.map(ref => (
            <div key={ref.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-200">{ref.name}</h4>
                <div className="text-sm text-slate-400 mt-1">{ref.role} {ref.department ? `· ${ref.department}` : ''}</div>
                <div className="text-xs text-slate-500 mt-1">{ref.institution || ref.organization}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(ref)} className="p-2 bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(ref.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {subTab === 'volunteer' && volunteerWork.map(vol => (
            <div key={vol.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-200">{vol.title || vol.role}</h4>
                <div className="text-sm text-slate-400 mt-1">{vol.organization}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(vol)} className="p-2 bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(vol.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {subTab === 'achievements' && achievements.map(ach => (
            <div key={ach.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-200">{ach.title}</h4>
                <div className="text-sm text-slate-400 mt-1">{ach.year} · {ach.category}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(ach)} className="p-2 bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(ach.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {subTab === 'affiliations' && affiliations.map(aff => (
            <div key={aff.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-200">{aff.role}</h4>
                <div className="text-sm text-slate-400 mt-1">{aff.organization}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(aff)} className="p-2 bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(aff.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-slate-100">
                {editingId ? 'Edit Item' : 'Add Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {subTab === 'references' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                      <input required type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Role/Designation</label>
                      <input type="text" value={formData.role || formData.designation || ''} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Organization/Institution</label>
                    <input type="text" value={formData.institution || formData.organization || ''} onChange={(e) => setFormData({...formData, institution: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                    <input type="text" value={formData.department || ''} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                      <input type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                      <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Website URL</label>
                    <input type="url" value={formData.website || ''} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </>
              )}
              {subTab === 'volunteer' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title / Role</label>
                    <input required type="text" value={formData.title || formData.role || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Organization</label>
                    <input type="text" value={formData.organization || ''} onChange={(e) => setFormData({...formData, organization: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Period</label>
                    <input type="text" value={formData.period || ''} onChange={(e) => setFormData({...formData, period: e.target.value})} placeholder="e.g. 2022 - 2023" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </>
              )}
              {subTab === 'achievements' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title</label>
                    <input required type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                      <input type="text" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Year</label>
                      <input type="text" value={formData.year || ''} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </>
              )}
              {subTab === 'affiliations' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Role / Title</label>
                    <input required type="text" value={formData.role || ''} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Organization</label>
                    <input type="text" value={formData.organization || ''} onChange={(e) => setFormData({...formData, organization: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Period</label>
                    <input type="text" value={formData.period || ''} onChange={(e) => setFormData({...formData, period: e.target.value})} placeholder="e.g. 2022 - 2023" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </>
              )}
              <div className="pt-4 border-t border-slate-700 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
