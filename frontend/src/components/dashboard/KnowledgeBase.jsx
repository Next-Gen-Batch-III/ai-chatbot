import { useRef, useState } from "react";
import {
  FileText,
  FileUp,
  Funnel,
  LoaderCircle,
  CircleCheck,
  CircleX,
  MoreVertical,
  File,
  Files,
  Eye,
  RotateCcw,
  Trash2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const initialFiles = [
  {
    name: "AI_Project_Report.pdf",
    type: "PDF",
    date: "Aug 12, 2026",
    size: "2.3 MB",
    status: "Vectorized",
    file: null,
  },
  {
    name: "Project_Lombok.docx",
    type: "DOCX",
    date: "Aug 12, 2026",
    size: "1.1 MB",
    status: "Processing",
    file: null,
  },
  {
    name: "Database_Design.xlsx",
    type: "XLSX",
    date: "Aug 11, 2026",
    size: "850 KB",
    status: "Vectorized",
    file: null,
  },
  {
    name: "Project_Notes.txt",
    type: "TXT",
    date: "Aug 10, 2026",
    size: "25 KB",
    status: "Vectorized",
    file: null,
  },
  {
    name: "AI_Research.pdf",
    type: "PDF",
    date: "Aug 9, 2026",
    size: "3.4 MB",
    status: "Vectorized",
    file: null,
  },
  {
    name: "Final_Report.docx",
    type: "DOCX",
    date: "Aug 8, 2026",
    size: "1.8 MB",
    status: "Processing",
    file: null,
  },
  {
    name: "User_Data.xlsx",
    type: "XLSX",
    date: "Aug 7, 2026",
    size: "620 KB",
    status: "Vectorized",
    file: null,
  },
  {
    name: "Failed_Document.pdf",
    type: "PDF",
    date: "Aug 6, 2026",
    size: "900 KB",
    status: "Failed",
    file: null,
  },
];

function KnowledgeBase() {
  // ============================================
  // FILES
  // ============================================

  const [files, setFiles] = useState(initialFiles);

  const fileInputRef = useRef(null);

  // ============================================
  // DESKTOP FILTER DROPDOWNS
  // ============================================

  const [typeFilterOpen, setTypeFilterOpen] = useState(false);

  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const [statusFilterOpen, setStatusFilterOpen] = useState(false);

  // ============================================
  // MOBILE FILTER
  // ============================================

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [mobileFilterSection, setMobileFilterSection] =
    useState(null);

  // ============================================
  // SELECTED FILTERS
  // ============================================

  const [selectedType, setSelectedType] = useState("All Types");

  const [selectedDate, setSelectedDate] =
    useState("Newest to Oldest");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  // ============================================
  // ACTION MENU
  // ============================================

  const [openAction, setOpenAction] = useState(null);

  // ============================================
  // CLOSE ALL FILTERS
  // ============================================

  const closeAllFilters = () => {
    setTypeFilterOpen(false);
    setDateFilterOpen(false);
    setStatusFilterOpen(false);
    setMobileFilterOpen(false);
    setMobileFilterSection(null);
  };

  // ============================================
  // OPEN FILE BROWSER
  // ============================================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ============================================
  // HANDLE FILE UPLOAD
  // ============================================

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length === 0) {
      return;
    }

    const newFiles = selectedFiles.map((file) => {
      const extension =
        file.name.split(".").pop()?.toUpperCase() || "";

      let fileSize;

      if (file.size < 1024 * 1024) {
        fileSize = `${Math.max(
          1,
          Math.round(file.size / 1024)
        )} KB`;
      } else {
        fileSize = `${(
          file.size /
          (1024 * 1024)
        ).toFixed(1)} MB`;
      }

      return {
        name: file.name,
        type: extension,

        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),

        size: fileSize,

        status: "Processing",

        file: file,
      };
    });

    setFiles((currentFiles) => [
      ...newFiles,
      ...currentFiles,
    ]);

    event.target.value = "";
  };

  // ============================================
  // TYPE ICON
  // ============================================

  const getTypeIcon = (type) => {
    switch (type) {
      case "PDF":
        return (
          <FileText
            size={14}
            className="text-red-500"
          />
        );

      case "DOCX":
        return (
          <FileText
            size={14}
            className="text-blue-500"
          />
        );

      case "XLSX":
        return (
          <Files
            size={14}
            className="text-green-500"
          />
        );

      case "TXT":
        return (
          <File
            size={14}
            className="text-gray-500"
          />
        );

      default:
        return (
          <Files
            size={14}
            className="text-gray-400"
          />
        );
    }
  };

  // ============================================
  // STATUS ICON
  // ============================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Vectorized":
        return (
          <CircleCheck
            size={14}
            className="shrink-0 text-green-500"
          />
        );

      case "Processing":
        return (
          <LoaderCircle
            size={14}
            className="shrink-0 animate-spin text-yellow-500"
          />
        );

      case "Failed":
        return (
          <CircleX
            size={14}
            className="shrink-0 text-red-500"
          />
        );

      default:
        return null;
    }
  };

  // ============================================
  // STATUS STYLE
  // ============================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Vectorized":
        return "bg-green-100 text-green-600";

      case "Processing":
        return "bg-yellow-100 text-yellow-600";

      case "Failed":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // ============================================
  // VIEW FILE
  // ============================================

  const handleView = (file) => {
    if (!file.file) {
      alert(
        "This is a demo file. Upload a real file to preview it."
      );

      setOpenAction(null);
      return;
    }

    const fileUrl = URL.createObjectURL(file.file);

    window.open(fileUrl, "_blank");

    setOpenAction(null);

    setTimeout(() => {
      URL.revokeObjectURL(fileUrl);
    }, 10000);
  };

  // ============================================
  // RE-VECTORIZE
  // ============================================

  const handleReVectorize = (file) => {
    alert(
      `Re-vectorization started for:\n\n${file.name}`
    );

    setOpenAction(null);
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = (fileName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${fileName}"?`
    );

    if (!confirmed) {
      return;
    }

    setFiles((currentFiles) =>
      currentFiles.filter(
        (file) => file.name !== fileName
      )
    );

    setOpenAction(null);
  };

  // ============================================
  // FILTER + SORT
  // ============================================

  const filteredFiles = [...files]
    .filter(
      (file) =>
        selectedType === "All Types" ||
        file.type === selectedType
    )
    .filter(
      (file) =>
        selectedStatus === "All Status" ||
        file.status === selectedStatus
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (selectedDate === "Newest to Oldest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  // ============================================
  // MOBILE FILTER MENU
  // ============================================

  const renderMobileFilter = () => {
    // ------------------------------------------
    // MAIN FILTER
    // ------------------------------------------

    if (mobileFilterSection === null) {
      return (
        <div className="absolute right-12 top-12 z-50 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg sm:hidden">

          <div className="px-3 py-2 text-[10px] font-semibold text-gray-400">
            FILTER
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection("type")
            }
            className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
          >
            <span>Type</span>

            <ChevronRight size={14} />
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection("date")
            }
            className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
          >
            <span>Date</span>

            <ChevronRight size={14} />
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection("status")
            }
            className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
          >
            <span>Status</span>

            <ChevronRight size={14} />
          </button>

        </div>
      );
    }

    // ------------------------------------------
    // TYPE
    // ------------------------------------------

    if (mobileFilterSection === "type") {
      return (
        <div className="absolute right-12 top-12 z-50 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg sm:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection(null)
            }
            className="flex w-full items-center gap-2 border-b px-3 py-2 text-left text-[10px] font-semibold text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={13} />

            FILTER BY TYPE
          </button>

          {[
            "All Types",
            "PDF",
            "DOCX",
            "XLSX",
            "TXT",
          ].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setSelectedType(type);
                setMobileFilterOpen(false);
                setMobileFilterSection(null);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
            >
              <span className="flex w-4 justify-center">
                {type === "All Types" ? (
                  <Files
                    size={13}
                    className="text-gray-400"
                  />
                ) : (
                  getTypeIcon(type)
                )}
              </span>

              <span className="flex-1">
                {type}
              </span>

              {selectedType === type && (
                <CircleCheck
                  size={13}
                  className="text-gray-500"
                />
              )}
            </button>
          ))}
        </div>
      );
    }

    // ------------------------------------------
    // DATE
    // ------------------------------------------

    if (mobileFilterSection === "date") {
      return (
        <div className="absolute right-12 top-12 z-50 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg sm:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection(null)
            }
            className="flex w-full items-center gap-2 border-b px-3 py-2 text-left text-[10px] font-semibold text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={13} />

            FILTER BY DATE
          </button>

          {[
            "Newest to Oldest",
            "Oldest to Newest",
          ].map((dateOption) => (
            <button
              type="button"
              key={dateOption}
              onClick={() => {
                setSelectedDate(dateOption);
                setMobileFilterOpen(false);
                setMobileFilterSection(null);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
            >
              <span className="w-4 text-center text-gray-400">
                {dateOption ===
                "Newest to Oldest"
                  ? "↓"
                  : "↑"}
              </span>

              <span className="flex-1">
                {dateOption}
              </span>

              {selectedDate === dateOption && (
                <CircleCheck
                  size={13}
                  className="text-gray-500"
                />
              )}
            </button>
          ))}
        </div>
      );
    }

    // ------------------------------------------
    // STATUS
    // ------------------------------------------

    if (mobileFilterSection === "status") {
      return (
        <div className="absolute right-12 top-12 z-50 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg sm:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFilterSection(null)
            }
            className="flex w-full items-center gap-2 border-b px-3 py-2 text-left text-[10px] font-semibold text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={13} />

            FILTER BY STATUS
          </button>

          {[
            "All Status",
            "Vectorized",
            "Processing",
            "Failed",
          ].map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => {
                setSelectedStatus(status);
                setMobileFilterOpen(false);
                setMobileFilterSection(null);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
            >
              <span className="flex w-4 justify-center">
                {status === "All Status" ? (
                  <Files
                    size={13}
                    className="text-gray-400"
                  />
                ) : (
                  getStatusIcon(status)
                )}
              </span>

              <span className="flex-1">
                {status}
              </span>

              {selectedStatus === status && (
                <CircleCheck
                  size={13}
                  className="text-gray-500"
                />
              )}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  // ============================================
  // RETURN
  // ============================================

  return (
    <div className="relative w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex h-14 items-center justify-between border-b px-3 sm:px-4">

        {/* TITLE */}

        <h2 className="whitespace-nowrap text-sm font-semibold text-gray-800">
          Knowledge Base
        </h2>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-1.5">

          {/* ================================= */}
          {/* MOBILE FILTER */}
          {/* ================================= */}

          <div className="relative sm:hidden">

            <button
              type="button"
              onClick={() => {
                setMobileFilterOpen(
                  !mobileFilterOpen
                );

                setMobileFilterSection(null);

                setTypeFilterOpen(false);
                setDateFilterOpen(false);
                setStatusFilterOpen(false);

                setOpenAction(null);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border text-gray-500 hover:bg-gray-50"
              title="Filter"
            >
              <Funnel size={14} />
            </button>

          </div>

          {/* ================================= */}
          {/* FILE INPUT */}
          {/* ================================= */}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.txt"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* ================================= */}
          {/* MOBILE UPLOAD */}
          {/* ================================= */}

          <button
            type="button"
            onClick={handleUploadClick}
            className="flex h-8 w-8 items-center justify-center rounded-md border text-gray-500 hover:bg-gray-50 sm:hidden"
            title="Upload Files"
          >
            <FileUp size={15} />
          </button>

          {/* ================================= */}
          {/* DESKTOP UPLOAD */}
          {/* ================================= */}

          <button
            type="button"
            onClick={handleUploadClick}
            className="hidden items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 sm:flex"
          >
            <FileUp size={15} />

            Upload Files
          </button>

        </div>

      </div>

      {/* ====================================== */}
      {/* MOBILE FILTER POPUP */}
      {/* ====================================== */}

      {mobileFilterOpen &&
        renderMobileFilter()}

      {/* ====================================== */}
      {/* DESKTOP TABLE */}
      {/* ====================================== */}

      <div className="hidden h-[280px] max-w-full overflow-auto sm:block">

        <table className="w-full min-w-[700px] text-left text-xs">

          {/* ================================= */}
          {/* TABLE HEADER */}
          {/* ================================= */}

          <thead className="sticky top-0 z-10 border-b bg-gray-50 text-gray-500">

            <tr>

              {/* FILENAME */}

              <th className="px-4 py-2">
                FILENAME
              </th>

              {/* TYPE */}

              <th className="relative px-4 py-2">

                <button
                  type="button"
                  onClick={() => {
                    setTypeFilterOpen(
                      !typeFilterOpen
                    );

                    setDateFilterOpen(false);
                    setStatusFilterOpen(false);

                    setOpenAction(null);
                  }}
                  className="flex items-center gap-1.5 hover:text-gray-700"
                >
                  TYPE

                  <Funnel
                    size={13}
                    strokeWidth={2}
                  />
                </button>

                {typeFilterOpen && (
                  <div className="absolute left-3 top-full z-50 mt-1 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                    <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400">
                      FILTER BY TYPE
                    </div>

                    {[
                      "All Types",
                      "PDF",
                      "DOCX",
                      "XLSX",
                      "TXT",
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setTypeFilterOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[9px] text-gray-600 hover:bg-gray-50"
                      >
                        <span className="flex w-4 justify-center">
                          {type ===
                          "All Types" ? (
                            <Files
                              size={13}
                              className="text-gray-400"
                            />
                          ) : (
                            getTypeIcon(type)
                          )}
                        </span>

                        <span className="flex-1">
                          {type}
                        </span>

                        {selectedType ===
                          type && (
                          <CircleCheck
                            size={12}
                            className="text-gray-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

              </th>

              {/* DATE */}

              <th className="relative px-4 py-2">

                <button
                  type="button"
                  onClick={() => {
                    setDateFilterOpen(
                      !dateFilterOpen
                    );

                    setTypeFilterOpen(false);
                    setStatusFilterOpen(false);

                    setOpenAction(null);
                  }}
                  className="flex items-center gap-1.5 hover:text-gray-700"
                >
                  DATE

                  <Funnel
                    size={13}
                    strokeWidth={2}
                  />
                </button>

                {dateFilterOpen && (
                  <div className="absolute left-3 top-full z-50 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                    <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400">
                      FILTER BY DATE
                    </div>

                    {[
                      "Newest to Oldest",
                      "Oldest to Newest",
                    ].map((dateOption) => (
                      <button
                        type="button"
                        key={dateOption}
                        onClick={() => {
                          setSelectedDate(
                            dateOption
                          );

                          setDateFilterOpen(
                            false
                          );
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[9px] text-gray-600 hover:bg-gray-50"
                      >
                        <span className="w-4 text-center text-gray-400">
                          {dateOption ===
                          "Newest to Oldest"
                            ? "↓"
                            : "↑"}
                        </span>

                        <span className="flex-1">
                          {dateOption}
                        </span>

                        {selectedDate ===
                          dateOption && (
                          <CircleCheck
                            size={12}
                            className="text-gray-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

              </th>

              {/* SIZE */}

              <th className="px-4 py-2">
                SIZE
              </th>

              {/* STATUS */}

              <th className="relative px-4 py-2">

                <button
                  type="button"
                  onClick={() => {
                    setStatusFilterOpen(
                      !statusFilterOpen
                    );

                    setTypeFilterOpen(false);
                    setDateFilterOpen(false);

                    setOpenAction(null);
                  }}
                  className="flex items-center gap-1.5 hover:text-gray-700"
                >
                  STATUS

                  <Funnel
                    size={13}
                    strokeWidth={2}
                  />
                </button>

                {statusFilterOpen && (
                  <div className="absolute left-3 top-full z-50 mt-1 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                    <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400">
                      FILTER BY STATUS
                    </div>

                    {[
                      "All Status",
                      "Vectorized",
                      "Processing",
                      "Failed",
                    ].map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() => {
                          setSelectedStatus(
                            status
                          );

                          setStatusFilterOpen(
                            false
                          );
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[9px] text-gray-600 hover:bg-gray-50"
                      >
                        <span className="flex w-4 justify-center">

                          {status ===
                          "All Status" ? (
                            <Files
                              size={13}
                              className="text-gray-400"
                            />
                          ) : (
                            getStatusIcon(status)
                          )}

                        </span>

                        <span className="flex-1">
                          {status}
                        </span>

                        {selectedStatus ===
                          status && (
                          <CircleCheck
                            size={12}
                            className="text-gray-500"
                          />
                        )}

                      </button>
                    ))}

                  </div>
                )}

              </th>

              {/* ACTION */}

              <th className="px-4 py-2">
                ACTION
              </th>

            </tr>

          </thead>

          {/* ================================= */}
          {/* DESKTOP BODY */}
          {/* ================================= */}

          <tbody>

            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (

                <tr
                  key={file.name}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  {/* FILENAME */}

                  <td className="px-4 py-3">

                    <div className="flex items-center gap-2">

                      <FileText
                        size={16}
                        className="shrink-0 text-gray-400"
                      />

                      {/* CLICKABLE FILE NAME */}

                      <button
                        type="button"
                        onClick={() =>
                          handleView(file)
                        }
                        className="max-w-[220px] truncate text-left font-medium text-gray-700 hover:text-blue-600 hover:underline"
                        title={`View ${file.name}`}
                      >
                        {file.name}
                      </button>

                    </div>

                  </td>

                  {/* TYPE */}

                  <td className="px-4 py-3">

                    <div className="flex items-center gap-1.5 text-gray-500">

                      {getTypeIcon(file.type)}

                      <span>
                        {file.type}
                      </span>

                    </div>

                  </td>

                  {/* DATE */}

                  <td className="px-4 py-3 text-gray-500">
                    {file.date}
                  </td>

                  {/* SIZE */}

                  <td className="px-4 py-3 text-gray-500">
                    {file.size}
                  </td>

                  {/* STATUS */}

                  <td className="px-4 py-3">

                    <div className="flex items-center gap-1.5">

                      {getStatusIcon(file.status)}

                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${getStatusStyle(
                          file.status
                        )}`}
                      >
                        {file.status}
                      </span>

                    </div>

                  </td>

                  {/* ACTION */}

                  <td className="relative px-4 py-3 text-gray-400">

                    <button
                      type="button"
                      onClick={() => {
                        setOpenAction(
                          openAction === file.name
                            ? null
                            : file.name
                        );

                        closeAllFilters();
                      }}
                      className="rounded-md p-1.5 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <MoreVertical size={17} />
                    </button>

                    {openAction === file.name && (

                      <div className="absolute right-3 top-10 z-50 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            handleView(file)
                          }
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-gray-600 hover:bg-gray-50"
                        >
                          <Eye
                            size={14}
                            className="text-gray-400"
                          />

                          View
                        </button>

                        {/* RE-VECTORIZE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleReVectorize(file)
                          }
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-gray-600 hover:bg-gray-50"
                        >
                          <RotateCcw
                            size={14}
                            className="text-gray-400"
                          />

                          Re-vectorize
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(file.name)
                          }
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} />

                          Delete
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))
            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="py-10 text-center text-xs text-gray-400"
                >
                  No files found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ====================================== */}
      {/* MOBILE FILE LIST */}
      {/* ====================================== */}

      <div className="h-[280px] overflow-y-auto sm:hidden">

        {filteredFiles.length > 0 ? (

          <div className="divide-y divide-gray-100">

            {filteredFiles.map((file) => (

              <div
                key={file.name}
                className="relative px-3 py-3 hover:bg-gray-50"
              >

                {/* ================================= */}
                {/* FILE NAME */}
                {/* ================================= */}

                <div className="flex items-center gap-2 pr-8">

                  {/* FILE TYPE ICON */}

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-50">
                    {getTypeIcon(file.type)}
                  </div>

                  {/* CLICKABLE FILE NAME */}

                  <button
                    type="button"
                    onClick={() =>
                      handleView(file)
                    }
                    className="min-w-0 truncate text-left text-xs font-medium text-gray-700 hover:text-blue-600 hover:underline"
                    title={`View ${file.name}`}
                  >
                    {file.name}
                  </button>

                </div>

                {/* ================================= */}
                {/* TYPE / SIZE / STATUS */}
                {/* ================================= */}

                <div className="mt-1.5 flex items-center gap-3 pl-8">

                  {/* TYPE */}

                  <span className="text-[10px] text-gray-500">
                    {file.type}
                  </span>

                  {/* SIZE */}

                  <span className="text-[10px] text-gray-500">
                    {file.size}
                  </span>

                  {/* STATUS */}

                  <div className="flex min-w-0 items-center gap-1">

                    {getStatusIcon(file.status)}

                    <span
                      className={`truncate rounded-full px-1.5 py-0.5 text-[9px] font-medium ${getStatusStyle(
                        file.status
                      )}`}
                    >
                      {file.status}
                    </span>

                  </div>

                </div>

                {/* ================================= */}
                {/* MOBILE ACTION */}
                {/* ================================= */}

                <div className="absolute right-2 top-3">

                  <button
                    type="button"
                    onClick={() => {
                      setOpenAction(
                        openAction === file.name
                          ? null
                          : file.name
                      );

                      closeAllFilters();
                    }}
                    className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* ACTION DROPDOWN */}

                  {openAction === file.name && (

                    <div className="absolute right-0 top-8 z-50 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          handleView(file)
                        }
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-gray-600 hover:bg-gray-50"
                      >
                        <Eye
                          size={14}
                          className="text-gray-400"
                        />

                        View
                      </button>

                      {/* RE-VECTORIZE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleReVectorize(file)
                        }
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-gray-600 hover:bg-gray-50"
                      >
                        <RotateCcw
                          size={14}
                          className="text-gray-400"
                        />

                        Re-vectorize
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(file.name)
                        }
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} />

                        Delete
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No files found
          </div>

        )}

      </div>

    </div>
  );
}

export default KnowledgeBase;