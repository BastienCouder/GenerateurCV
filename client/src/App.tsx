import PdfForm from "./components/pdf-form";

function App() {
  return (
    <>
      <main className="px-8 py-8 lg:px-24 lg:pt-10 lg:pb-16 space-y-6 w-full">
        <h1>Générez votre CV</h1>
        <section>
          <PdfForm />
        </section>
      </main>
    </>
  );
}

export default App;
