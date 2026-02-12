function ProjectCardSkeleton() {
  return (
    <div className="card h-100 shadow-sm p-3">
      <div className="placeholder-glow">
        {/* Title */}
        <span className="placeholder placeholder-sm col-7 mb-3 bg-info"></span>

        {/* Description line 1 */}
        <span className="placeholder placeholder-sm col-12 mb-2 bg-info"></span>

        {/* Description line 2 */}
        <span className="placeholder placeholder-sm col-10 mb-3 bg-info"></span>

        {/* Status badge placeholder */}
        <span className="placeholder placeholder-sm col-4 bg-info"></span>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
