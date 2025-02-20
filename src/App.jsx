import React, { useState } from 'react';
import CmmnViewer from './components/CmmnViewer';
import { generateCMMN } from './utils/openRouterApi';

const bankingScenarios = [
  'Account Opening',
  'Loan Application',
  'Fraud Investigation',
  'Customer Onboarding',
  'Dispute Resolution'
];

function App() {
  const [selectedScenario, setSelectedScenario] = useState(bankingScenarios[0]);
  const [cmmnXml, setCmmnXml] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCMMN = async () => {
    setIsLoading(true);
    try {
      const xml = await generateCMMN(selectedScenario);
      setCmmnXml(xml);
    } catch (error) {
      console.error('Error generating CMMN:', error);
      alert('Failed to generate CMMN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Banking Scenarios CMMN Generator</h1>
      <select
        value={selectedScenario}
        onChange={(e) => setSelectedScenario(e.target.value)}
      >
        {bankingScenarios.map((scenario) => (
          <option key={scenario} value={scenario}>
            {scenario}
          </option>
        ))}
      </select>
      <button onClick={handleGenerateCMMN} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate CMMN'}
      </button>
      {cmmnXml && <CmmnViewer xml={cmmnXml} />}
    </div>
  );
}

export default App;
