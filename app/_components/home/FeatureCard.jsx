import React from 'react'

function FeatureCard({icon, title, description}) {
  return (
    <div className="bg-white rounded-2xl border p-5 flex gap-4">
      <div className="bg-primary/10 h-12 w-12 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-lg">
          {title}
        </h3>
        <p className="text-gray-600 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard
