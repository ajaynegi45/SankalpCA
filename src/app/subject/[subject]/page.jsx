'use client';
import { useParams } from 'next/navigation';
import '../../../styles/chapter.css';

const demoSubjectChapters = {
    accounting: [
        {
            title: 'Theoretical Framework',
            units: [
                'Meaning and Scope of Accounting',
                'Accounting Concepts, Principles and Conventions',
                'Capital and Revenue Expenditures and Receipts',
                'Contingent Assets and Contingent Liabilities',
                'Accounting Policies',
                'Accounting as a Measurement Discipline – Valuation Principles, Accounting Estimates',
                'Accounting Standards'
            ]
        },
        {
            title: 'Accounting Process',
            units: [
                'Basic Accounting Procedures – Journal entries',
                'Ledgers',
                'Trial Balance',
                'Subsidiary Books',
                'Cash Book',
                'Rectification of Errors',
            ]
        },
        { title: 'Bank Reconciliation Statement' },
        { title: 'Inventories' },
        { title: 'Depreciation and Amortisation' },
        { title: 'Bills of Exchange and Promissory Notes' },
        {
            title: 'Preparation of Final Accounts of Sole Proprietors',
            units: [
                'Final Accounts of Non-Manufacturing Entities',
                'Final Accounts of Manufacturing Entities'
            ]
        },


        //  Module - 2
        { title: 'Financial Statements of Not-for-Profit Organisations' },
        { title: 'Accounts from Incomplete Records' },
        { title: 'Partnership and LLP Accounts',
            units: [
                'Introduction to Partnership Accounts',
                'Treatment of Goodwill in Partnership Accounts',
                'Admission of a New Partner',
                'Retirement of a Partner',
                'Death of a Partner',
                'Dissolution of Partnership Firms and LLPs'
            ]
        },
        { title: 'Company Accounts',
            units: [
                'Introduction to Company Accounts',
                'Issue, Forfeiture and Re-Issue of Shares',
                'Issue of Debentures',
                'Accounting for Bonus Issue and Right Issue',
                'Redemption of Preference Shares',
                'Redemption of Debentures'
            ]
        },
    ],






    'business-laws': [
        { title: 'Indian Regulatory Framework' },
        { title: 'The Indian Contract Act, 1872',
            units: [
                'Nature of Contracts',
                'Consideration',
                'Other Essential Elements of a Contract',
                'Performance of Contract',
                'Breach of Contract and its Remedies',
                'Contingent and Quasi Contracts',
                'Contract of Indemnity and Guarantee',
                'Bailment and Pledge',
                'Agency'
            ]
        },
        { title: 'The Sale of Goods Act, 1930',
            units: [
                'Formation of the Contract of Sale',
                'Conditions & Warranties',
                'Transfer of Ownership and Delivery of Goods',
                'Unpaid Seller',
            ]
        },
        { title: 'The Indian Partnership Act, 1932',
            units: [
                'General Nature of Partnership',
                'Relations of Partners',
                'Registration and Dissolution of a Firm',
            ]
        },
        { title: 'The Limited Liability Partnership Act, 2008' },
        { title: 'The Companies Act, 2013' },
        { title: 'The Negotiable Instruments Act, 1881' },
    ],









    'quantitative-aptitude': [

        // PART-A: BUSINESS MATHEMATICS
        { title: 'Ratio and Proportion, Indices, Logarithms' },
        { title: 'Equations' },
        { title: 'Linear Inequalities' },
        { title: 'Mathematics of Finance' },
        { title: 'Basic Concepts of Permutations and Combinations' },
        { title: 'Sequence and Series – Arithmetic and Geometric Progressions' },
        { title: 'Sets, Relations and Functions, Basics of Limits and Continuity functions' },
        { title: 'Basic Applications of Differential and Integral Calculus in Business and Economics' , units: ['Differential Calculus', 'Integral Calculus']},

        // PART-B: LOGICAL REASONING
        { title: 'Number Series, Coding and Decoding and Odd Man Out' },
        { title: 'Direction Sense Test' },
        { title: 'Seating Arrangements' },
        { title: 'Blood Relations' },


        // PART-C: STATISTICS
        { title: 'Statistics' , units: ['Statistical Description of Data', 'Sampling']},
        { title: 'Measures of Central Tendency and Dispersion' , units: ['Measures of Central Tendency', ' Dispersion']},
        { title: 'Probability' },
        { title: 'Theoretical Distributions' },
        { title: 'Correlation and Regression' },
        { title: 'Index Numbers' },

    ],










'business-economics': [
    { title: 'Nature & Scope of Business Economics',
        units: [
            'Introduction',
            'Basic Problems of an Economy & Role of Price Mechanism',
        ]
    },
    { title: 'Theory of Demand and Supply',
        units: [
            'Law of Demand and Elasticity of Demand',
            'Theory of Consumer Behaviour',
            'Supply',
        ]
    },
    { title: 'Theory of Production and Cost',
        units: [
            'Theory of Production',
            'Theory of Cost',
        ]
    },
    { title: 'Price Determination in Different Markets',
        units: [
            'Meaning and Types of Markets',
            'Determination of Prices',
            'Price Output Determination under Different Market Forms'
        ]
    },
    { title: 'Business Cycles'},
    { title: 'Determination of National Income',
        units: [
            'National Income Accounting',
            'The Keynesian Theory of Determination of National Income',
        ]
    },
    { title: 'Public Finance',
        units: [
            'Fiscal Functions: An Overview, Centre and State Finance',
            'Market Failure/ Government intervention to correct Market Failure',
            'The Process of Budget Making: Sources of Revenue, Expenditure Management and Management of Public Debt',
            'Fiscal Policy'
        ]
    },
    { title: 'Money Market',
        units: [
            'The Concept of Money Demand: Important Theories',
            'The Concept of Money Supply',
            'Monetary Policy',
        ]
    },
    { title: 'International Trade',
        units: [
            'Theories of International Trade',
            'The Instruments of Trade Policy',
            'Trade Negotiations',
            'Exchange Rate and Its Economic Effects',
            'International Capital Movements'
        ]
    },
    { title: 'Indian Economy'},


]
};

