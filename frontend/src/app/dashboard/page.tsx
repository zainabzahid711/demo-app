// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            Welcome to your dashboard! You have successfully signed up.
          </p>
          {/* Add more dashboard content here */}
        </div>
      </div>
    </div>
  );
}
