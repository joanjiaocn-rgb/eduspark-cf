'use client';

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const subjects = [
  'Mathematics',
  'Science',
  'English Language Arts',
  'Social Studies',
  'History',
  'Geography',
  'Art',
  'Music',
  'Physical Education',
  'Computer Science',
  'Foreign Language',
  'Health',
];

export default function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
}
