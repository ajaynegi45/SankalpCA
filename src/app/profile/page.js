'use client'

import { useEffect, useState, useRef } from 'react'
import UserInfoForm from '../../components/UserInfoForm'
import Chart from 'chart.js/auto'
import '../../styles/profile.css'

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [stats, setStats] = useState({ correct: 0, wrong: 0, skipped: 0, tests: 0 })
    const [percent, setPercent] = useState(0)
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('sankalpca-user')
        if (storedUser) setUser(JSON.parse(storedUser))

        const rawStats = localStorage.getItem('sankalpca-stats')
        if (rawStats) {
            const parsedStats = JSON.parse(rawStats)
            setStats({
                correct: parsedStats.totalCorrect,
                wrong: parsedStats.totalWrong,
                skipped: parsedStats.totalSkipped,
                tests: parsedStats.totalTests
            })

            const total = parsedStats.totalCorrect + parsedStats.totalWrong + parsedStats.totalSkipped
            const score = parsedStats.totalCorrect - 0.25 * parsedStats.totalWrong
            const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0
            setPercent(percentage)
        }
    }, [])

    useEffect(() => {
        if (!chartRef.current || !stats.correct && !stats.wrong && !stats.skipped) return

        if (chartInstance.current) chartInstance.current.destroy()

        chartInstance.current = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Wrong', 'Skipped'],
                datasets: [{
                    label: 'Test Performance',
                    data: [stats.correct, stats.wrong, stats.skipped],
                    backgroundColor: ['#34C759', '#FF3B30', '#A1A1A1'],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        })
    }, [stats])

    return (
        <main className="profile-container">
            {!user ? (
                <UserInfoForm onSubmit={(data) => {
                    localStorage.setItem('sankalpca-user', JSON.stringify(data))
                    setUser(data)
                }} />
            ) : (
                <>
                    <h1 className="profile-heading">👤 Your Profile</h1>
                    <div className="profile-card">
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>CA Level:</b> {user.level}</p>
                    </div>

                    <h2 className="profile-heading">📊 Your Test Performance</h2>
                    <div className="profile-chart-container">
                        <canvas ref={chartRef} width={280} height={280} />
                    </div>

                    <div className="profile-stats">
                        <p><b>Total Tests:</b> {stats.tests}</p>
                        <p><b>Correct:</b> {stats.correct}</p>
                        <p><b>Wrong:</b> {stats.wrong}</p>
                        <p><b>Skipped:</b> {stats.skipped}</p>
                        <p><b>Overall Percentage:</b> {percent}%</p>
                    </div>
                </>
            )}
        </main>
    )
}
