// frontend/src/App.jsx
import './index.css'; 
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const API_BASE_URL = 'http://127.0.0.1:8000';


const AnalysisSection = ({ title, icon, items, color }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null;
  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-l-4 ${color} shadow-md`}>
      <h2 className="flex items-center text-xl font-bold text-slate-100 mb-4">
        <span className="mr-3 text-2xl">{icon}</span>
        {title}
      </h2>
      {typeof items === 'string' ? (
        <p className="text-slate-300 whitespace-pre-wrap">{items}</p>
      ) : (
        <ul className="list-disc list-inside space-y-2 pl-2">
          {items.map((item, index) => <li key={index} className="text-slate-300">{item}</li>)}
        </ul>
      )}
    </div>
  );
};

const TimelineSection = ({ title, icon, items, color }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-l-4 ${color} shadow-md`}>
      <h2 className="flex items-center text-xl font-bold text-slate-100 mb-5">
         <span className="mr-3 text-2xl">{icon}</span>
         {title}
      </h2>
      <div className="relative border-l-2 border-slate-700 ml-3 pt-3">
        {items.map((item, index) => (
          <div key={index} className="mb-8 ml-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-900 rounded-full -left-4 ring-8 ring-slate-800">
              <svg className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/></svg>
            </span>
            <h3 className="text-lg font-semibold text-slate-100">{item.time}</h3>
            <p className="text-base font-normal text-slate-400">{item.topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Main App Component ---
function App() {
  const [transcript, setTranscript] = useState('');
  const [transcribedText, setTranscribedText] = useState('');
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const resetState = (clearInput = false) => {
    setError('');
    setSummaryData(null);
    if (clearInput) {
      setTranscript('');
      setTranscribedText('');
      setFileName('');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    resetState(true);
    setFileName(file.name);
    await handleTranscribe(file);
    event.target.value = null;
  };

  const handleTranscribe = async (file) => {
    setIsLoading(true);
    setLoadingStatus('Transcribing with Whisper, this may take a moment...');
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(`${API_BASE_URL}/transcribe`, formData);
        setTranscribedText(response.data.transcript);
    } catch (err) {
        const errorMessage = err.response?.data?.detail || 'Failed to transcribe audio.';
        setError(`Transcription Error: ${errorMessage}`);
    } finally {
        setIsLoading(false);
        setLoadingStatus('');
    }
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      setError('Please paste or generate a transcript first.');
      return;
    }
    setIsLoading(true);
    setLoadingStatus('Analyzing transcript...');
    setSummaryData(null);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/summarize`, { transcript });
      setSummaryData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An unexpected error occurred.';
      setError(`Analysis Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingStatus('');
    }
  };

  const handleCopyToInput = () => {
      setTranscript(transcribedText);
      setTranscribedText('');
  };

  // --- EXPORT AND EMAIL FUNCTIONS ARE RESTORED HERE ---
  const handleExportJSON = () => {
    if (!summaryData) return;
    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    saveAs(blob, 'meeting_summary.json');
  };

  const handleExportCSV = () => {
    if (!summaryData) return;
    let csvContent = "Category,Value\n";
    csvContent += `Summary,"${String(summaryData.summary || '').replace(/"/g, '""')}"\n`;
    (summaryData.painPoints || []).forEach(item => csvContent += `Pain Point,"${String(item).replace(/"/g, '""')}"\n`);
    (summaryData.objections || []).forEach(item => csvContent += `Objection,"${String(item).replace(/"/g, '""')}"\n`);
    (summaryData.nextSteps || []).forEach(item => csvContent += `Next Step,"${String(item).replace(/"/g, '""')}"\n`);
    (summaryData.timeline || []).forEach(item => csvContent += `Timeline,"${item.time}: ${String(item.topic).replace(/"/g, '""')}"\n`);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "meeting_summary.csv");
  };

  const handleEmailSummary = async () => {
    if (!summaryData) return;
    setIsLoading(true);
    setLoadingStatus('Emailing summary...');
    try {
        const response = await axios.post(`${API_BASE_URL}/email_summary`, summaryData);
        alert(response.data.message);
    } catch (err) {
        const errorMessage = err.response?.data?.detail || 'Could not send email.';
        setError(`Email Error: ${errorMessage}`);
    } finally {
        setIsLoading(false);
        setLoadingStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">AI Meeting <span className="text-cyan-400">Summarizer</span></h1>
          <p className="mt-4 text-lg text-slate-400">Developed by: Sumit Tiwari</p>
          <p className="mt-4 text-lg text-slate-400">Al-Powered Meeting Transcript Summarizer and Action Item Extractor.</p>
          <p className="mt-4 text-lg text-slate-400">Upload an audio file to generate a transcript, then analyze it for key insights.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* --- Step 1: Upload and Transcription --- */}
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-4"><span className="text-2xl text-cyan-400 mr-2">1.</span> Upload Audio File(.wav Only)</h2>
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-full px-5 py-3 text-base font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >Upload Audio</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="audio/*"/>
            {fileName && <p className="text-sm text-center text-slate-400 mt-3">File: <span className="font-medium text-slate-300">{fileName}</span></p>}

            {isLoading && loadingStatus.startsWith('Transcribing') && (
                <div className="mt-4 flex flex-col items-center justify-center gap-y-3 text-cyan-400 p-4 bg-slate-900 rounded-md">
                  <LoadingSpinner/> <span>{loadingStatus}</span>
                </div>
            )}

            {transcribedText && (
              <div className="mt-4 border-t-2 border-slate-700 pt-4">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Transcription Result:</h3>
                <textarea readOnly value={transcribedText} className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-md text-slate-300"/>
                <button onClick={handleCopyToInput} className="mt-3 w-full px-6 py-2 font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">Copy to Analysis Input →</button>
              </div>
            )}
          </div>
          {/* --- Step 2: Analysis --- */}
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-4"><span className="text-2xl text-cyan-400 mr-2">2.</span> Analyze Transcript</h2>
            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your transcript here, or generate one by uploading an audio file."
              className="w-full h-48 p-4 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !transcript}
              className="mt-4 w-full flex items-center justify-center gap-x-2 px-6 py-3 text-base font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {isLoading && loadingStatus.startsWith('Analyzing') ? <><LoadingSpinner /> {loadingStatus}</> : '✨ Analyze Transcript'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-8" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* --- Step 3: Results --- */}
        {summaryData && (
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
              <div className="flex items-center gap-x-3">
                 <button onClick={handleEmailSummary} disabled={isLoading} className="flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-500">
                  {isLoading && loadingStatus === 'Emailing summary...' ? <LoadingSpinner/> : '📧 Email Summary'}
                </button>
                <button onClick={handleExportJSON} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Export JSON</button>
                <button onClick={handleExportCSV} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Export CSV</button>
              </div>
            </div>
            <div className="space-y-8">
              <AnalysisSection icon="📄" title="Meeting Summary" items={summaryData.summary} color="border-cyan-500" />
              <AnalysisSection icon="🎯" title="Client Pain Points" items={summaryData.painPoints} color="border-yellow-500" />
              <AnalysisSection icon="🤔" title="Objections & Resolutions" items={summaryData.objections} color="border-orange-500" />
              <AnalysisSection icon="🚀" title="Next Steps" items={summaryData.nextSteps} color="border-green-500" />
              <TimelineSection icon="🕒" title="Discussion Timeline" items={summaryData.timeline} color="border-purple-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;