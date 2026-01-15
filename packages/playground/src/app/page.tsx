'use client';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          TaskML Playground
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Write TaskML on the left, see the visualization on the right.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Editor
            </h2>
            <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded border">
              {/* Monaco Editor will go here */}
              <textarea
                className="w-full h-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
                placeholder={`@project My Project
@sprint Sprint 1

[x] Set up project #p0
[~] Implement feature #p1 ~4h @alice
[ ] Write tests #p2`}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Preview
            </h2>
            <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded border p-4">
              <p className="text-gray-500 dark:text-gray-400 text-center mt-32">
                Preview will render here
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
