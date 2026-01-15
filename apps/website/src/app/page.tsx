export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            TaskML
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The text-based protocol for AI agent task visualization.
            Simple syntax. Powerful views. Built for AI.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://playground.taskml.dev"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Try Playground
            </a>
            <a
              href="https://github.com/yuvalsuede/taskml"
              className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg font-semibold"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why TaskML?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Human Readable</h3>
              <p className="text-gray-600">
                Plain text format that&apos;s easy to read without tooling
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Native</h3>
              <p className="text-gray-600">
                Designed for AI agents to generate and parse
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Views</h3>
              <p className="text-gray-600">
                List, Kanban, Timeline, Graph and more
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
