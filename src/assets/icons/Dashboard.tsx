import React from 'react'

type Props = {
    className?: string
}

const Dashboard = (props: Props) => {
    const { className } = props

    return (
        <span className={className}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21v-2h20v2H2Zm1-3v-7h3v7H3Zm5 0V6h3v12H8Zm5 0V9h3v9h-3Zm5 0V3h3v15h-3Z" />
            </svg>
        </span>
    )
}

export default Dashboard