const subjectNames = {
    accounting: 'Accounting',
    'business-laws': 'Business Laws',
    'quantitative-aptitude': 'Quantitative Aptitude',
    'business-economics': 'Business Economics'
};

export default function SubjectChaptersPage() {
    const { subject } = useParams();
    const chapters = demoSubjectChapters[subject];
    const subjName = subjectNames[subject];

    if (!chapters) {
        return (
            <main className="subjects-container" style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Subject Not Found</h1>
                <p style={{ color: 'var(--error)', marginTop: '2rem', textAlign: 'center' }}>No chapters found for this subject.</p>
            </main>
        );
    }

    return (
        <main className="subject-chapter-container">
            <h1 style={{ marginBottom: '1.5rem' }}>Select Chapter – {subjName}</h1>

            <div className="chapter-list-container">
                {chapters.map((chapter, idx) => (
                    <div key={chapter.title} className="chapter-container">
                        { chapter.units && chapter.units.length > 0 ?
                            (<div className="chapter-title">Chapter {idx + 1}: {chapter.title}</div> )
                            :
                            (  <a
                                className="chapter-title"
                                href={`/test/${subject}/${encodeURIComponent(chapter.title)}`}
                            >
                                Chapter {idx + 1}: {chapter.title}
                            </a> )
                        }<></>
                        {chapter.units && chapter.units.length > 0 ? (
                            <ul>
                                {chapter.units.map((unit, uidx) => (
                                    <li key={unit}>
                                        <a
                                            className="chapter-name"
                                            href={`/test/${subject}/${encodeURIComponent(unit)}`}
                                        >
                                            {unit}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (<>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
