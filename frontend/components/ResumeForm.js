import { useState } from 'react';
import { Alert, Loader } from './UI';

export default function ResumeForm({ onAnalyze }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        setResumeFile(file);
        setFileName(file.name);
        setError('');
      } else {
        setError('Please upload a PDF or text file');
        setResumeFile(null);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        setResumeFile(file);
        setFileName(file.name);
        setError('');
      } else {
        setError('Please upload a PDF or text file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    if (!resumeFile) {
      setError('Please upload a resume file');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      formData.append('resume_file', resumeFile);
      
      await onAnalyze(formData);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {error && <Alert message={error} type="error" />}
      
      <div className="form-group">
        <label htmlFor="job-desc">Job Description *</label>
        <textarea
          id="job-desc"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here..."
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Resume File * (PDF or Text)</label>
        <div
          className={`file-input-wrapper`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label
            className={`file-input-label ${dragActive ? 'active' : ''} ${fileName ? 'active' : ''}`}
            htmlFor="resume-file"
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📁</div>
              <div style={{ marginBottom: '4px', fontWeight: '500' }}>
                {fileName || 'Drag & drop your resume or click to browse'}
              </div>
              <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                Supported: PDF, TXT
              </div>
            </div>
            <input
              id="resume-file"
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-full"
        disabled={loading || !jobDescription.trim() || !resumeFile}
      >
        {loading ? <><Loader /> Analyzing...</> : '🚀 Analyze Resume'}
      </button>
    </form>
  );
}
