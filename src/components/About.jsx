export default function About() {
  return (
    <div className="bg-secondary p-10 rounded-xl shadow-lg max-w-2xl mx-auto border border-accent/30">
      <h1 className="text-4xl font-serif font-bold text-text-primary mb-6">About This App</h1>
      <p className="text-text-secondary mb-6 leading-relaxed">
        This is a demo application built to showcase the integration of several key technologies in the React ecosystem.
      </p>
      <ul className="space-y-4">
        <li className="bg-primary p-4 rounded-lg shadow-md"><strong>React:</strong> For building the user interface.</li>
        <li className="bg-primary p-4 rounded-lg shadow-md"><strong>React Router:</strong> For client-side routing and navigation.</li>
        <li className="bg-primary p-4 rounded-lg shadow-md"><strong>Axios:</strong> For making HTTP requests to fetch data from an API.</li>
        <li className="bg-primary p-4 rounded-lg shadow-md"><strong>Tailwind CSS:</strong> For utility-first styling.</li>
      </ul>
    </div>
  );
}
