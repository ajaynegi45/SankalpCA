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





    // 📌 New subject chart ref
    const subjectChartRef = useRef(null)
    const subjectChartInstance = useRef(null)
    const [subjectData, setSubjectData] = useState({})

    useEffect(() => {
        const raw = localStorage.getItem('sankalpca-subject-stats')
        if (raw) setSubjectData(JSON.parse(raw))
    }, [])

    useEffect(() => {
        if (!subjectChartRef.current || !Object.keys(subjectData).length) return

        if (subjectChartInstance.current) subjectChartInstance.current.destroy()

        subjectChartInstance.current = new Chart(subjectChartRef.current, {
            type: 'radar',
            data: {
                labels: Object.keys(subjectData),
                datasets: [{
                    label: 'Tests per Subject',
                    data: Object.values(subjectData),
                    backgroundColor: 'rgba(0, 173, 181, 0.2)',
                    borderColor: '#00ADB5',
                    pointBackgroundColor: '#00ADB5',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw} test(s)`
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: '#919191'
                        },
                        grid: {
                            color: 'rgb(54, 162, 235)'
                        },
                        pointLabels: {
                            color: '#ffffff'
                        },
                        ticks: {
                            beginAtZero: true,
                            color: '#000000'
                        }
                    }
                }
            }
        })
    }, [subjectData])


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
                        <p><b>Joined:</b> {user.joinedAt}</p>
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


                    <h2 className="profile-heading">📚 Subjects You&#39;ve Practiced</h2>
                    <div className="profile-chart-container">
                        <canvas ref={subjectChartRef} width={300} height={300}></canvas>
                    </div>

                </>
            )}
        </main>
    )
}
