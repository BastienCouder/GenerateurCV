import PdfForm from "./components/pdf-form";

function App() {
  return (
    <>
      <main className="px-24 pt-10 pb-16 space-y-6 w-full">
        <h1>Générez votre CV</h1>
        <section>
          <PdfForm />
        </section>
      </main>
    </>
  );
}

export default App;
