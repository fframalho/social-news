import React from "react"

interface TextAreaProps {
    id: string
    label: string
    rows: number
    value?: string
    error?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ id, label, rows, error, ...rest }, ref) => (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={ id } data-testid={ `${id}-label` }>{ label }</label>
            <textarea
                id={ id }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                data-testid={ id }
                placeholder="Your message"
                rows={ rows }
                ref={ ref }
                { ...rest }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
)

export default TextArea
