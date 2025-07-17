'use client'

import { useState } from 'react'

export default function UserInfoForm({ onSubmit }) {
    const [name, setName] = useState('')
    const [level, setLevel] = useState('Foundation')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        const today = new Date()
        const joinedAt = `${monthNames[today.getMonth()]} ${String(today.getDate()).padStart(2, '0')} ${today.getFullYear()}`

        const userData = {
            name,
            level,
            email,
            joinedAt, // 👈 Add formatted date
        }

        localStorage.setItem('sankalpca-user', JSON.stringify(userData))
        onSubmit(userData)
    }


    return (
        <div className="user-info-form">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    CA Level:
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="Foundation">Foundation</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Final">Final</option>
                    </select>
                </label>

                <label>
                    Email:
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <button type="submit">Save & Continue</button>
            </form>

            <style jsx>{`
                .user-info-form {
                    padding: 20px;
                    background: #393E46;
                    border-radius: 8px;
                    color: #EEEEEE;
                    margin: 40px auto;
                    width: 100%;
                    max-width: 500px;
                }
                input, select {
                    display: block;
                    margin-top: 5px;
                    margin-bottom: 20px;
                    width: 100%;
                    padding: 8px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    font-size: 1rem;
                }
                label {
                    margin: 1rem 0;
                    display: block;
                }
                button {
                    background: #00ADB5;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    font-size: 1rem;
                    cursor: pointer;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
}
