import { ScoreCard, ProgressBar, Badge, Alert } from './UI';

export default function ResultsDisplay({ data, onDownload }) {
  if (!data) return null;

  const {
    overall_score,
    skill_score,
    keyword_score,
    experience_score,
    ats_compatibility_score,
    matching_skills,
    missing_keywords,
    missing_skills,
    strengths,
    weaknesses,
    improvement_suggestions,
    ats_issues,
  } = data;

  const getScoreMessage = (score) => {
    if (score === 10) return 'Perfect Match!';
    if (score >= 8) return 'Excellent Fit';
    if (score >= 6) return 'Good Match';
    if (score >= 4) return 'Fair Match';
    return 'Needs Improvement';
  };

  return (
    <div className="results-section">
      {/* Overall Score */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--primary-color)' }}>
          Analysis Results
        </h2>
        <div className="grid grid-2">
          <ScoreCard label="Overall Match" score={overall_score} />
          <div className="card">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '12px' }}>
                Status
              </p>
              <p style={{ fontSize: '20px', fontWeight: '600', color: 'var(--primary-color)' }}>
                {getScoreMessage(overall_score)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="card" style={{ marginBottom: '40px' }}>
        <h3 className="card-title">Score Breakdown</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Skills Match</span>
            <span style={{ fontWeight: '600' }}>{skill_score}/10</span>
          </div>
          <ProgressBar score={skill_score} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Keywords Match</span>
            <span style={{ fontWeight: '600' }}>{keyword_score}/10</span>
          </div>
          <ProgressBar score={keyword_score} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Experience Relevance</span>
            <span style={{ fontWeight: '600' }}>{experience_score}/10</span>
          </div>
          <ProgressBar score={experience_score} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>ATS Compatibility</span>
            <span style={{ fontWeight: '600' }}>{ats_compatibility_score}/10</span>
          </div>
          <ProgressBar score={ats_compatibility_score} />
        </div>
      </div>

      {/* Matching Skills */}
      {matching_skills && matching_skills.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">✅ Matching Skills</h3>
          <div>
            {matching_skills.map((skill, idx) => (
              <Badge key={idx} text={skill} type="success" />
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {strengths && strengths.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">💪 Your Strengths</h3>
          <ul className="list-items">
            {strengths.map((strength, idx) => (
              <li key={idx} className="list-item">{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses && weaknesses.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">⚠️ Areas for Improvement</h3>
          <ul className="list-items">
            {weaknesses.map((weakness, idx) => (
              <li key={idx} className="list-item">{weakness}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Keywords */}
      {missing_keywords && missing_keywords.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">🔑 Missing Keywords</h3>
          <p className="card-subtitle">Add these keywords to improve matching</p>
          <div>
            {missing_keywords.map((keyword, idx) => (
              <Badge key={idx} text={keyword} type="warning" />
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {missing_skills && missing_skills.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">📚 Missing Skills</h3>
          <p className="card-subtitle">Skills mentioned in JD but not in your resume</p>
          <ul className="list-items">
            {missing_skills.map((skill, idx) => (
              <li key={idx} className="list-item">{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ATS Issues */}
      {ats_issues && ats_issues.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">🤖 ATS Compatibility Issues</h3>
          <ul className="list-items">
            {ats_issues.map((issue, idx) => (
              <li key={idx} className="list-item">{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement Suggestions */}
      {improvement_suggestions && improvement_suggestions.length > 0 && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 className="card-title">💡 Improvement Suggestions</h3>
          <ul className="list-items">
            {improvement_suggestions.map((suggestion, idx) => (
              <li key={idx} className="list-item">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Download Button */}
      <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
        <button
          onClick={onDownload}
          className="btn btn-success btn-lg"
          style={{ marginBottom: '12px' }}
        >
          📥 Download Optimized Resume (PDF)
        </button>
        <p style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '12px' }}>
          Your resume has been optimized based on the job description analysis
        </p>
      </div>
    </div>
  );
}
