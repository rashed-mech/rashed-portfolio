import re

with open('src/components/admin/tabs/TimelineTab.tsx', 'r') as f:
    content = f.read()

old_form = """            <form onSubmit={handleEduSubmit} className="space-y-3">
              <input placeholder="Degree (e.g. Ph.D. in Engineering)" required value={eduFormData.degree} onChange={(e) => setEduFormData({...eduFormData, degree: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Institution" required value={eduFormData.institution} onChange={(e) => setEduFormData({...eduFormData, institution: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Department (Optional)" value={eduFormData.department || ''} onChange={(e) => setEduFormData({...eduFormData, department: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
                <input placeholder="Location (Optional)" value={eduFormData.location || ''} onChange={(e) => setEduFormData({...eduFormData, location: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Year" required value={eduFormData.year} onChange={(e) => setEduFormData({...eduFormData, year: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
                <input placeholder="Result (e.g. 3.9/4.0)" value={eduFormData.result || ''} onChange={(e) => setEduFormData({...eduFormData, result: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <input placeholder="Dissertation / Thesis Title" value={eduFormData.thesis || ''} onChange={(e) => setEduFormData({...eduFormData, thesis: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Advisor" value={eduFormData.advisor || ''} onChange={(e) => setEduFormData({...eduFormData, advisor: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <textarea placeholder="Relevant Coursework" value={eduFormData.coursework || ''} onChange={(e) => setEduFormData({...eduFormData, coursework: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700 resize-none" rows={2}/>
              <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg font-semibold">Save</button>
            </form>"""

new_form = """            <form onSubmit={handleEduSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree <span className="text-red-400">*</span></label>
                <input placeholder="e.g. Ph.D. in Engineering" required value={eduFormData.degree} onChange={(e) => setEduFormData({...eduFormData, degree: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution <span className="text-red-400">*</span></label>
                <input placeholder="University Name" required value={eduFormData.institution} onChange={(e) => setEduFormData({...eduFormData, institution: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year <span className="text-red-400">*</span></label>
                  <input placeholder="2020 - 2024" required value={eduFormData.year} onChange={(e) => setEduFormData({...eduFormData, year: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Result</label>
                  <input placeholder="3.9/4.0" value={eduFormData.result || ''} onChange={(e) => setEduFormData({...eduFormData, result: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
                </div>
              </div>
              
              <div className="pt-2 border-t border-slate-700">
                <label className="block text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wider">Dissertation / Thesis</label>
                <textarea placeholder="Title and brief description of your thesis..." value={eduFormData.thesis || ''} onChange={(e) => setEduFormData({...eduFormData, thesis: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700 resize-y" rows={3}/>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Advisor</label>
                <input placeholder="Prof. Name" value={eduFormData.advisor || ''} onChange={(e) => setEduFormData({...eduFormData, advisor: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Coursework</label>
                <textarea placeholder="List relevant courses..." value={eduFormData.coursework || ''} onChange={(e) => setEduFormData({...eduFormData, coursework: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700 resize-none" rows={2}/>
              </div>
              <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Save Education</button>
            </form>"""

if old_form in content:
    content = content.replace(old_form, new_form)

with open('src/components/admin/tabs/TimelineTab.tsx', 'w') as f:
    f.write(content)
