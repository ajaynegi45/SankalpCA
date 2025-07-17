'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../../styles/result.css'

export default function ResultPage() {
    const params = useSearchParams()
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const qs = JSON.parse(sessionStorage.getItem('sankalpca-questions') || '[]')
        const ans = JSON.parse(sessionStorage.getItem('sankalpca-answers') || '[]')
        setQuestions(qs)
        setAnswers(ans)
    }, []);


    const correct = parseInt(params.get('correct'))
    const wrong = parseInt(params.get('wrong'))
    const skipped = parseInt(params.get('skipped'))
    const score = parseFloat(params.get('score'))
    const percent = parseFloat(params.get('percent'))
    const total = parseInt(params.get('total'))

    return (
        <div className="result-container">
            <h1>Result Summary</h1>
            <div className="result-grid">
                <div><strong>Correct:</strong> {correct}</div>
                <div><strong>Total Questions:</strong> {total}</div>
                <div><strong>Wrong:</strong> {wrong}</div>
                <div><strong>Score:</strong> {score} / {total}</div>
                <div><strong>Skipped:</strong> {skipped}</div>
                <div><strong>Percentage:</strong> {percent}%</div>
            </div>


            <h2 className="review-title">Detailed Review</h2>
            <div className="review-container">
                {questions.map((q, index) => {
                    const selected = answers[index]
                    const isCorrect = selected === q.answer
                    const isSkipped = !selected

                    return (
                        <div className={`review-card ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`} key={index}>
                            <p><strong>Q{index + 1}:</strong> {q.question}</p>
                            <p>
                                <strong>Your Answer:</strong>{' '}
                                <span className={isSkipped ? '' : isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                                    {selected || 'Not Answered'}
                                </span>
                            </p>
                            <p><strong>Correct Answer:</strong> <span className="correct-answer">{q.answer}</span></p>
                            <p><strong>Explanation:</strong> {q.explanation}</p>
                        </div>

                    )
                })}
            </div>

            <a href="/subjects" className="retake-link">Take Another Test</a>
        </div>
    )
}
