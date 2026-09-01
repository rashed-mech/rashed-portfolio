import React, { useState } from 'react';
import { Type, Save } from 'lucide-react';
import { updateSectionConfigAPI } from '../../api';

interface Props {
  sectionKey: string;
  data: any;
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success'|'error') => void;
}

export const SectionHeadingEditor: React.FC<Props> = ({ sectionKey, data, onRefresh, showToast }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data?.sectionConfig?.[sectionKey]?.title || '');
  const [subtitle, setSubtitle] = useState(data?.sectionConfig?.[sectionKey]?.subtitle || '');

  const handleSave = async () => {
    try {
      setLoading(true);
      const newConfig = {
        ...data.sectionConfig,
        [sectionKey]: { title, subtitle }
      };
      await updateSectionConfigAPI(newConfig);
      showToast('Section headings saved successfully', 'success');
      onRefresh();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg">
      <div className="p-5 border-b border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-400" />
            Section Headings & Text
          </h3>
          <p className="text-sm text-slate-400 mt-1">Customize the title and subtitle for this specific section on the page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <Save className="w-4 h-4" />
          <span>Save Headings</span>
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/30">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Main Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
            placeholder="e.g. Core Engineering & Simulation Proficiencies"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Subtitle / Description</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 shadow-inner resize-none"
            placeholder="Write a brief description..."
          />
        </div>
      </div>
    </div>
  );
};
