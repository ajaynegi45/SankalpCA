'use client';
import Link from 'next/link';
import '../../styles/subjects.css'; // make sure to copy CSS from step 3!

const subjects = [
    { key: 'accounting', name: 'Accounting' },
    { key: 'business-laws', name: 'Business Laws' },
    { key: 'quantitative-aptitude' , name: 'Quantitative Aptitude' },
    { key: 'business-economics', name: 'Business Economics' }
];

export default function SubjectsPage() {
    return (
        <main className="subjects-container">
            <h1>Select a Subject</h1>
            <div className="subjects-list-container">
                {subjects.map(subject => (
                    <Link
                        key={subject.key}
                        className="subject-link"
                        href={`/subject/${subject.key}`}
                    >
                        <div className="subject-block subject-block-hover">
                            <span className="subject-title">{subject.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
