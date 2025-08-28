'use client'

import { useEffect, useState, useMemo, useCallback, useRef, memo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import UserInfoForm from '../../../../../components/UserInfoForm'
import { questionBank } from '../../../../../data'
import '../../../../../styles/test.css'
import Link from "next/link"

export default function TestPage() {
    const router = useRouter()
    const { subject, chapter: rawChapter, unit: rawUnit } = useParams()

    const chapter = decodeURIComponent(rawChapter || '')
    const unit = decodeURIComponent(rawUnit || '')

    // ✅ Initialize userInfo from localStorage immediately (no flicker)
    const [userInfo, setUserInfo] = useState(() => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("sankalpca-user")
            return savedUser ? JSON.parse(savedUser) : null
        }
        return null
    })

    const fullQuestions = useMemo(
        () => questionBank[subject]?.[chapter]?.[unit] ?? [],
        [subject, chapter, unit]
    )

    const MAX_QUESTIONS = 20

    const [shuffledQuestions, setShuffledQuestions] = useState([])
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState([])
    const [submitted, setSubmitted] = useState(false)

    // Refs to hold the latest values
    const answersRef = useRef(answers)
    const shuffledRef = useRef(shuffledQuestions)
    const submittedRef = useRef(submitted)

    useEffect(() => { answersRef.current = answers }, [answers])
    useEffect(() => { shuffledRef.current = shuffledQuestions }, [shuffledQuestions])
    useEffect(() => { submittedRef.current = submitted }, [submitted])

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
        } catch {
            // Generate new shuffled indices
            const indices = Array.from({length: fullQuestions.length}, (_, i) => i)
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

        shuffledRef.current = randomizedQuestions
        answersRef.current = Array(randomizedQuestions.length).fill(null)

    }, [subject, chapter, fullQuestions])


    const handleOptionSelect = (selected) => {
        const updated = [...answers]
        updated[currentQ] = selected
        setAnswers(updated)
        answersRef.current = updated
    }

    const handleSubmit = useCallback(async () => {
        if (submittedRef.current || shuffledRef.current.length === 0) return
        setSubmitted(true)
        submittedRef.current = true

        const localShuffled = shuffledRef.current
        const localAnswers = answersRef.current

        let correct = 0, wrong = 0, skipped = 0
        localShuffled.forEach((q, i) => {
            if (!localAnswers[i]) skipped++
            else if (localAnswers[i] === q.answer) correct++
            else wrong++
        })

        const raw = correct - (wrong * 0.25)
        const percent = localShuffled.length > 0
            ? ((raw / localShuffled.length) * 100).toFixed(2)
            : '0'

        // Update overall stats
        const prevStatsRaw = localStorage.getItem('sankalpca-stats')
        const prevStats = prevStatsRaw ? JSON.parse(prevStatsRaw) : {
            totalCorrect: 0, totalWrong: 0, totalSkipped: 0, totalTests: 0
        }

        const newStats = {
            totalCorrect: prevStats.totalCorrect + correct,
            totalWrong: prevStats.totalWrong + wrong,
            totalSkipped: prevStats.totalSkipped + skipped,
            totalTests: prevStats.totalTests + 1
        }

        localStorage.setItem('sankalpca-stats', JSON.stringify(newStats))

        // Update subject-wise stats
        const subjectStatsRaw = localStorage.getItem('sankalpca-subject-stats')
        const subjectStats = subjectStatsRaw ? JSON.parse(subjectStatsRaw) : {}
        subjectStats[subject] = (subjectStats[subject] || 0) + 1
        localStorage.setItem('sankalpca-subject-stats', JSON.stringify(subjectStats))

        // Store for results page
        sessionStorage.setItem('sankalpca-questions', JSON.stringify(localShuffled))
        sessionStorage.setItem('sankalpca-answers', JSON.stringify(localAnswers))
        sessionStorage.removeItem(`sankalpca-question-order-${subject}-${chapter}`)

        router.push(`/result?correct=${correct}&wrong=${wrong}&skipped=${skipped}&score=${raw}&percent=${percent}&total=${localShuffled.length}`)
    }, [subject, chapter, router])

    const handleExpire = useCallback(() => {
        void handleSubmit()
    }, [handleSubmit])

    const initialSeconds = (shuffledQuestions.length > 0) ? 70 * shuffledQuestions.length : 0

    return (
        <>
            {
                !userInfo ? (
                    <UserInfoForm onSubmit={setUserInfo}/>
                ) : (
                    <div className="test-container">
                        <div className="test-header">
                            <h1>{unit}</h1>
                            <Timer initialSeconds={initialSeconds} onExpire={handleExpire} paused={submitted} />
                        </div>

                        {shuffledQuestions.length === 0 ? (
                            <div className="no-questions-container">
                                <p>No questions found for this chapter.</p>
                                <Link href={`/subject/${subject}`}>Select Another Chapter</Link>
                            </div>
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
                                    <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
                                            disabled={currentQ === 0}>Previous
                                    </button>
                                    <button onClick={() => setCurrentQ(q => Math.min(shuffledQuestions.length - 1, q + 1))}
                                            disabled={currentQ === shuffledQuestions.length - 1}>Next
                                    </button>
                                    <button onClick={() => setCurrentQ(q => Math.min(shuffledQuestions.length - 1, q + 1))}
                                            disabled={currentQ === shuffledQuestions.length - 1}>Skip
                                    </button>
                                    <button className="submit" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
        </>
    )
}

const Timer = memo(function Timer({ initialSeconds, onExpire, paused = false }) {
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        setSeconds(initialSeconds)
    }, [initialSeconds])

    useEffect(() => {
        if (paused) return

        if (seconds <= 0) {
            onExpire?.()
            return
        }

        const id = setInterval(() => {
            setSeconds(s => {
                if (s <= 1) {
                    clearInterval(id)
                    onExpire?.()
                    return 0
                }
                return s - 1
            })
        }, 1000)

        return () => clearInterval(id)
    }, [seconds, paused])

    return (
        <div className="timer">
            ⏱️ {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </div>
    )
})
