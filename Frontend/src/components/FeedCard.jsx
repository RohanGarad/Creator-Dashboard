import React, { useState } from 'react';

const FeedCard = ({ post, onSave, onReport }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [reportError, setReportError] = useState(null);

  const handleSaveClick = async () => {
    setIsSaving(true);
    setSaveError(null); // Clear previous error
    try {
      await onSave(post);
    } catch (error) {
      setSaveError('Failed to save the post. Please try again later.');
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleReportClick = async () => {
    setIsReporting(true);
    setReportError(null); // Clear previous error
    try {
      await onReport(post);
    } catch (error) {
      setReportError('Failed to report the post. Please try again later.', error);
    } finally {
      setIsReporting(false);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.content}</p>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className={`${
              isSaving ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-2 px-4 rounded-md focus:outline-none`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={handleReportClick}
            disabled={isReporting}
            className={`${
              isReporting ? 'bg-gray-300' : 'bg-red-500 hover:bg-red-600'
            } text-white py-2 px-4 rounded-md focus:outline-none`}
          >
            {isReporting ? 'Reporting...' : 'Report'}
          </button>
        </div>

        {/* Error message handling */}
        {saveError && (
          <p className="text-red-500 text-sm mt-2">{saveError}</p>
        )}
        {reportError && (
          <p className="text-red-500 text-sm mt-2">{reportError}</p>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
