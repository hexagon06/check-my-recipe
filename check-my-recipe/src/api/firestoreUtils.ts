import { User } from 'firebase/auth'
import { collection, getDocs, Firestore, query, documentId, where, QueryConstraint } from 'firebase/firestore'

export async function getCollection(db: Firestore, path: string) {
  const result = await getDocs(collection(db, path))
  return result
}

export async function getSingle(db: Firestore, collectionName: string, id: string) {
  const ref = collection(db, collectionName)
  const q = query(ref, where(documentId(), '==', id))
  return await getDocs(q)
}

export function userHasRole(user: User, role: string): QueryConstraint {
  return where(`roles.${user.uid}`, '==', role)
}

export function isUserId<T>(user: User, field: Extract<keyof T, string>): QueryConstraint {
  return where(field, '==', user.uid)
}
