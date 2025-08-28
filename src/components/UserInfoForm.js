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

        const userData = { name, level, email, joinedAt }

        localStorage.setItem('sankalpca-user', JSON.stringify(userData))
        onSubmit(userData)
    }

    return (
        <div style={{
            padding: '20px',
            background: '#393E46',
            borderRadius: '8px',
            color: '#EEEEEE',
            margin: '40px auto',
            width: '100%',
            maxWidth: '500px',
        }}>
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ margin: '1rem 0', display: 'block' }}>
                    Name:
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            display: 'block',
                            marginTop: '5px',
                            marginBottom: '20px',
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    />
                </label>

                <label style={{ margin: '1rem 0', display: 'block' }}>
                    CA Level:
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        style={{
                            display: 'block',
                            marginTop: '5px',
                            marginBottom: '20px',
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    >
                        <option value="Foundation">Foundation</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Final">Final</option>
                    </select>
                </label>

                <label style={{ margin: '1rem 0', display: 'block' }}>
                    Email:
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            display: 'block',
                            marginTop: '5px',
                            marginBottom: '20px',
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    />
                </label>

                <button
                    type="submit"
                    style={{
                        background: '#00ADB5',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Save & Continue
                </button>
            </form>
        </div>
    )
}
