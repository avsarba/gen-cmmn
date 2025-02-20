import { js2xml } from 'xml-js';

function generateCMMN(scenario) {
  const caseElements = getCaseElements(scenario);

  const cmmnObject = {
    'cmmn:definitions': {
      _attributes: {
        'xmlns:cmmn': 'http://www.omg.org/spec/CMMN/20151109/MODEL',
        'xmlns:cmmndi': 'http://www.omg.org/spec/CMMN/20151109/CMMNDI',
        'xmlns:dc': 'http://www.omg.org/spec/CMMN/20151109/DC',
        'xmlns:di': 'http://www.omg.org/spec/CMMN/20151109/DI',
        'targetNamespace': 'http://bpmn.io/schema/cmmn'
      },
      'cmmn:case': {
        _attributes: {
          id: 'Case_1',
          name: scenario
        },
        'cmmn:casePlanModel': {
          _attributes: {
            id: 'CasePlanModel_1',
            name: 'Case Plan Model'
          },
          'cmmn:planItem': caseElements.map((element, index) => ({
            _attributes: {
              id: `PlanItem_${index + 1}`,
              definitionRef: `Task_${index + 1}`
            }
          })),
          'cmmn:task': caseElements.map((element, index) => ({
            _attributes: {
              id: `Task_${index + 1}`,
              name: element
            }
          }))
        }
      }
    }
  };

  return js2xml(cmmnObject, { compact: true, spaces: 2 });
}

function getCaseElements(scenario) {
  switch (scenario) {
    case 'Account Opening':
      return ['Collect Customer Information', 'Verify Identity', 'Credit Check', 'Approve Account', 'Set Up Account'];
    case 'Loan Application':
      return ['Receive Application', 'Assess Credit Score', 'Verify Income', 'Underwriting', 'Approve Loan'];
    case 'Fraud Investigation':
      return ['Detect Suspicious Activity', 'Freeze Account', 'Gather Evidence', 'Interview Customer', 'Resolve Case'];
    case 'Customer Onboarding':
      return ['Collect Documents', 'Verify Information', 'Risk Assessment', 'Compliance Check', 'Activate Services'];
    case 'Dispute Resolution':
      return ['Receive Complaint', 'Investigate Issue', 'Contact Customer', 'Propose Resolution', 'Close Dispute'];
    default:
      return ['Task 1', 'Task 2', 'Task 3'];
  }
}

export { generateCMMN };
