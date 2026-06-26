export const PORTRAIT_ALT =
 "Uzman Klinik Psikolog Nisa Demir — Kadıköy Psikanalitik Psikoterapi";

export const PRACTITIONER_CONTEXT =
 "Uzman Klinik Psikolog Nisa Demir, Kadıköy Psikanalitik Psikoterapi";

export function articleImageAlt(title) {
 if (!title?.trim()) return PRACTITIONER_CONTEXT;
 return `${title.trim()} — ${PRACTITIONER_CONTEXT}`;
}
