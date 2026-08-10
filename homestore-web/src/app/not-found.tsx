export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-gray-500">Could not find requested resource</p>
      </div>
    </div>
  );
}
