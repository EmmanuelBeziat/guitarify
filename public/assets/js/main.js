document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.dashboard__actions [data-delete-id]')?.forEach(item => {
		item.addEventListener('click', () => {
			if (confirm(`Voulez-vous supprimer le cette guitare ?`)) {
				fetch(`/guitar/${item.dataset.deleteId}`, {
					method: 'DELETE',
				}).then(response => {
					console.log(response)
				})
			}
		})
	})
})
