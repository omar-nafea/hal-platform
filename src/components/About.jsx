export default function About() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About This App</h1>
      <p className="mb-4">
        This is a demo application built to showcase the integration of several key technologies in the React ecosystem.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>React:</strong> For building the user interface.</li>
        <li><strong>React Router:</strong> For client-side routing and navigation.</li>
        <li><strong>Axios:</strong> For making HTTP requests to fetch data from an API.</li>
        <li><strong>Tailwind CSS:</strong> For utility-first styling.</li>
      </ul>
    </div>
  );
}