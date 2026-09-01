import re

with open('src/components/admin/tabs/TimelineTab.tsx', 'r') as f:
    content = f.read()

old_form = """              <input placeholder="Degree" required value={eduFormData.degree} onChange={(e) => setEduFormData({...eduFormData, degree: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Institution" required value={eduFormData.institution} onChange={(e) => setEduFormData({...eduFormData, institution: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Year" required value={eduFormData.year} onChange={(e) => setEduFormData({...eduFormData, year: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg font-semibold">Save</button>"""

new_form = """              <input placeholder="Degree (e.g. Ph.D. in Engineering)" required value={eduFormData.degree} onChange={(e) => setEduFormData({...eduFormData, degree: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Institution" required value={eduFormData.institution} onChange={(e) => setEduFormData({...eduFormData, institution: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Year" required value={eduFormData.year} onChange={(e) => setEduFormData({...eduFormData, year: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Result (e.g. 3.9/4.0 or Magna Cum Laude)" value={eduFormData.result || ''} onChange={(e) => setEduFormData({...eduFormData, result: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Dissertation / Thesis Title" value={eduFormData.thesis || ''} onChange={(e) => setEduFormData({...eduFormData, thesis: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <input placeholder="Advisor" value={eduFormData.advisor || ''} onChange={(e) => setEduFormData({...eduFormData, advisor: e.target.value})} className="w-full p-2 bg-slate-900 text-white rounded-lg text-sm border border-slate-700"/>
              <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg font-semibold">Save</button>"""

if old_form in content:
    content = content.replace(old_form, new_form)
else:
    print("Could not find old form")

with open('src/components/admin/tabs/TimelineTab.tsx', 'w') as f:
    f.write(content)
