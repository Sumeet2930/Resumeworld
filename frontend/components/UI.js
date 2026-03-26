export function ScoreCard({ label, score }) {
  const getScoreClass = (score) => {
    if (score === 10) return 'score-10';
    if (score >= 8) return 'score-8-9';
    if (score >= 6) return 'score-6-7';
    return 'score-below-6';
  };

  return (
    <div className="card score-card">
      <div className={`score-circle ${getScoreClass(score)}`}>
        {score}
      </div>
      <div className="score-label">{label}</div>
    </div>
  );
}

export function ProgressBar({ score, maxScore = 10 }) {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export function Badge({ text, type = 'default' }) {
  return <span className={`badge badge-${type}`}>{text}</span>;
}

export function Alert({ message, type = 'info' }) {
  return <div className={`alert alert-${type}`}>{message}</div>;
}

export function Loader() {
  return <div className="loader"></div>;
}
