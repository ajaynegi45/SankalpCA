// data/business-law.js
export const questions = {
    'Indian Contract Act': [
        {
            question: 'Which section of Indian Contract Act defines a contract?',
            options: ['Section 2(e)', 'Section 2(h)', 'Section 10', 'Section 73'],
            answer: 'Section 2(h)',
            explanation: 'Section 2(h) of the Indian Contract Act defines contract as an agreement enforceable by law.'
        },
        {
            question: 'Which of the following is not essential for a valid contract?',
            options: ['Free consent', 'Lawful object', 'Adequate consideration', 'Competency of parties'],
            answer: 'Adequate consideration',
            explanation: 'Adequacy of consideration is not required, only lawful consideration is.'
        },
        {
            question: 'Which element invalidates consent under Section 14?',
            options: [
                'Unilateral mistake',
                'Coercion',
                'Absence of written proof',
                'Inadequate consideration'
            ],
            answer: 'Coercion',
            explanation: 'Consent is not free if caused by coercion (Sec 15), undue influence (Sec 16), fraud (Sec 17), misrepresentation (Sec 18), or mistake (Sec 20-22).'
        },
        {
            question: 'Consideration must be:',
            options: [
                'Adequate and monetary',
                'Given by the promisee only',
                'Lawful and real',
                'In writing for contracts > ₹100'
            ],
            answer: 'Lawful and real',
            explanation: 'Section 23 requires consideration to be lawful. It need not be adequate (Sec 25) and may flow from any person (Sec 2(d)).'
        },{
            question: 'A contract with a person of unsound mind is:',
            options: [
                'Valid if approved by guardian',
                'Voidable at minor\'s option',
                'Void ab initio',
                'Enforceable after ratification'
            ],
            answer: 'Void ab initio',
            explanation: 'Section 11 declares contracts by persons incompetent to contract (minors, unsound mind, disqualified by law) as void.'
        },{
            question: 'A contingent contract depends on:',
            options: [
                'Mutual promises',
                'Future uncertain event',
                'Third-party approval',
                'Penalty clauses'
            ],
            answer: 'Future uncertain event',
            explanation: 'Section 31 defines contingent contracts as those enforceable only upon happening/non-happening of specified uncertain future events.'
        },{
            question: 'A contract is discharged by novation under:',
            options: [
                'Section 62',
                'Section 56',
                'Section 73',
                'Section 40'
            ],
            answer: 'Section 62',
            explanation: 'Section 62 allows discharge by novation (substituting new contract), rescission, or alteration.'
        },{
            question: 'Claim for "necessaries" supplied to incompetent persons is covered under:',
            options: [
                'Section 68',
                'Section 69',
                'Section 70',
                'Section 72'
            ],
            answer: 'Section 68',
            explanation: 'Section 68 entitles reimbursement for necessaries supplied to incompetent persons (minors/unsound mind).'
        },{
            question: 'Compensation for breach of contract under Section 73:',
            options: [
                'Includes penalty charges',
                'Requires actual loss proof',
                'Covers remote damages',
                'Mandates criminal prosecution'
            ],
            answer: 'Requires actual loss proof',
            explanation: 'Section 73 provides compensation only for natural/ordinary losses arising directly from breach, not remote damages.'
        }
    ]
}
