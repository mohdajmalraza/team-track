function SettingsSkeleton() {
  return (
    <div className="row g-4">
      {/* Profile Card Skeleton */}
      <div className="col-lg-6">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div className="placeholder-glow mb-4">
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8 mt-2"></span>
            </div>

            <div className="mb-3">
              <span className="placeholder col-4"></span>
              <span
                className="placeholder col-12 mt-2"
                style={{ height: "38px" }}
              ></span>
            </div>

            <div className="mb-4">
              <span className="placeholder col-4"></span>
              <span
                className="placeholder col-12 mt-2"
                style={{ height: "38px" }}
              ></span>
            </div>

            <span
              className="placeholder btn btn-info disabled col-4"
              style={{ height: "40px" }}
            ></span>
          </div>
        </div>
      </div>

      {/* Password Card Skeleton */}
      <div className="col-lg-6">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div className="placeholder-glow mb-4">
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8 mt-2"></span>
            </div>

            {[1, 2, 3].map((item) => (
              <div className="mb-3" key={item}>
                <span className="placeholder col-4"></span>

                <span
                  className="placeholder col-12 mt-2"
                  style={{ height: "38px" }}
                ></span>
              </div>
            ))}

            <span
              className="placeholder btn btn-warning disabled col-5"
              style={{ height: "40px" }}
            ></span>
          </div>
        </div>
      </div>

      {/* Summary Card Skeleton */}
      <div className="col-12">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div className="placeholder-glow mb-4">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-7 mt-2"></span>
            </div>

            <div className="row g-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="col-md-6 col-lg" key={item}>
                  <div className="border rounded-4 p-3">
                    <div
                      className="placeholder rounded-circle mb-3"
                      style={{
                        width: "55px",
                        height: "55px",
                      }}
                    ></div>

                    <span className="placeholder col-6"></span>

                    <br />

                    <span className="placeholder col-8 mt-2"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSkeleton;
