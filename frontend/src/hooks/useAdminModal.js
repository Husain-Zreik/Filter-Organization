import { useState } from 'react'

/**
 * Shared hook for admin CRUD modal state.
 *
 * Returns:
 *   mode       — '' | 'create' | 'edit' | 'view'
 *   selected   — the row being edited/viewed, or null for create
 *   isOpen     — true when any modal mode is active
 *   openCreate — open modal in create mode
 *   openEdit   — open modal in edit mode with a row
 *   openView   — open modal in view mode with a row
 *   close      — close and reset the modal
 */
export function useAdminModal() {
  const [mode, setMode]         = useState('')
  const [selected, setSelected] = useState(null)

  function openCreate()  { setSelected(null); setMode('create') }
  function openEdit(row) { setSelected(row);  setMode('edit')   }
  function openView(row) { setSelected(row);  setMode('view')   }
  function close()       { setMode('');       setSelected(null) }

  return { mode, selected, isOpen: Boolean(mode), openCreate, openEdit, openView, close }
}
