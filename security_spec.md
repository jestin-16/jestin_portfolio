# Firestore Security Specification and Threat Modeling

This specification documents the Attribute-Based Access Control (ABAC) invariants and Zero-Trust validation guards governing the Firestore database for Jestin Shaji's portfolio system.

## 1. Data Invariants & Access Control Matrix

| Collection | Path | Read Access | Write Access (Create/Update/Delete) | Immutable Fields |
| :--- | :--- | :--- | :--- | :--- |
| `bio` | `/bio/{docId}` | Public (anyone) | Only Admin (`jestinshaji777@gmail.com`) | None |
| `projects` | `/projects/{projectId}` | Public (anyone) | Only Admin (`jestinshaji777@gmail.com`) | `id` |
| `techStack` | `/techStack/{techId}` | Public (anyone) | Only Admin (`jestinshaji777@gmail.com`) | None |
| `experiences` | `/experiences/{experienceId}` | Public (anyone) | Only Admin (`jestinshaji777@gmail.com`) | `id` |
| `blogPosts` | `/blogPosts/{blogPostId}` | Public (anyone) | Only Admin (`jestinshaji777@gmail.com`) | `id` |
| `messages` | `/messages/{messageId}` | Denied (Admins only) | Anyone (create only) | All (no updates allowed) |

### Administrative Identification Policy:
*   We recognize **`jestinshaji777@gmail.com`** as the sole absolute system administrator.
*   Admin privilege is validated using the secure auth token email property: `request.auth.token.email == "jestinshaji777@gmail.com"` along with email verification validation: `request.auth.token.email_verified == true`.

---

## 2. The "Dirty Dozen" Attack Payloads

Below are the 12 malicious payloads designed to test our security structure. Each payload triggers `PERMISSION_DENIED` in our fortress configuration:

1.  **PII Read Exploit (Unauthorized Get)**
    *   *Attack Vector:* A non-authenticated user tries to pull client emails or personal contact info from `/messages/{messageId}`.
    *   *Result:* Rejected. Reads on `/messages` are restricted strictly to the verified administrator email (`jestinshaji777@gmail.com`).

2.  **Shadow Attribute Injection (Self-Privilege Escalation on Bio)**
    *   *Payload (Attempting write to `/bio/main` as a general signed-in user):*
        ```json
        { "name": "Fake Jestin", "role": "Full-stack Master", "isAdmin": true, "malicious_ghost_field": "exploit" }
        ```
    *   *Result:* Rejected. The `isValidBio` schema shape validation matches precise attributes and blocks shadow fields.

3.  **Cross-Identity ID Poisoning (Massive Invalid ID Write)**
    *   *Attack Path:* Posting to a very long invalid docID containing unescaped toxic symbols: `/projects/PROJECT_ID_WITH_SPECIAL_CHARS_@@_!!_%%%%_AND_10KB_STR_OVERFLOW`.
    *   *Result:* Rejected. The `isValidId()` primitive restricts ID length and enforces valid alphanumeric match expression (`^[a-zA-Z0-9_\\-]+$`).

4.  **Immutability Bypass Attack (Updating Immutable project IDs)**
    *   *Payload (Attempting patch on `/projects/microservices-cicd`):*
        ```json
        { "id": "hacked-id-override", "title": "Orchestrated CI/CD Microservices Pipeline", "category": "devops" }
        ```
    *   *Result:* Rejected. Updates fail if `incoming().id != existing().id`.

5.  **Spam Denial-of-Wallet Payload (Unconstrained string overflows)**
    *   *Payload (Attempting post to `/messages/spam_msg`):*
        ```json
        { "name": "SpamBot", "email": "spam@web.com", "subject": "A", "message": "A...[10MB repeated characters]...", "createdAt": "2026-05-27T13:38:56Z" }
        ```
    *   *Result:* Rejected. Strict size guards enforce `.size() <= 10000` on payload values.

6.  **Temporal Spoofing (Forged Client Timestamps)**
    *   *Payload (Attempting to log custom historical timestamps on `/messages/msg1`):*
        ```json
        { "name": "Spoofer", "email": "spoof@web.com", "message": "hello", "createdAt": "2010-01-01T00:00:00Z" }
        ```
    *   *Result:* Rejected. The rule demands `incoming().createdAt == request.time`.

7.  **Unauthenticated Content Defacement**
    *   *Payload (Attempting anonymous deletion of project data at `/projects/lab-automation`):*
    *   *Result:* Rejected. Structural deletions must satisfy verified admin criteria.

8.  **Type-Poisoning Attack on TechStack (Proficiency rating boolean injection)**
    *   *Payload (Posting to `/techStack/tech1`):*
        ```json
        { "name": "Spring", "category": "backend", "proficiency": true }
        ```
    *   *Result:* Rejected. Tech item schema mandates `incoming().proficiency is string`.

9.  **Relational Orphan Write (Project category enum bypass)**
    *   *Payload (Attempting write to `/projects/proj1`):*
        ```json
        { "id": "proj1", "title": "Bespoke", "category": "INVALID_CAT", "tags": [] }
        ```
    *   *Result:* Rejected. Category matches exact enum boundaries.

10. **Spoofed Admin Session (Non-Verified Email Session)**
    *   *Authentication token representation:*
        ```json
        { "uid": "fake_uid", "token": { "email": "jestinshaji777@gmail.com", "email_verified": false } }
        ```
    *   *Result:* Rejected. System strictly mandates `email_verified == true`.

11. **Malicious State Transition Bypass**
    *   *Payload (Attempting update on `/experiences/exp1`):*
        ```json
        { "id": "exp1", "category": "hacker-space" }
        ```
    *   *Result:* Rejected. Experience rules validate strict categories.

12. **Shadow Field Appended Audit**
    *   *Payload:* Attempting to append metadata parameters to existing portfolio layouts.
    *   *Result:* Rejected. Diff schema matching prevents unexpected schema inflation.
