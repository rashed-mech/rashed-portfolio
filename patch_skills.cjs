const fs = require('fs');

const code = `import React, { useState } from 'react';
import { Terminal, Plus, Trash2, Save, X, GripVertical } from 'lucide-react';
import { SkillGroup, SkillItem } from '../../../types';
import { updateSkillsAPI } from '../../../api';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SkillsTabProps {
  skillGroups: SkillGroup[];
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const SortableSkill = ({ skill, gIdx, sIdx, handleUpdateSkill, handleRemoveSkill }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 relative z-10">
      <div {...attributes} {...listeners} className="cursor-grab p-1 text-slate-500 hover:text-white touch-none">
        <GripVertical className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={skill.name}
        onChange={(e) => handleUpdateSkill(gIdx, sIdx, { name: e.target.value })}
        className="flex-1 min-w-[160px] px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
        placeholder="Skill Name"
      />
      <div className="flex items-center space-x-1 text-xs text-slate-400">
        <span>Level %:</span>
        <input
          type="number"
          min={1}
          max={100}
          value={skill.level || 90}
          onChange={(e) => handleUpdateSkill(gIdx, sIdx, { level: Number(e.target.value) })}
          className="w-16 px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white text-center"
        />
      </div>
      <label className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={skill.highlight || false}
          onChange={(e) => handleUpdateSkill(gIdx, sIdx, { highlight: e.target.checked })}
          className="w-3.5 h-3.5 text-indigo-600 rounded"
        />
        <span className="text-[11px] font-semibold">Highlight</span>
      </label>
      <button
        type="button"
        onClick={() => handleRemoveSkill(gIdx, sIdx)}
        className="p-1 text-slate-500 hover:text-red-400"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const SortableGroup = ({ group, gIdx, handleUpdateGroupTitle, handleAddSkillToGroup, handleRemoveGroup, handleUpdateSkill, handleRemoveSkill, sensors, handleSkillDragEnd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-4 relative z-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
        <div className="flex items-center gap-2 flex-1">
          <div {...attributes} {...listeners} className="cursor-grab p-1 text-slate-500 hover:text-white touch-none">
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={group.category}
              onChange={(e) => handleUpdateGroupTitle(gIdx, e.target.value, group.description || '')}
              className="px-3 py-1.5 text-xs sm:text-sm font-bold bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
              placeholder="Category Name"
            />
            <input
              type="text"
              value={group.description || ''}
              onChange={(e) => handleUpdateGroupTitle(gIdx, group.category, e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-300 focus:outline-none"
              placeholder="Category Description..."
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleAddSkillToGroup(gIdx)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:bg-indigo-950/60 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
          <button
            type="button"
            onClick={() => handleRemoveGroup(gIdx)}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/60 transition-colors"
            title="Remove Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Skills Table / List inside Category */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleSkillDragEnd(e, gIdx)}>
        <SortableContext items={group.skills.map((s: any) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {group.skills.map((skill: any, sIdx: number) => (
              <SortableSkill
                key={skill.id}
                skill={skill}
                gIdx={gIdx}
                sIdx={sIdx}
                handleUpdateSkill={handleUpdateSkill}
                handleRemoveSkill={handleRemoveSkill}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export const SkillsTab: React.FC<SkillsTabProps> = ({ skillGroups, onRefresh, showToast }) => {
  const [groups, setGroups] = useState<SkillGroup[]>(() => {
    const parsed = JSON.parse(JSON.stringify(skillGroups));
    return parsed.map((g: any) => ({
      ...g,
      id: g.id || \`sg-\${Math.random().toString(36).substr(2, 9)}\`,
      skills: g.skills.map((s: any) => ({
        ...s,
        id: s.id || \`sk-\${Math.random().toString(36).substr(2, 9)}\`
      }))
    }));
  });
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleGroupDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setGroups((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSkillDragEnd = (event: DragEndEvent, groupIdx: number) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setGroups((items) => {
        const updated = [...items];
        const groupSkills = updated[groupIdx].skills;
        const oldIndex = groupSkills.findIndex((i: any) => i.id === active.id);
        const newIndex = groupSkills.findIndex((i: any) => i.id === over.id);
        updated[groupIdx].skills = arrayMove(groupSkills, oldIndex, newIndex);
        return updated;
      });
    }
  };

  const handleAddGroup = () => {
    const newGroup: SkillGroup = {
      id: \`sg-\${Date.now()}\`,
      category: 'New Competency Group',
      description: 'Description of domain tools and methods.',
      skills: [
        { id: \`sk-\${Date.now()}\`, name: 'Skill 1', level: 90, highlight: true }
      ]
    };
    setGroups([...groups, newGroup]);
  };

  const handleRemoveGroup = (idx: number) => {
    if (!confirm('Remove this entire skill category?')) return;
    const updated = groups.filter((_, i) => i !== idx);
    setGroups(updated);
  };

  const handleUpdateGroupTitle = (idx: number, category: string, description: string) => {
    const updated = [...groups];
    updated[idx].category = category;
    updated[idx].description = description;
    setGroups(updated);
  };

  const handleAddSkillToGroup = (groupIdx: number) => {
    const updated = [...groups];
    updated[groupIdx].skills.push({
      id: \`sk-\${Date.now()}\`,
      name: 'New Skill',
      level: 85,
      highlight: false
    });
    setGroups(updated);
  };

  const handleRemoveSkill = (groupIdx: number, skillIdx: number) => {
    const updated = [...groups];
    updated[groupIdx].skills = updated[groupIdx].skills.filter((_, i) => i !== skillIdx);
    setGroups(updated);
  };

  const handleUpdateSkill = (groupIdx: number, skillIdx: number, partial: Partial<SkillItem>) => {
    const updated = [...groups];
    updated[groupIdx].skills[skillIdx] = {
      ...updated[groupIdx].skills[skillIdx],
      ...partial
    };
    setGroups(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSkillsAPI(groups);
      showToast('Technical skills updated successfully!');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to update skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="admin-skills-tab">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Technical Skills & Competencies</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize domain categories, proficiency percentages, and featured tags.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddGroup}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Skills'}</span>
          </button>
        </div>
      </div>

      {/* Groups List */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleGroupDragEnd}>
        <SortableContext items={groups.map(g => g.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {groups.map((group, gIdx) => (
              <SortableGroup
                key={group.id}
                group={group}
                gIdx={gIdx}
                handleUpdateGroupTitle={handleUpdateGroupTitle}
                handleAddSkillToGroup={handleAddSkillToGroup}
                handleRemoveGroup={handleRemoveGroup}
                handleUpdateSkill={handleUpdateSkill}
                handleRemoveSkill={handleRemoveSkill}
                sensors={sensors}
                handleSkillDragEnd={handleSkillDragEnd}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
`
fs.writeFileSync('src/components/admin/tabs/SkillsTab.tsx', code);
