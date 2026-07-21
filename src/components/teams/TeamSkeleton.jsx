function TeamSkeleton() {
  return (
    <main className="placeholder-glow">
      <section className="card border-0 shadow-sm mb-4 overflow-hidden">
        <div className="card-body p-3 p-md-4 d-flex flex-column flex-md-row justify-content-between gap-3 border-bottom">
          <div className="d-flex align-items-center gap-3 min-w-0 w-100">
            <div
              className="placeholder rounded w-100"
              style={{ maxWidth: "360px", height: "32px" }}
            ></div>
          </div>

          <div className="d-flex flex-column flex-sm-row flex-md-nowrap gap-2">
            <div
              className="placeholder rounded"
              style={{ width: "118px", height: "38px" }}
            ></div>
            <div
              className="placeholder rounded"
              style={{ width: "130px", height: "38px" }}
            ></div>
          </div>
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row align-items-stretch g-4">
            <div className="col-lg-8">
              <div className="placeholder col-4 col-sm-3 col-lg-2 mb-3"></div>
              <div
                className="placeholder col-12 col-md-10 mb-3"
                style={{ height: "18px", maxWidth: "620px" }}
              ></div>
              <div
                className="placeholder col-12 col-md-8 mb-4"
                style={{ height: "18px", maxWidth: "520px" }}
              ></div>

              <div className="d-flex flex-column flex-sm-row gap-4 gap-sm-5">
                <div className="d-flex align-items-center gap-3 min-w-0">
                  <span
                    className="placeholder rounded-circle flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  ></span>
                  <div className="min-w-0 w-100">
                    <div className="placeholder col-7 mb-2"></div>
                    <div className="placeholder col-10"></div>
                  </div>
                </div>

                <div className="vr d-none d-sm-block"></div>

                <div className="d-flex align-items-center gap-3 min-w-0">
                  <span
                    className="placeholder rounded flex-shrink-0"
                    style={{ width: "34px", height: "34px" }}
                  ></span>
                  <div className="min-w-0 w-100">
                    <div className="placeholder col-7 mb-2"></div>
                    <div className="placeholder col-10"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="border rounded-3 p-3 p-sm-4 bg-light-subtle h-100 d-flex align-items-center justify-content-center justify-content-lg-start gap-3 gap-sm-4 text-center text-sm-start">
                <span
                  className="placeholder rounded-circle flex-shrink-0"
                  style={{ width: "76px", height: "76px" }}
                ></span>
                <div className="w-100">
                  <div className="placeholder col-8 mb-3"></div>
                  <div className="placeholder col-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TeamSkeleton;
