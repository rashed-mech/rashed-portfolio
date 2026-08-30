const fs = require('fs');

let content = fs.readFileSync('src/components/OverviewSection.tsx', 'utf8');

// The Metric Stats Bento block
const oldMetricsBento = `          {/* Metric Stats Bento */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {metrics.map((m, idx) => (`;

const newMetricsBento = `          {/* Metric Stats Bento */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            
            {/* Impact Metrics Display (Auto-updated from Google Scholar) */}
            {(profile.stats?.citations > 0 || profile.stats?.hIndex > 0) && (
              <div className="col-span-2 p-4 rounded-xl bg-indigo-50/80 border border-indigo-100 hover:border-indigo-300 transition-all group flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[10px] font-mono text-indigo-700 uppercase font-semibold tracking-wider mb-2">Impact Metrics Display (Google Scholar)</div>
                  <div className="flex items-center space-x-8">
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600">{profile.stats.citations}</div>
                      <div className="text-[11px] font-medium text-gray-900 mt-1">Total Citations</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600">{profile.stats.hIndex}</div>
                      <div className="text-[11px] font-medium text-gray-900 mt-1">h-index</div>
                    </div>
                  </div>
                </div>
                <BookOpen className="w-10 h-10 text-indigo-200 hidden sm:block" />
              </div>
            )}

            {metrics.map((m, idx) => (`;

content = content.replace(oldMetricsBento, newMetricsBento);

fs.writeFileSync('src/components/OverviewSection.tsx', content);
