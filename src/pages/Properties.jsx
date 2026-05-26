import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import allProperties from "../data/properties";
import FilterBar from "../components/properties/FilterBar";
import PropertyGrid from "../components/properties/PropertyGrid";

export default function Properties() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    bhk: "all",
    minPrice: "",
    maxPrice: "",
    sort: "default",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Read query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = {
      search: params.get("search") || "",
      type: params.get("type") || "all",
      bhk: params.get("bhk") || "all",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      sort: params.get("sort") || "default",
    };
    setFilters(initialFilters);
    if (params.get("page")) setCurrentPage(parseInt(params.get("page")));
  }, []);

  // Update URL when filters or page change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.bhk !== "all") params.set("bhk", filters.bhk);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sort !== "default") params.set("sort", filters.sort);
    if (currentPage > 1) params.set("page", currentPage);
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, currentPage, navigate]);

  // Apply filters
  let filtered = [...allProperties];

  // Search (title or location)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower)
    );
  }

  // Type
  if (filters.type !== "all") {
    filtered = filtered.filter((p) => p.type === filters.type);
  }

  // BHK
  if (filters.bhk !== "all") {
    const bhkNum = parseInt(filters.bhk);
    if (bhkNum === 4) {
      filtered = filtered.filter((p) => p.bhk >= 4);
    } else {
      filtered = filtered.filter((p) => p.bhk === bhkNum);
    }
  }

  // Min Price
  if (filters.minPrice) {
    const minVal = parseInt(filters.minPrice);
    filtered = filtered.filter((p) => p.priceNum >= minVal);
  }

  // Max Price
  if (filters.maxPrice) {
    const maxVal = parseInt(filters.maxPrice);
    filtered = filtered.filter((p) => p.priceNum <= maxVal);
  }

  // Sorting
  if (filters.sort === "price_asc") {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (filters.sort === "price_desc") {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // reset page on filter change
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e3a8a", marginBottom: "1.5rem" }}>
          All Properties
        </h1>
        <FilterBar onFilterChange={handleFilterChange} initialFilters={filters} />
        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
          Showing {paginatedProperties.length} of {filtered.length} properties
        </p>
        <PropertyGrid properties={paginatedProperties} />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: currentPage === 1 ? "#e5e7eb" : "#1e3a8a",
                color: currentPage === 1 ? "#6b7280" : "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: currentPage === page ? "#f97316" : "#e5e7eb",
                  color: currentPage === page ? "white" : "#374151",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: currentPage === totalPages ? "#e5e7eb" : "#1e3a8a",
                color: currentPage === totalPages ? "#6b7280" : "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}