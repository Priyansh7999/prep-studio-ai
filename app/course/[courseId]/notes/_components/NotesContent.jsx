import React from "react";
function NotesContent({ content }) {
  const styleContent = (content) => {
    if (!content) return "";
    return content
      .replace(
        /<h3>/g,
        `<h3 class="text-3xl font-bold text-gray-900 mt-10 mb-5">`
      )
      .replace(
        /<h4>/g,
        `<h4 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">`
      )
      .replace(
        /<p>/g,
        `<p class="text-[17px] text-gray-700 leading-8 mb-5">`
      )
      .replace(
        /<ul>/g,
        `<ul class="list-disc pl-6 mb-6 space-y-3 text-gray-700">`
      )
      .replace(
        /<li>/g,
        `<li class="leading-7">`
      )
      .replace(
        /<code>/g,
        `<code class="bg-gray-100 text-primary px-2 py-1 rounded-md text-sm font-medium">`
      );
  };
  return (
    <div className="bg-white border rounded-3xl shadow-sm p-8 md:p-12">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: styleContent(content || ""),
        }}
      />
    </div>
  );
}
export default NotesContent;