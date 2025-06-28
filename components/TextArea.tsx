import React from 'react';
import { QuestionMarkCircleIcon } from './icons'; 

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  wrapperClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, error, className, helpText, wrapperClassName, ...props }) => (
    <div className={`w-full ${wrapperClassName || ''}`}>
      {label && (
         <div className="flex items-center mb-1.5">
          <label htmlFor={id} className="block text-sm font-medium text-theme-text-secondary font-sans">{label}</label>
          {helpText && (
            <div className="help-tooltip-wrapper ml-1.5">
              <QuestionMarkCircleIcon className="w-4 h-4 text-theme-accent-primary help-tooltip-icon" />
              <span className="help-tooltip-text">{helpText}</span> {/* Tooltip text styled globally */}
            </div>
          )}
        </div>
      )}
      <textarea
        id={id}
        rows={props.rows || 4}
        className={`block w-full px-3 py-2 bg-theme-bg-accent border border-theme-border-primary rounded-lg shadow-sm placeholder:text-theme-text-secondary 
                    focus:outline-none focus:ring-1 focus:ring-theme-accent-primary focus:border-theme-accent-primary 
                    text-theme-text-primary font-body text-sm
                    disabled:bg-theme-bg-secondary/50 disabled:text-theme-text-secondary/70 disabled:cursor-not-allowed
                    transition-colors duration-150
                    ${error ? 'border-status-error focus:ring-status-error focus:border-status-error' : 'border-theme-border-primary hover:border-theme-accent-primary/50'} 
                    ${className || ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-status-error font-sans">{error}</p>}
    </div>
  );

export default TextArea;