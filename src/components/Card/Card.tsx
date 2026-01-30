import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  content: string;
  className?: string;
};

export default function Card({ title, content, className = "", ...props }: CardProps) {
  return (
    <div
      className={`border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-300 ${className}`}
      {...props}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}
