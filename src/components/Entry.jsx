function Entry() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-8">
      <div className="flex flex-col justify-center items-center gap-2 text-sm text-vsdark-5">
        <p>Open or create a new file to start fake coding.</p>
        <p>
          Contrubute to this project on{" "}
          <a
            href="#" // Replace with the GitHub repo link
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default Entry;
