function ReportSkeleton() {
  return (
    <main className="placeholder-glow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="placeholder col-4 col-md-2"></div>
      </div>
      <div className="row g-4">
        {[1, 2, 3].map((card) => (
          <div className="col-12 col-md-4" key={card}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="placeholder col-7 mb-3"></div>
                <div className="placeholder col-4 placeholder-lg"></div>
              </div>
            </div>
          </div>
        ))}
        {[1, 2, 3].map((card) => (
          <div className="col-12 col-lg-6" key={card}>
            <div className="card border-0 shadow-sm">
              <div className="card-body" style={{ height: "330px" }}>
                <div className="placeholder col-6 mb-4"></div>
                <div className="placeholder col-12 h-75"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ReportSkeleton;
