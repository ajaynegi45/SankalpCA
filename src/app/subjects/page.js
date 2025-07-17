// app/subjects/page.js
'use client'
import Link from 'next/link'
import '@//styles/subjects.css'

const subjects = {
    'accounting': ['Final Accounts', 'Depreciation'],
    'business-laws': ['Indian Contract Act', 'Sale of Goods Act'],
    'business-mathematics': ['Ratio & Proportion', 'Logarithms'],
    'business-economics': ['Demand & Supply', 'Market Structure']
}

export default function SubjectsPage() {
    return (
        <main className="subjects-container">
            <h1>Select Subject & Chapter</h1>
            <div className={"subjects-list-container"}>
            {Object.entries(subjects).map(([subject, chapters]) => (
                <div key={subject} className="subject-block">
                    <h2>{subject.replace('-', ' ').toUpperCase()}</h2>
                    <ul>
                        {chapters.map((chapter) => (
                            <li key={chapter}>
                                <Link className={"chapter-name"}  href={`/test/${subject}/${encodeURIComponent(chapter)}`}>
                                    {chapter}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        </main>
    )
}
