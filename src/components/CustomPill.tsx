import React from 'react'

interface CustomPillProps {
    label: string
    color ?: "bg-principal-color" | "bg-error-color"
}

const CustomPill = ({label, color = "bg-principal-color"}: CustomPillProps) => {
  return (
    <span className={`${color} text-white rounded-lg p-3`}>{label}</span>
  )
}

export default CustomPill