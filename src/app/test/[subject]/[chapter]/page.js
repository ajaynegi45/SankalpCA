'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { questionBank } from '@/data'
import '@/styles/test.css'

export default function TestPage() {
    const router = useRouter()
    const { subject, chapter: rawChapter } = useParams()

    const chapter = decodeURIComponent(rawChapter || '')
    const fullQuestions = questionBank[subject]?.[chapter] || [];
    const MAX_QUESTIONS = 10

    const [shuffledQuestions, setShuffledQuestions] = useState([])
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState([])
    const [timeLeft, setTimeLeft] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!subject || !chapter || fullQuestions.length === 0) return

        const key = `sankalpca-question-order-${subject}-${chapter}`
        let shuffledIndices = []

        try {
            const savedOrder = sessionStorage.getItem(key)
            const parsed = JSON.parse(savedOrder)

            if (Array.isArray(parsed) && parsed.length > 0 && parsed.length <= fullQuestions.length) {
                shuffledIndices = parsed
            } else {
                throw new Error('Invalid saved shuffle')
            }
        } catch (err) {
            // Generate new shuffled indices
            const indices = Array.from({ length: fullQuestions.length }, (_, i) => i)
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[indices[i], indices[j]] = [indices[j], indices[i]]
            }
            shuffledIndices = indices.slice(0, Math.min(MAX_QUESTIONS, fullQuestions.length))
            sessionStorage.setItem(key, JSON.stringify(shuffledIndices))
        }

        const randomizedQuestions = shuffledIndices.map(i => fullQuestions[i])

        setShuffledQuestions(randomizedQuestions)
        setAnswers(Array(randomizedQuestions.length).fill(null))
        setTimeLeft(30 * randomizedQuestions.length)
    }, [subject, chapter, fullQuestions])


    const handleOptionSelect = (selected) => {
        const updated = [...answers]
        updated[currentQ] = selected
        setAnswers(updated)
    }

    const handleSubmit = async () => {
        if (submitted || shuffledQuestions.length === 0) return
        setSubmitted(true)

        let correct = 0, wrong = 0, skipped = 0
        shuffledQuestions.forEach((q, i) => {
            if (!answers[i]) skipped++
            else if (answers[i] === q.answer) correct++
            else wrong++
        })

        const raw = correct - (wrong * 0.25)
        const percent = shuffledQuestions.length > 0
            ? ((raw / shuffledQuestions.length) * 100).toFixed(2)
            : '0'

        // Store to session and redirect
        sessionStorage.setItem('sankalpca-questions', JSON.stringify(shuffledQuestions))
        sessionStorage.setItem('sankalpca-answers', JSON.stringify(answers))
        sessionStorage.removeItem(`sankalpca-question-order-${subject}-${chapter}`)

        router.push(`/result?correct=${correct}&wrong=${wrong}&skipped=${skipped}&score=${raw}&percent=${percent}&total=${shuffledQuestions.length}`)
    }


    useEffect(() => {
        if (shuffledQuestions.length === 0) return

        if (timeLeft <= 0 && !submitted) {
            handleSubmit()
            return
        }

        if (!submitted) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft, submitted, shuffledQuestions])


    return (
        <div className="test-container">
            <div className="test-header">
                <h1>{chapter}</h1>
                <div className="timer">
                    ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
            </div>

            {shuffledQuestions.length === 0 ? (
                <p>No questions found for this chapter.</p>
            ) : (
                <div className="MCQ-question-box-container">
                    <div className="question-box">
                        <p><b>Q{currentQ + 1}:</b> {shuffledQuestions[currentQ].question}</p>
                        <ul>
                            {shuffledQuestions[currentQ].options.map((opt) => (
                                <li
                                    key={opt}
                                    className={answers[currentQ] === opt ? 'selected' : ''}
                                    onClick={() => handleOptionSelect(opt)}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="navigation-buttons">
                        <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} disabled={currentQ === 0}>Previous</button>
                        <button onClick={() => setCurrentQ(q => Math.min(shuffledQuestions.length - 1, q + 1))} disabled={currentQ === shuffledQuestions.length - 1}>Next</button>
                        <button onClick={() => setCurrentQ(q => Math.min(shuffledQuestions.length - 1, q + 1))} disabled={currentQ === shuffledQuestions.length - 1}>Skip</button>
                        <button className="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}
