document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('select[data-js-choice]')?.forEach(select => {
		new Choices(select, {
			searchFields: ['label'],
			shouldSort: false,
		})
	})
})
