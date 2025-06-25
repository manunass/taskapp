const styles = {
  container:
    'min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8',
  card: 'max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg p-8',
  header: 'text-center',
  title: 'text-3xl font-bold text-gray-900 mb-2',
  subtitle: 'text-sm text-gray-600',
  form: 'space-y-6',
  inputGroup: 'space-y-2',
  label: 'block text-sm font-medium text-gray-700',
  inputWrapper: 'relative',
  inputIcon:
    'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400',
  input:
    'block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
  passwordToggle:
    'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors',
  eyeIcon: 'h-5 w-5',
  errorText: 'text-sm text-red-600',
  submitButton:
    'w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
  loaderIcon: 'animate-spin -ml-1 mr-3 h-5 w-5',
  loginText: 'text-center text-sm text-gray-600',
  loginLink: 'font-medium text-blue-600 hover:text-blue-500 transition-colors',
};

export default styles;
