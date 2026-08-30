const fs = require('fs');
let content = fs.readFileSync('src/components/admin/tabs/PublicationsTab.tsx', 'utf-8');

// Add showBulkDeleteConfirm state
content = content.replace(
  "const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);",
  "const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);\n  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);"
);

// Modify handleBulkDelete to trigger modal
const oldHandleBulkDelete = `  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(\`Are you sure you want to delete \${selectedIds.size} publications? This cannot be undone.\`)) return;
    
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of Array.from(selectedIds)) {
      try {
        await deletePublicationAPI(id);
        successCount++;
      } catch (e) {
        failCount++;
      }
    }
    
    if (successCount > 0) {
      showToast(\`Successfully deleted \${successCount} publication(s)\`, 'success');
      onRefresh();
      setSelectedIds(new Set());
    }
    if (failCount > 0) {
      showToast(\`Failed to delete \${failCount} publication(s)\`, 'error');
    }
    
    setLoading(false);
  };`;

const newHandleBulkDelete = `  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const executeBulkDelete = async () => {
    setShowBulkDeleteConfirm(false);
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of Array.from(selectedIds)) {
      try {
        await deletePublicationAPI(id);
        successCount++;
      } catch (e) {
        failCount++;
      }
    }
    
    if (successCount > 0) {
      showToast(\`Successfully deleted \${successCount} publication(s)\`, 'success');
      onRefresh();
      setSelectedIds(new Set());
    }
    if (failCount > 0) {
      showToast(\`Failed to delete \${failCount} publication(s)\`, 'error');
    }
    
    setLoading(false);
  };`;

content = content.replace(oldHandleBulkDelete, newHandleBulkDelete);

// Add bulk delete modal
const deleteModal = `{/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Delete Publication?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this publication record? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}`;

const bulkDeleteModal = `{/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Delete Multiple Publications?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete {selectedIds.size} publications? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={executeBulkDelete}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Selected'}
              </button>
            </div>
          </div>
        </div>
      )}`;

content = content.replace(deleteModal, deleteModal + '\n\n      ' + bulkDeleteModal);

fs.writeFileSync('src/components/admin/tabs/PublicationsTab.tsx', content);
