const fs = require('fs');

['src/components/admin/tabs/CertificationsTab.tsx', 'src/components/admin/tabs/TrainingsTab.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // They probably don't use a custom modal for individual delete, they use window.confirm
  if (content.includes("window.confirm")) {
    const isCert = file.includes('CertificationsTab');
    
    // Add state for delete confirmation
    content = content.replace(
      "const [isModalOpen, setIsModalOpen] = useState(false);",
      "const [isModalOpen, setIsModalOpen] = useState(false);\n  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);"
    );
    
    if (isCert) {
      content = content.replace(
        `const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;`,
        `const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };
  
  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);`
      );
    } else {
      content = content.replace(
        `const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(\`Are you sure you want to delete "\${title}"?\`)) return;`,
        `const handleDelete = (id: string, title: string) => {
    setDeleteConfirmId(id);
  };
  
  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);`
      );
    }
    
    const deleteModal = `{/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Delete Record?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}`;
      
    // find the end of the return
    // it usually ends with:
    //       )}
    //     </div>
    //   );
    // };
    const idx = content.lastIndexOf("</div>\n  );\n};");
    if (idx !== -1) {
       content = content.substring(0, idx) + deleteModal + "\n    </div>\n  );\n};";
    }

    fs.writeFileSync(file, content);
  }
});
