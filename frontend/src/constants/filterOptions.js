// Option lists for the list-page filter dropdowns. Values match the backend
// enums / status strings exactly.

export const ACTIVE_STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" }
];

export const ASSET_STATUS_OPTIONS = [
    { value: "AVAILABLE", label: "Available" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "IN_REPAIR", label: "In repair" },
    { value: "BROKEN", label: "Broken" },
    { value: "LOST", label: "Lost" },
    { value: "RETIRED", label: "Retired" }
];

export const ASSIGNMENT_STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Active" },
    { value: "RETURNED", label: "Returned" }
];
