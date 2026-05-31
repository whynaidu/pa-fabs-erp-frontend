# PA FABS ERP — Full UI Verification (Chrome, driven through the frontend)
_Every case below was driven through the live UI at https://pa-fabs-erp-frontend.vercel.app against the production backend. Success, failure, and edge cases._

## A. Login & registration
| Case | Expected | Result |
|------|----------|--------|
| Staff `user`/`user123` | enters Staff app | ✅ |
| Admin `admin`/`admin123` | enters Admin app | ✅ |
| Wrong password | stay on login, error | ✅ 401 toast, no token |
| Role mismatch (user creds, Admin tab) | rejected | ✅ 403 toast |
| Unknown user | rejected | ✅ 401 toast |
| Register new account | pending approval | ✅ "Awaiting Admin approval" |
| Register, passwords differ | client validation | ✅ "Passwords do not match" |

## B. Purchase Order
| Case | Expected | Result |
|------|----------|--------|
| Missing PO number | blocked | ✅ "PO Number is required" |
| Order qty = 0 | blocked | ✅ "Order Quantity must be >0" |
| Valid create | saved + in table | ✅ "PO saved", persists |
| Duplicate PO number | rejected | ✅ 400 |

## C. Production flow (full chain, via UI forms)
| Step | Result |
|------|--------|
| Inward | ✅ "Inward saved — Cycle 1" (cycle auto-assigned) |
| Outward (warping) | ✅ saved |
| Return (warping) | ✅ saved, beams auto-created (e.g. B006) |
| Loom allocation | ✅ "Loom 1 allocated to B006" → loom occupied |
| Manufacturing (done) | ✅ "Weaving complete" + fabric auto-received to inventory |
| Delivery | ✅ "Delivery saved — DC-0004" → PO complete, loom freed |

## D. Edge / failure cases
| Case | Expected | Result |
|------|----------|--------|
| **Cycle guard** — 2nd inward before delivery | blocked | ✅ 400 |
| **Global loom lock** — occupied loom in dropdown | hidden | ✅ dropdown shows 2–18, loom 1 excluded; free count 17 |
| Duplicate delivery (same PO+cycle) | blocked | ✅ 400 |
| Ownership — user reading another user's PO | blocked | ✅ 403 (verified earlier) |

## E. Admin
| Case | Result |
|------|--------|
| Admin sees ALL data | ✅ pos 8 / inwards 6 / outwards 4 / returns 5 / beams 6 / deliveries 4 / users 3 |
| All 7 views render | ✅ Dashboard, Loom Board (18), All POs, Warehouse, Manufacturing, Delivery, User Mgmt |
| Approve pending user | ✅ pending → approved (was client-only & broken before) |
| CSV export | ✅ 200, `text/csv`, header + rows |
| Export / dashboard as non-admin | ✅ 403 (admin-only enforced) |

## Bugs found and fixed during this UI verification
1. **`clearDeliveryForm` crash** — called `.textContent` on non-existent display nodes (`delCount`, `delColour`, …) → a *successful* delivery showed an error toast. Fixed with null guards. (frontend)
2. **Misleading manufacturing toast** said "Loom freed" — the loom actually frees at delivery. Corrected, and inventory now reloads after a done log. (frontend)

(Earlier in the build: beam-number global collision, PO-save 422 on empty dates, and the hardcoded admin-login bypass were all found & fixed too.)

## Verdict
Every flow — success, failure, and edge — works correctly through the UI. Authentication, authorization (admin vs user, ownership), the cycle guard, and the global loom lock are all enforced and visible from the frontend.
