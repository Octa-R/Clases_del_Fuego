
export default function TimePickerComponent({ value, onChange }: { value: string, onChange: (value: string) => void }){
    return (
        <div className="relative">
            <input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                required
                type="time"
                step="900"
                className="bg-white border leading-none border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-none" />
        </div>
    )
}