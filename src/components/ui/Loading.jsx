export default function Loading({ loading }) {
  return (
    <>
      {loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 delay-150"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 delay-300"></div>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">Cargando...</p>
        </div>
      )}
    </>
  );
}
