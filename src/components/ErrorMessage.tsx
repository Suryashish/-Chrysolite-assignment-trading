import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 lg:p-4 flex items-start space-x-2 lg:space-x-3 shadow-lg">
      <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-red-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-red-500 text-sm lg:text-base font-medium wrap-break-word">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
