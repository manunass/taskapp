const styles = {
  // Form container styles
  formContainer: 'space-y-6',

  // Form field styles
  formField: 'space-y-2',
  label: 'text-sm font-medium text-gray-700',
  input: 'w-full',
  textarea: 'w-full resize-none',
  error: 'text-sm text-red-600',

  // Form actions styles
  formActions: 'flex items-center justify-end space-x-3 pt-4',
  cancelButton: 'text-gray-700 hover:text-gray-900',
  submitButton: 'bg-blue-600 text-white hover:bg-blue-700',

  // Dialog/Sheet styles
  dialogContent: 'sm:max-w-[425px]',
  dialogHeader: 'space-y-2',
  dialogTitle: 'text-lg font-semibold text-gray-900',
  dialogDescription: 'text-sm text-gray-600',

  // Loading state styles
  loadingOverlay:
    'absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg',
  loadingSpinner: 'animate-spin',
};

export default styles;
