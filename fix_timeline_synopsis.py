import re

with open('src/components/admin/tabs/TimelineTab.tsx', 'r') as f:
    content = f.read()

# Update initial state
content = content.replace("degree: '', institution: '', year: '', result: '', thesis: '', advisor: '', department: '', location: '', coursework: ''", "degree: '', institution: '', year: '', result: '', thesis: '', advisor: '', department: '', location: '', coursework: '', synopsis: ''")

# Update openEduEdit
content = content.replace("result: edu.result || '', thesis: edu.thesis || '', advisor: edu.advisor || '', department: edu.department || '', location: edu.location || '', coursework: edu.coursework || ''", "result: edu.result || '', thesis: edu.thesis || '', advisor: edu.advisor || '', department: edu.department || '', location: edu.location || '', coursework: edu.coursework || '', synopsis: edu.synopsis || ''")


new_form = """              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Advisor</label>
                <input placeholder="Prof. Name" value={eduFormData.advisor || ''} onChange={(e) => setEduFormData({...eduFormData, advisor: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Synopsis</label>
                <textarea placeholder="Write a synopsis..." value={eduFormData.synopsis || ''} onChange={(e) => setEduFormData({...eduFormData, synopsis: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700 resize-y" rows={3}/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Coursework</label>"""

old_form = """              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Advisor</label>
                <input placeholder="Prof. Name" value={eduFormData.advisor || ''} onChange={(e) => setEduFormData({...eduFormData, advisor: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Coursework</label>"""

if old_form in content:
    content = content.replace(old_form, new_form)
else:
    print("could not find old form")

with open('src/components/admin/tabs/TimelineTab.tsx', 'w') as f:
    f.write(content)
