import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace(
    "import { updatePillarsAPI, updateMetricsAPI } from '../../../api';",
    "import { updatePillarsAPI, updateMetricsAPI, updateSectionConfigAPI } from '../../../api';"
)

# Add state
content = content.replace(
    "  const [metrics, setMetrics] = useState<CoreMetric[]>(data.metrics || []);",
    "  const [metrics, setMetrics] = useState<CoreMetric[]>(data.metrics || []);\n  const [showPillars, setShowPillars] = useState(data.sectionConfig?.overview?.showPillars !== false);"
)

# Update save logic
save_logic_find = """      await updatePillarsAPI(pillars);
      showToast('Core Pillars saved successfully', 'success');"""

save_logic_repl = """      await updatePillarsAPI(pillars);
      await updateSectionConfigAPI({
        ...data.sectionConfig,
        overview: {
          ...(data.sectionConfig?.overview || {}),
          showPillars
        }
      });
      showToast('Core Pillars saved successfully', 'success');"""

content = content.replace(save_logic_find, save_logic_repl)

# Add toggle UI
ui_find = """            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Core Pillars
            </h2>
            <p className="text-sm text-slate-400 mt-1">Manage the 4 main expertise pillars shown in the Overview section. Drag to reorder.</p>
          </div>"""

ui_repl = """            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Core Pillars
            </h2>
            <p className="text-sm text-slate-400 mt-1">Manage the 4 main expertise pillars shown in the Overview section. Drag to reorder.</p>
            <div className="mt-3 flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showPillars}
                  onChange={(e) => setShowPillars(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-700 bg-slate-900 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-300">Show "Core Pillars" section publicly</span>
              </label>
            </div>
          </div>"""

content = content.replace(ui_find, ui_repl)

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)

